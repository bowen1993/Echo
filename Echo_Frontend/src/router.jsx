import React from 'react';
import { Router, Route } from 'dva/router';
import Layout from 'routes/Layout';
import { UserProfile } from 'routes/Users';
import QustionDetail from 'routes/QuestionDetail';

const RouterConfig = ({ history }) => (
  <Router history={history}>
    <Route path='/' component={Layout}>
      <Route path='users'>
        <Route path='profile' component={UserProfile} />
      </Route>
      <Route path='questions'>
        <Route path=':id' component={QustionDetail}/>
      </Route>
    </Route>
  </Router>
);


export default RouterConfig;
