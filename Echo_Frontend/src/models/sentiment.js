
export default {

  namespace: 'sentiment',

  state: {
    date: (function () {
      let base = +new Date(1968, 9, 3);
      const oneDay = 24 * 3600 * 1000;
      const date = [];

      for (let i = 1; i < 20000; i++) {
        const now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      }
      return date;
    }()),
    posData: (function () {
      const data = [Math.random()];

      for (let i = 1; i < 20000; i++) {
        data.push(Math.random());
      }
      return data;
    }()),
    negData: (function () {
      const data = [Math.random()];

      for (let i = 1; i < 20000; i++) {
        data.push(((Math.random() * 100) % 10) / 10);
      }
      return data;
    }()),
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
