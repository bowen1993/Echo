import * as AnswerService from 'services/answer';

export default {

  namespace: 'answers',

  state: {
    answer: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *onCreate({ payload: { questionId, answer } }, { call, put }) {  // eslint-disable-line
      yield call(AnswerService.create, questionId, answer);
    },
    * onGetAnswer({ payload: { answerId } }, { call, put }) {

    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
