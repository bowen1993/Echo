import React, { Component } from 'react';
import { CustomIcon as Icon } from 'Common';
import { Button } from 'antd';
import { connect } from 'dva';
import Answer from 'Editor/Answer';
import { transContentToStr } from 'utils';
import _ from 'lodash';
import style from './Preview.less';

const ButtonGroup = Button.Group;

class PreviewQ extends Component {
  state = {
    isUp: false,
    isDown: false,
    isShowAnswer: false,
  }
  upVote() {
    if (this.state.isUp) return;
    const downVotes = this.state.isDown ? -1 : 0;
    this.setState({ isUp: true, isDown: false });
    this.props.onVote(1, downVotes);
  }
  downVote() {
    if (this.state.isDown) return;
    const upVotes = this.state.isUp ? -1 : 0;
    this.setState({ isUp: false, isDown: true });
    this.props.onVote(upVotes, 1);
  }
  onCancel() {

  }
  closePanel(e) {
    this.setState({ isShowAnswer: false });
  }
  render() {
    const { title, content, answers } = this.props.suggestion;
    return (
      <div>
        <article className={`${style.content}`}>
          <h1>{title}</h1>
          <article>
            {transContentToStr(content)}
          </article>
          {
            !_.isEmpty(answers) &&
            <article>
              {transContentToStr(answers[0].content)}
            </article>
          }
          <footer className={`${style.footer}`}>
            <ButtonGroup>
              <Button onClick={() => this.upVote()} type={this.state.isUp ? 'primary' : 'default'}>
                <Icon style={{ fontSize: '12px' }} type='Up'/>Upvote
              </Button>
              <Button onClick={() => this.downVote()} type={this.state.isDown ? 'danger' : 'default'}>downvote</Button>
            </ButtonGroup>
            <Button className='' onClick={() => { this.setState({ isShowAnswer: true }); this.answer.getWrappedInstance().show(); }} type='primary'>My Answer</Button>
          </footer>
        </article>
        <div className={`${style.slidePanel} ${this.state.isShowAnswer ? style.visible : ''}`} onClick={e => this.closePanel(e)}>
          <Answer question={this.props.suggestion} ref={ref => this.answer = ref}></Answer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ answers }, ownProps) => {
  return {
    answer: answers.answer,
    visible: answers.slidePanelVisible,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetAnswer: (answerId) => {
      dispatch({ type: 'answers/onGetAnswer', payload: { answerId } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewQ);

