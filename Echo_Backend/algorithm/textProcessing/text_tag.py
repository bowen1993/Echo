import tensorflow as tf
import numpy as np
import os
import time
import datetime
import data_helpers
from text_cnn import TextCNN
from tensorflow.contrib import learn
import csv
from pymongo import MongoClient
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
client = MongoClient("mongodb://localhost")
db = client.echo
# Eval Parameters
tf.flags.DEFINE_integer("batch_size", 64, "Batch Size (default: 64)")
tf.flags.DEFINE_string("checkpoint_dir", "", "Checkpoint directory from training run")
tf.flags.DEFINE_boolean("eval_train", False, "Evaluate on all training data")

# Misc Parameters
tf.flags.DEFINE_boolean("allow_soft_placement", True, "Allow device soft device placement")
tf.flags.DEFINE_boolean("log_device_placement", False, "Log placement of ops on devices")


FLAGS = tf.flags.FLAGS
FLAGS._parse_flags()

checkpoint_dir = dir_path + "/runs/1500541990/checkpoints/"

def do_predict(text, numOfTags=5):
    x_raw = [text]
    # Map data into vocabulary
    vocab_path = os.path.join(checkpoint_dir, "..", "vocab")
    vocab_processor = learn.preprocessing.VocabularyProcessor.restore(vocab_path)
    x_test = np.array(list(vocab_processor.transform(x_raw)))

    print("\nEvaluating...\n")

    # Evaluation
    # ==================================================
    checkpoint_file = tf.train.latest_checkpoint(checkpoint_dir)
    graph = tf.Graph()
    with graph.as_default():
        session_conf = tf.ConfigProto(
          allow_soft_placement=True,
          log_device_placement=False)
        sess = tf.Session(config=session_conf)
        with sess.as_default():
            # Load the saved meta graph and restore variables
            saver = tf.train.import_meta_graph("{}.meta".format(checkpoint_file))
            saver.restore(sess, checkpoint_file)

            # Get the placeholders from the graph by name
            input_x = graph.get_operation_by_name("input_x").outputs[0]
            # input_y = graph.get_operation_by_name("input_y").outputs[0]
            dropout_keep_prob = graph.get_operation_by_name("dropout_keep_prob").outputs[0]

            # Tensors we want to evaluate
            predictions = graph.get_operation_by_name("output/scores").outputs[0]

            # Generate batches for one epoch
            batches = data_helpers.batch_iter(list(x_test), FLAGS.batch_size, 1, shuffle=False)
            # Collect the predictions here
            all_probs = []

            for x_test_batch in batches:
                batch_predictions = sess.run(predictions, {input_x: x_test_batch, dropout_keep_prob: 1.0})
                for p in batch_predictions[0]:
                    all_probs.append(p)
    
    indexes = range(len(all_probs))
    indexes = sorted(indexes, cmp=lambda x,y: int(float(all_probs[x])*10000 - float(all_probs[y])*10000), reverse=True)
    result = []
    for i in range(numOfTags):
        result.append({
            "index":indexes[i],
            "prob": all_probs[indexes[i]]
        })
    return result

def predict(text):
    tag_coll = db.tag
    predict_raw_result = do_predict(text)
    result = []
    for tag_item in predict_raw_result:
        numId = tag_item['index']
        #find tag in db
        tag_object = tag_coll.find_one({"numId":numId})
        if tag_object:
            result.append({
                "id": str(tag_object['_id']),
                "name": tag_object['name'],
                "score": float(tag_item["prob"])
            })
    return result

