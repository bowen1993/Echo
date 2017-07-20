import agent from 'utils/agent';

export const create = (questionId, answer) => {
  return agent.post('/api/answers').send({ questionId, answer });
};
