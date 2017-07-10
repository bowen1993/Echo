import React from 'react';
import { Button, Input } from 'antd';
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
        <div className={`${style.image}`} onClick={() => this.props.check()}></div>
        <InputSearch className={`${style.inputSearch}`}/>
        {
          !_.isEmpty(loginUser) ? <UserDown className={`${style.userInfo}`} logout={onLogout}/> :
          CSRF &&
          <AccountKit
            appId='154086658467747' // Update this!
            version='v1.1' // Version must be in form v{major}.{minor}
            onResponse={resp => checkLogin(resp)}
            csrf={CSRF} // Required for security
            language='zh_CN'
          >
            {p => <Button {...p} className={`${style.userInfo}`}>Login</Button>}
          </AccountKit>
        }
      </div>
    );
  }

}

export default Header;
