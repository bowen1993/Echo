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
    * onVote({ payload: { answerId, up, down } }, { call, put }) {
      yield call(AnswerService.vote, answerId, up, down);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
