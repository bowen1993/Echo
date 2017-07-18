import React, { Component } from 'react';
import { Avatar, Tabs } from 'antd';
import { CustomIcon } from 'Common';
import style from './Profile.less';

const TabPane = Tabs.TabPane;

class UserProfile extends Component {
  render() {
    return (
      <div className={`${style.profile}`}>
        <div className={`${style.background}`}></div>
        <div className={`${style.baseInfo}`}>
          <Avatar size='large' className={`${style.avator}`} />
          <span>{this.props.loginUser.username}</span><CustomIcon type='pen'></CustomIcon>
          <div className={`${style.userTag}`}></div>
        </div>
        <div>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='My Questions' key='1'></TabPane>
            <TabPane tab='My Answers' key='2'>Content of Tab Pane 2</TabPane>
            <TabPane tab='Others' key='3'>Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default UserProfile;
