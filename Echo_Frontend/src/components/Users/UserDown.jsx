import React, { Component } from 'react';
import { Link } from 'react-router';
import { Dropdown, Menu } from 'antd';
import { CustomIcon } from 'Common';

const MenuItem = Menu.Item;

class UserDown extends Component {
  render() {
    const menu = (
      <Menu>
        <MenuItem>
          <Link to='/users/profile'> 个人设置</Link>
        </MenuItem>
        <MenuItem>
          <span onClick={() => this.props.logout()}>登出</span>
        </MenuItem>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <span className={this.props.className}>
          <CustomIcon type='avator-male' className='ant-dropdown-link' placement='bottomRight' />
        </span>
      </Dropdown>
    );
  }
}

export default UserDown;
