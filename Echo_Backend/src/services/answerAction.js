import model from '../models';
import userAction from './userAction';
import questionAction from './questionAction';

const Question = model.Question;
const Answer = model.Answer;

async function addAnswer2Question(content, questionId, userId) {
  const session = await model.getSession();
  const answerDao = session.getDao(Answer);
  const questionDao = session.getDao(Question);
    // get user and question object
  const userObj = await userAction.getUserObjById(userId);
  const questionObj = await questionAction.getQuestionObjectbyId(questionId);

  let isSuccessful = false;

  if (userObj && questionObj) {
    // create new answer
    const newAnswer = new Answer({
      content,
      author: userObj,
      createTime: Date.now(),
      lastModifyTime: Date.now(),
      up: 0,
      down: 0,
    });
    await answerDao.create(newAnswer);

        // add answer to question
    await questionDao.update({
      id: questionId,
    }, {
      $push: {
        answers: newAnswer.id,
      },
    }, {
      multi: true,
    });

    isSuccessful = true;
  }

  return new Promise((resolve) => {
    resolve(isSuccessful);
  });
}

async function updateAnswer(answerId, newAnswerInfo) {
  const session = await model.getSession();
  const answerDao = session.getDao(Answer);

  const answerObj = await getAnswerObjectById(answerId);
  let isSuccessful = false;

  if (answerObj) {
    newAnswerInfo.lastModifyTime = Date.now();
    await answerDao.update({
      id: answerId,
    }, {
      $set: newAnswerInfo,
    }, {
      multi: false,
    });
    isSuccessful = true;
  }

  return new Promise((resolve) => {
    resolve(isSuccessful);
  });
}

async function getAnswerObjectById(answerId) {
  const session = await model.getSession();
  const answerDao = session.getDao(Answer);
  const answerObject = await answerDao.findOne({
    id: answerId,
  });

  return new Promise((resolve) => {
    resolve(answerObject);
  });
}

async function getAnswerInfo(answerId) {
  const answerObj = await getAnswerObjectById(answerId);
  let answerInfo = null;
  if (answerObj) {
    answerInfo = await answerObj.$extract({ recursive: true });
  }

  return new Promise((resolve) => {
    resolve(answerInfo);
  });
}

module.exports = {
  addAnswer2Question,
  getAnswerObjectById,
  getAnswerInfo,
  updateAnswer,
};