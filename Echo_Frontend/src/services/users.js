import request from 'utils/request';

export async function query() {
  return request.get('/api/users');
}

export async function checkLogin(params) {
  return request.post('/api/users/login_success', params);
}

export const getCsrf = async () => {
  return request.get('/api/users/getCsrf');
};
