import request from 'utils/request';

export async function query() {
  return request('/api/users');
}

export async function checkLogin(params) {
  return request('/api/users/login_success', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(params) });
}

export const getCsrf = async () => {
  return request('/api/users/getCsrf');
};
