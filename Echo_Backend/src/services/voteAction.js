import answerAction from './answerAction';

export const vote = async (answerId, up, down) => {
  const answerObj = await answerAction.getAnswerObjectById(answerId);
  if (answerObj) {
    const newAnswerInfo = {
      up: answerObj.up + up,
      down: answerObj.down + down,
    };

    await answerAction.updateAnswer(answerId, newAnswerInfo);
  }
};