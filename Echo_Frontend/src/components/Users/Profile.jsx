import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Tabs, Spin } from 'antd';
import { CustomIcon } from 'Common';
import Preview from 'Questions/Preview';
import _ from 'lodash';
import ProfileModal from './ProfileModal';

import style from './Profile.less';

const TabPane = Tabs.TabPane;

class UserProfile extends Component {
  componentDidMount() {
    this.props.onGetQuestionsByAuthor(this.props.loginUser.id);
  }

  showProfileModal() {
    this.modal.show();
  }

  render() {
    return (
      <Spin spinning={!!this.props.isFetching}>
        <div className={`${style.profile}`}>
          <div className={`${style.background}`}></div>
          <div className={`${style.baseInfo}`}>
            <Avatar size='large' className={`${style.avator}`} />
            <span>{this.props.loginUser.username}</span><CustomIcon type='pen' onClick={() => this.showProfileModal()}></CustomIcon>
            <div className={`${style.userTag}`}></div>
          </div>
          <div>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='My Questions' key='1'>
                {
                  _.map(this.props.questions, (it, i) => <Preview key={i} suggestion={it} />)
                }
              </TabPane>
              <TabPane tab='My Answers' key='2'>

              </TabPane>
              <TabPane tab='Others' key='3'>

              </TabPane>
            </Tabs>
          </div>
          <ProfileModal ref={ref => this.modal = ref} user={this.props.loginUser} updateUserInfo={this.props.updateUserInfo}/>
        </div>
      </Spin>
    );
  }
}

export default UserProfile;
