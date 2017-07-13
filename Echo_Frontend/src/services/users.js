import request from 'utils/request';

export async function query() {
  return request.get('/api/users');
}

export async function checkLogin(params) {
  return request.post('/api/users/login_success', params);
}

export async function getCurrentUser() {
  return request.get('/api/users/currentUser');
}

export const getCsrf = async () => {
  return request.get('/api/users/getCsrf');
};

export const logout = async () => {
  return request.get('/api/users/logout');
};
