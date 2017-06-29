import React, { Component } from 'react';
import { Avatar, Tabs } from 'antd';
import style from './Profile.less';

const TabPane = Tabs.TabPane;

class UserProfile extends Component {
  render() {
    return (
      <div className={`${style.profile}`}>
        <div className={`${style.baseInfo}`}>
          <Avatar />
          <span>name</span>
        </div>
        <div>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Tab 1' key='1'>Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key='2'>Content of Tab Pane 2</TabPane>
            <TabPane tab='Tab 3' key='3'>Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default UserProfile;
