import React, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import { CustomIcon } from 'common';

const MenuItem = Menu.Item;

class UserDown extends Component {
  render() {
    const menu = (
      <Menu>
        <MenuItem>个人设置</MenuItem>
        <MenuItem>登出</MenuItem>
      </Menu>
    );
    console.log(this.props.className);
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
