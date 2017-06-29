import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import UserDown from 'users/UserDown';
import style from './Header.less';

const Header = ({ location }) => {
  return (
    <div className={`${style.header}`}>
      <Menu
        selectedKeys={[location.pathname]}
        mode='horizontal'
        theme='dark'
      >
        <Menu.Item key='/users'>
          <Link to='/users'><Icon type='bars' />Users</Link>
        </Menu.Item>
        <Menu.Item key='/'>
          <Link to='/'><Icon type='home' />Home</Link>
        </Menu.Item>
        <Menu.Item key='/404'>
          <Link to='/page-you-dont-know'><Icon type='frown-circle' />404</Link>
        </Menu.Item>
        <Menu.Item key='/antd'>
          <a href='https://github.com/dvajs/dva' target='_blank'>dva</a>
        </Menu.Item>
      </Menu>
      {style.userInfo}
      <UserDown className={`${style.userInfo}`} />
    </div>
  );
};

export default Header;
