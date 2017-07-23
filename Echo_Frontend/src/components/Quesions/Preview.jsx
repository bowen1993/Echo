import React, { Component } from 'react';
import { CustomIcon as Icon } from 'Common';
import { Button } from 'antd';
import { Link } from 'react-router';
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
  upVote(e) {
    e.preventDefault();
    if (this.state.isUp) return;
    const downVotes = this.state.isDown ? -1 : 0;
    this.setState({ isUp: true, isDown: false });
    this.props.onVote(this.props.suggestion.answers[0].id, 1, downVotes);
  }
  downVote(e) {
    e.preventDefault();
    if (this.state.isDown) return;
    const upVotes = this.state.isUp ? -1 : 0;
    this.setState({ isUp: false, isDown: true });
    this.props.onVote(this.props.suggestion.answers[0].id, upVotes, 1);
  }
  onCancel() {

  }
  showPanel(e) {
    e.preventDefault();
    this.setState({ isShowAnswer: true });
    // this.answer.getWrappedInstance().show();
    this.props.showPanel();
  }
  closePanel(e) {
    this.setState({ isShowAnswer: false });
  }
  render() {
    const { title, content, answers, id } = this.props.suggestion;
    return (
      <div>
        <Link to={`/questions/${id}`}>
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
                <Button onClick={e => this.upVote(e)} type={this.state.isUp ? 'primary' : 'default'}>
                  <Icon style={{ fontSize: '12px' }} type='Up'/>Upvote ( {answers[0] && answers[0].up} )
              </Button>
                <Button onClick={e => this.downVote(e)} type={this.state.isDown ? 'danger' : 'default'}>downvote</Button>
              </ButtonGroup>
              <Button className='' onClick={e => this.showPanel(e)} type='primary'>My Answer</Button>
            </footer>
          </article>
        </Link>
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
    onVote: (answerId, up, down) => {
      dispatch({ type: 'answers/onVote', payload: { answerId, up, down } });
    },
    showPanel: () => {
      dispatch({ type: 'answers/changePanelVisible' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewQ);

