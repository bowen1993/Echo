import { notification } from 'antd';
import { registerHandler } from './ws';

let inited = false;

const init = ({ dispatch, getState }) => next => (action) => {
  if (inited) {
    return next(action);
  }
  inited = true;

  registerHandler('ALERT', ({ payload }) => {
    notification.info({
      message: '提示',
      description: payload,
    });
  });
};

export default init;
