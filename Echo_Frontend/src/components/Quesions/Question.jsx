import React, { Component } from 'react';
import { connect } from 'dva';

class Question extends Component {
  render() {
    return (
      <div>

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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Question);
