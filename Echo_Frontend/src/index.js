import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import './index.css';
import './index.html';
// 1. Initialize
const app = dva({
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
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
