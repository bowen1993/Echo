import React, { Component } from 'react';
import { CustomIcon as Icon } from 'Common';
import { Button } from 'antd';
import Answer from 'Editor/Answer';
import { transContentToStr } from 'utils';
import style from './Preview.less';

const ButtonGroup = Button.Group;

class PreviewQ extends Component {
  state = {
    isUp: false,
    isDown: false,
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
  render() {
    const { title, content } = this.props.suggestion;
    console.log(typeof content);
    return (
      <div>
        <article className={`${style.content}`}>
          <h1>{title}</h1>
          <article>
            {transContentToStr(content)}
          </article>
          <footer className={`${style.footer}`}>
            <Button className='' onClick={() => this.answer.getWrappedInstance().show()} type='primary'>My Answer</Button>
            <ButtonGroup>
              <Button onClick={() => this.upVote()} type={this.state.isUp ? 'primary' : 'default'}>
                <Icon style={{ fontSize: '12px' }} type='Up'/>Upvote
              </Button>
              <Button onClick={() => this.downVote()} type={this.state.isDown ? 'danger' : 'default'}>downvote</Button>
            </ButtonGroup>
          </footer>
        </article>
        <Answer question={this.props.suggestion} ref={ref => this.answer = ref}></Answer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetAnswer: (answerId) => {
      dispatch({ type: 'answers/onGetAnswer', payload: { answerId } });
    },
  };
};

export default PreviewQ;
