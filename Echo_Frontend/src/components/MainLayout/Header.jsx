import React from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router';
import AccountKit from 'react-facebook-account-kit';
import UserDown from 'Users/UserDown';
import _ from 'lodash';
import { InputSearch } from 'Common';
import style from './Header.less';

class Header extends React.Component {
  componentDidMount() {
    this.props.onGetCsrf();
  }
  showQuest() {
    this.editor.showModal();
  }
  render() {
    const { loginUser, CSRF, checkLogin, onLogout } = this.props;
    return (
      <div className={`${style.header}`}>
        <Link to='/' className={`${style.image}`}>
          <img src='../../assets/yay.jpg' alt=''/>
        </Link>
        <InputSearch/>
        <div className={`${style.userInfo}`}>
          {
            !_.isEmpty(loginUser) ? <UserDown logout={onLogout}/> :
            CSRF &&
            <AccountKit
              appId='154086658467747' // Update this!
              version='v1.1' // Version must be in form v{major}.{minor}
              onResponse={resp => checkLogin(resp)}
              csrf={CSRF} // Required for security
              language='zh_CN'
            >
              {p => <Button {...p}>Login</Button>}
            </AccountKit>
          }
        </div>
      </div>
    );
  }

}

export default Header;
