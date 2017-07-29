import * as QuestionService from '../services/questions';

export default {

  namespace: 'questions',

  state: {
    suggestions: [],
    questions: [],
    question: null,
    visible: false,
    searchQues: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * onCreate({ payload: { question } }, { call, put }) {
      yield call(QuestionService.create, question);
      yield put({ type: 'onSuggest' });
      yield put({ type: 'changeVisible' });
    },
    * onSuggest({ payload }, { call, put }) {
      const suggestions = yield call(QuestionService.suggest);
      yield put({ type: 'querySuccess', payload: { suggestions } });
    },
    * getQuestionsByAuthor({ payload: { authorId } }, { call, put }) {
      const questions = yield call(QuestionService.getQuestionsByAuthor, authorId);
      yield put({ type: 'querySuccess', payload: { questions } });
    },
    * onGetQuestionById({ payload: { id } }, { call, put }) {
      const question = yield call(QuestionService.getQuestionsById, id);
      yield put({ type: 'querySuccess', payload: { question } });
    },
    * onSearch({ payload: { keys } }, { call, put }) {
      const searchQues = yield call(QuestionService.search, keys);
      yield put({ type: 'querySuccess', payload: { searchQues } });
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    changeVisible(state) {
      return { ...state, visible: !state.visible };
    },
  },

};
