import * as QuestionService from '../services/questions';

export default {

  namespace: 'questions',

  state: {
    suggestions: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * onCreate({ payload: { question } }, { call, put }) {
      console.log('model', question);
      yield call(QuestionService.create, question);
    },
    * onSuggest({ payload }, { call, put }) {
      const suggestions = yield call(QuestionService.suggest);
      yield put({ type: 'querySuccess', payload: { suggestions } });
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
