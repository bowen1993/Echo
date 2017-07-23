from pymongo import MongoClient
import json

client = MongoClient("mongodb://localhost")

db = client.echo

def load_tags(tag_data):
    tag_coll = db.tag
    tag_coll.delete_many({})
    for tag in tag_data:
        tag_coll.insert_one(tag)

if __name__ == '__main__':
    data_file = open('init_data.json', 'r')
    data_object = json.load(data_file)
    load_tags(data_object['tags'])
