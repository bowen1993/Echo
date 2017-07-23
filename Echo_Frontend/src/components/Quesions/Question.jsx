import React, { Component } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import PrueAnswer from 'Answers/PrueAnswer';
import PrueQuestion from './PrueQuestion';
import style from './Question.less';

class Question extends Component {
  render() {
    const { question } = this.props;
    return (
      <div className={`${style.content}`}>
        <div>
          <PrueQuestion question={question}/>
          {
            _.map(question.answers, it => <PrueAnswer answer={it}/>)
          }
        </div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }, ownProps) => {
  return {
    question: questions.question,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetQuestionById: (id) => {
      dispatch({ type: 'questions/onGetQuestionById', payload: { id } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
