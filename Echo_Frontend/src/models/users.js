import * as UserService from '../services/users';

export default {
  namespace: 'users',
  state: { user: 1, crsf: null },
  reducers: {
    querySuccess(state, action) {
      console.log(action.payload);
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
    * checkLogin({ payload: { params } }, { call, put }) {
      const user = yield call(UserService.checkLogin, params);
      yield put({
        type: 'querySuccess',
        payload: { user },
      });
    },
    * getCsrf(action, { call, put }) {
      const crsf = yield call(UserService.getCsrf);
      console.log(crsf);
      yield put({ type: 'querySuccess', payload: crsf });
    },
  },
  subscriptions: {},
};
