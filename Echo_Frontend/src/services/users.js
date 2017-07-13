import agent from 'utils/agent';

export function query() {
  return agent.get('/api/users').then(res => res.body);
}

export function checkLogin(params) {
  return agent.post('/api/users/login_success', params);
}

export function getCurrentUser() {
  return agent.get('/api/users/currentUser').then(res => res.body);
}

export const getCsrf = async () => {
  return agent.get('/api/users/getCsrf').then(res => res.body);
};

export const logout = async () => {
  return agent.get('/api/users/logout').then(res => res.body);
};

export const testLogin = () => {
  return agent.post('/api/users/test_login');
};
