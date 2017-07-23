import React, { Component } from 'react';
import { transContentToStr } from 'utils';
import { Button } from 'antd';
import { connect } from 'dva';
import { CustomIcon as Icon } from 'Common';
import style from './PrueAnswer.less';

const ButtonGroup = Button.Group;

class PrueAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUp: false,
      isDown: false,
      isShowAnswer: false,
    };
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote() {
    if (this.state.isUp) return;
    const downVotes = this.state.isDown ? -1 : 0;
    this.setState({ isUp: true, isDown: false });
    this.props.onVote(this.answer.id, 1, downVotes);
  }

  downVote() {
    if (this.state.isDown) return;
    const upVotes = this.state.isUp ? -1 : 0;
    this.setState({ isUp: false, isDown: true });
    this.props.onVote(this.answer.id, upVotes, 1);
  }

  render() {
    const { answer, className } = this.props;
    return (
      <article className={className}>
        <h2>{answer.title}</h2>
        <section>{transContentToStr(answer.content)}</section>
        <footer className={`${style.footer}`}>
          <ButtonGroup>
            <Button onClick={() => this.upVote()} type={this.state.isUp ? 'primary' : 'default'}>
              <Icon style={{ fontSize: '12px' }} type='Up'/>Upvote
              </Button>
            <Button onClick={() => this.downVote()} type={this.state.isDown ? 'danger' : 'default'}>downvote</Button>
          </ButtonGroup>
        </footer>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onVote: (answerId, up, down) => {
      dispatch({ type: 'answers/onVote', payload: { answerId, up, down } });
    },
  };
};

export default connect(null, mapDispatchToProps)(PrueAnswer);
