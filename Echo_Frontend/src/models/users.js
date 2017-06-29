import * as UserService from '../services/users';

export default {
  namespace: 'users',
  state: { user: 1 },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    * onGetUser({ payload }, { call, put }) {
      const user = yield call(UserService.query);
      yield put({
        type: 'querySuccess',
        payload: { user },
      });
    },
    * checkLogin({ payload: { params } }, { call }) {
      console.log('begin', params);
      const payload = yield call(UserService.checkLogin, params);
      console.log(payload);
    },
  },
  subscriptions: {},
};
