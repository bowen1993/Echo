import model from '../models';

const Question = model.Question;

export const create = async (question, author) => {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  const newQuestion = new Question({
    content: JSON.stringify(question),
    author,
    createDate: Date.now(),
  });
  await questionDao.create(newQuestion);
  return new Promise((resolve) => {
    const result = newQuestion && newQuestion.$extract({ recursive: true });
    console.log(result);
    resolve(result);
  });
};

export const suggest = async () => {
  const session = await model.getSession();
  const questionDao = session.getDao(Question);
  const questions = await questionDao.find();
  console.log(questions);
  return new Promise((resolve) => {
    const result = questions && questions.$extract({ recursive: true });
    console.log(result);
    resolve(result);
  });
};