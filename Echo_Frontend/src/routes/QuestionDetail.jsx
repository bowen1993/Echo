import { connect } from 'dva';
import QuestionDetail from 'Questions/Question';

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


export default QuestionDetail;
