import React from 'react';
import { Button } from 'antd';
import AccountKit from 'react-facebook-account-kit';
import styles from './Users.css';

// import AccountKit from '../Utils/AccountKit';

class Users extends React.Component {
  render() {
    const { user, onGetUser, checkLogin } = this.props;
    return (
      <div className={styles.normal}>
        {user.name}
        <Button onClick={() => onGetUser()}>click</Button>
        {
          user.name &&
          <AccountKit
            appId='154086658467747' // Update this!
            version='v1.1' // Version must be in form v{major}.{minor}
            onResponse={resp => checkLogin(resp)}
            csrf={user.name} // Required for security
          >
            {p => <Button {...p}>Initialize Account Kit</Button>}
          </AccountKit>
        }
        <Button onClick={() => checkLogin({ test: true })}>POST</Button>
      </div>
    );
  }
}

export default Users;
