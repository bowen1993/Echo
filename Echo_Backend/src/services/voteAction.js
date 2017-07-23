import model from '../models';

const Answer = model.Answer;

export const vote = async (answerId, up, down) => {
  const session = await model.getSession();
  const answerDao = session.getDao(Answer);
};