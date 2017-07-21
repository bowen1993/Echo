import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { getCurrentUser } from 'services/users';
import userModel from 'models/users';
import questionModel from 'models/questions';
import answerModel from 'models/answers';
import RouterConfig from './router';

import './index.css';
import './index.html';

(async () => {
  const loginUser = await getCurrentUser();
  const initialState = {
    users: {
      ...userModel.state,
      loginUser,
    },
  };
  // 1. Initialize
  const app = dva({
    initialState,
    onError: (e) => {
      message.error(e.message);
      console.error(e.stack);
    },
  });

  // 2. Plugins
  // app.use({});
  app.use(
    createLoading({ namespace: 'isFetching', effects: true }),
  );
  // 3. Model
  // app.model(require('./models/example'));
  app.model(userModel);
  app.model(questionModel);
  app.model(answerModel);
  // 4. Router
  app.router(RouterConfig);

  // 5. Start
  app.start('#root');
})();
