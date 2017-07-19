import agent from 'utils/agent';

export const query = () => {
  return agent.get('/api/users').then(res => res.body);
};

export const create = (question) => {
  return agent.post('/api/questions/create')
    .send({ question });
};

export const suggest = () => {
  return agent.get('/api/questions/suggest').then(res => res.body);
};
