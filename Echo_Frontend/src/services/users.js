import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function checkLogin(params) {
  console.log(params);
  return request('/api/login_success', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(params) });
}
