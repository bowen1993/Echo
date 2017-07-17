import React from 'react';
import { Router, Route } from 'dva/router';
import Layout from 'routes/Layout';
import { UserProfile } from 'routes/Users';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={Layout}>
        <Route path='/users/profile' component={UserProfile} >
        </Route>
      </Route>
    </Router>
  );
}
