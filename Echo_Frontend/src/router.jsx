import React from 'react';
import { Router, Route } from 'dva/router';
import Layout from 'routes/Layout';
import { UserProfile } from 'routes/Users';

const RouterConfig = ({ history }) => (
  <Router history={history}>
    <Route path='/' component={Layout}>
      <Route path='/users'>
        <Route path='profile' component={UserProfile} />
      </Route>
    </Route>
  </Router>
);

export default RouterConfig;
