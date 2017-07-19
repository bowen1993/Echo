import model from '../models';
import userAction from './userAction';

const Question = model.Question;
const Answer = model.Answer;

async function createQuestion(title, userId, content = null) {
    // get db session & DAO
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  const userObj = await userAction.getUserObjById(userId);
  let newQuestion = null;
  if (userObj) {
    console.log('create question', content, userObj.id);
    newQuestion = new Question({
      title,
      author: userObj,
      createTime: Date.now(),
    });
    if (content) {
      newQuestion.content = content;
    }
    console.log('save');
    await questionDao.create(newQuestion);
  }
  let result = null;
  if (newQuestion) {
    result = await newQuestion.$extract({ recursive: true });
  }

  return new Promise((resolve) => {
    resolve(result);
  });
}

async function updateQuestion(questionId, newQuestionInfo) {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);

  const quetionObject = await getQuestionObjectbyId(questionId);

  let isSuccessful = false;

  if (questionObject) {
    newQuestionInfo.lastModifyTime = Date.now();
    await questionDao.update({
      id: questionId,
    }, {
      $set: newQuestionInfo,
    }, {
      multi: false,
    });

    isSuccessful = true;
  }

  return new Promise((resolve) => {
    resolve(isSuccessful);
  });
}

async function suggest(userId) {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  console.log(questionDao);
  let questionList = [];

  const questions = await questionDao.find({});
  questionList = await Question.$extractArray(questions, { recursive: true });

  return new Promise((resolve) => {
    resolve(questionList);
  });
}

async function getQuestionObjectbyId(questionId) {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);

  const questionObject = questionDao.findOne({
    id: questionId,
  });

  return new Promise((resolve) => {
    resolve(questionObject);
  });
}

async function getQuestionInfo(questionId) {
  const questionObject = await getQuestionObjectbyId(questionId);

  let questionInfo = null;

  if (questionObject) {
    questionInfo = await questionObject.$extract({ recursive: true });
  }

  return new Promise((resolve) => {
    resolve(questionInfo);
  });
}


module.exports = {
  createQuestion,
  getQuestionObjectbyId,
  getQuestionInfo,
  updateQuestion,
  suggest,
};
