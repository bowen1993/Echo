import _ from 'lodash';
import model from '../models';
import userAction from './userAction';
import norchAction from './norchAction';

const Question = model.Question;

async function createQuestion(title, userId, content = null) {
    // get db session & DAO
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  const userObj = await userAction.getUserObjById(userId);
  let newQuestion = null;
  if (userObj) {
    newQuestion = new Question({
      title,
      author: userObj,
      createTime: Date.now(),
    });
    if (content) {
      newQuestion.content = content;
    }
    await questionDao.create(newQuestion);
  }
  let result = null;
  if (newQuestion) {
    result = await newQuestion.$extract({ recursive: true });
    norchAction.saveInfo2Norch({
      id:result.id,
      title:result.title,
      content:result.content
    });
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

async function getAnswer(id) {
  const answerObj = await answerDao.findOne({ id });
  return answerObj.$extract({ recursive: true });
}

async function getQuestionList(questions) {
  return Question.$extractArray(questions, {
    recursive: true,
    includes: {
      title: true,
      content: true,
      answers: {
        content: true,
        author: true,
        rate: true,
      },
    },
  });
}

async function suggest(userId) {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  let questionList = [];

  const questions = await questionDao.find({});
  questionList = await getQuestionList(questions);

  return new Promise((resolve) => {
    resolve(questionList);
  });
}

async function getQuestionObjectbyId(questionId) {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);

  const questionObject = await questionDao.findOne({
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

async function getQuestions(params) {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  const { authorId, pageSize = 5, pageNo = 1 } = params;

  let questions = await questionDao.query({
    author: authorId,
  }).sort({
    createTime: 1,
  }).skip(pageSize * (pageNo - 1))
  .limit(pageSize)
  .execute();

  questions = await getQuestionList(questions);

  return new Promise((resolve) => {
    resolve(questions);
  });
}

module.exports = {
  createQuestion,
  getQuestionObjectbyId,
  getQuestionInfo,
  getQuestions,
  updateQuestion,
  suggest,
};
