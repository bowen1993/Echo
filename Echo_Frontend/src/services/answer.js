import agent from 'utils/agent';

export const create = (questionId, answer) => {
  return agent.post('/api/answers').send({ questionId, answer });
};

export const vote = (answerId, up, down) => {
  return agent.put(`/api/vote/${answerId}`).send({ up, down });
};
