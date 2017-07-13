import fetch from 'dva/fetch';
import Querystring from 'querystring';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// /**
//  * Requests a URL, returning a promise.
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  * @return {object}           An object containing either "data" or "err"
//  */
// export default async function request(url, options) {
//   const response = await fetch(url, options);
//   checkStatus(response);
//   const data = await response.json();
//   return data;
// }

const get = async (url, params) => {
  const response = await fetch(`${url}?${Querystring.stringify(params)}`, { method: 'GET', mode: 'cors', credentials: 'include' });
  checkStatus(response);
  const data = await response.json();
  return data;
};
const put = async (url, params) => {
  const response = await fetch(url, { method: 'PUT', headers: { 'Content-type': 'application/json', mode: 'cors', credentials: 'include' }, body: JSON.stringify(params) });
  checkStatus(response);
  const data = await response.json();
  return data;
};
const post = async (url, params) => {
  const response = await fetch(url, { method: 'POST', headers: { 'Content-type': 'application/json', mode: 'cors', credentials: 'include' }, body: JSON.stringify(params) });
  checkStatus(response);
  const data = await response.json();
  return data;
};
const del = async (url, params) => {
  const response = await fetch(`${url}?${Querystring.stringify(params)}`, { method: 'DELETE', mode: 'cors', credentials: 'include' });
  checkStatus(response);
  const data = await response.json();
  return data;
};

export default {
  get, post, put, del,
};
