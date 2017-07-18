import * as UserService from '../services/users';

export default {
  namespace: 'users',
  state: { loginUser: null, crsf: null },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    * onGetUser({ payload }, { call, put }) {
      const loginUser = yield call(UserService.query);
      yield put({
        type: 'querySuccess',
        payload: { loginUser },
      });
    },
    * onGetCurrentUser({ payload }, { call, put }) {
      const loginUser = yield call(UserService.getCurrentUser);
      yield put({
        type: 'querySuccess',
        payload: { loginUser },
      });
    },
    * checkLogin({ payload: { params } }, { call, put }) {
      const loginUser = yield call(UserService.checkLogin, params);
      yield put({
        type: 'querySuccess',
        payload: { loginUser },
      });
    },
    * getCsrf(action, { call, put }) {
      const crsf = yield call(UserService.getCsrf);
      yield put({ type: 'querySuccess', payload: crsf });
    },
    * onLogout(action, { call, put }) {
      yield call(UserService.logout);
      yield put({ type: 'querySuccess', payload: { loginUser: null } });
    },
    * testLogin({ payload }, { call, put }) {
      console.log('dsafdsa');
      const loginUser = yield call(UserService.testLogin);
      yield put({
        type: 'querySuccess',
        payload: { loginUser },
      });
    },
    * onChangeUserInfo({ payload: { userInfo } }, { call, put }) {
      console.log('models', userInfo);
      yield call(UserService.changeUserInfo, userInfo);
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'onGetCurrentUser' });
        }
      });
    },
  },
};
