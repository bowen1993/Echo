import * as AnswerService from 'services/answer';

export default {

  namespace: 'answers',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *onCreate({ payload: { questionId, answer } }, { call, put }) {  // eslint-disable-line
      yield call(AnswerService.create, questionId, answer);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
