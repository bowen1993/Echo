import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Tabs, Spin } from 'antd';
import { CustomIcon } from 'Common';
import ProfileModal from './ProfileModal';

import style from './Profile.less';

const TabPane = Tabs.TabPane;

class UserProfile extends Component {
  showProfileModal() {
    this.modal.show();
  }
  render() {
    console.log(this.props.isFetching);
    return (
      <Spin spinning={!!this.props.isFetching}>
        <div className={`${style.profile}`}>
          <div className={`${style.background}`}></div>
          <div className={`${style.baseInfo}`}>
            <Avatar size='large' className={`${style.avator}`} />
            <span>{this.props.loginUser.username}/{!!this.props.isFetching}</span><CustomIcon type='pen' onClick={() => this.showProfileModal()}></CustomIcon>
            <div className={`${style.userTag}`}></div>
          </div>
          <div>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='My Questions' key='1'></TabPane>
              <TabPane tab='My Answers' key='2'>Content of Tab Pane 2</TabPane>
              <TabPane tab='Others' key='3'>Content of Tab Pane 3</TabPane>
            </Tabs>
          </div>
          <ProfileModal ref={ref => this.modal = ref} user={this.props.loginUser} updateUserInfo={this.props.updateUserInfo}/>
        </div>
      </Spin>
    );
  }
}

export default UserProfile;
