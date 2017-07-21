import * as QuestionService from '../services/questions';

export default {

  namespace: 'questions',

  state: {
    suggestions: [],
    questions: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * onCreate({ payload: { question } }, { call, put }) {
      yield call(QuestionService.create, question);
    },
    * onSuggest({ payload }, { call, put }) {
      const suggestions = yield call(QuestionService.suggest);
      yield put({ type: 'querySuccess', payload: { suggestions } });
    },
    * getQuestionsByAuthor({ payload: { authorId } }, { call, put }) {
      const questions = yield call(QuestionService.getQuestionsByAuthor, authorId);
      yield put({ type: 'querySuccess', payload: { questions } });
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
