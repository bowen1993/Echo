import model from '../models';
import answerAction from './answerAction';
import { rateFunc } from './utils';

const Rate = model.Rate;

export const vote = async (answerId, up, down) => {
  const answerObj = await answerAction.getAnswerObjectById(answerId);
  if (answerObj) {
    const rate = rateFunc(answerObj.up + up, answerObj.down + down);
    const rateObj = new Rate({ score: rate, createTime: Date.now() });
    const newAnswerInfo = {
      up: answerObj.up + up,
      down: answerObj.down + down,
      rate: rateObj.id,
    };
    await answerAction.updateAnswer(answerId, newAnswerInfo);
  }
};