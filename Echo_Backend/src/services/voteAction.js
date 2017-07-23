import model from '../models';
import answerAction from './answerAction'

const Answer = model.Answer;

export const vote = async (answerId, up, down) => {
  const session = await model.getSession();
  const answerDao = session.getDao(Answer);

  const answerObj = await answerAction.getAnswerObjectById(answerId);

  if( answerObj ){
    answerObj.up = answerObj.up + up;
    answerObj.down = answerObj.down + down;
    await answerDao.updateOne(answerObj);
  }

};