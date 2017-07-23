import React, { Component } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import PrueAnswer from 'Answers/PrueAnswer';
import PrueQuestion from './PrueQuestion';

import style from './Question.less';

class Question extends Component {
  componentDidMount() {
    this.props.onGetQuestionById(this.props.id);
  }
  render() {
    const { question } = this.props;
    console.log(question);
    return (
      <div className={`${style.content}`}>
        <div>
          {question && <PrueQuestion className={`${style.common}`} question={question}/> }
          {
            question && question.answers && _.map(question.answers, (it, i) => <PrueAnswer className={`${style.common}`} key={i} answer={it}/>)
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
    id: ownProps.params.id,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetQuestionById: (id) => {
      console.log('232', id);
      dispatch({ type: 'questions/onGetQuestionById', payload: { id } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
