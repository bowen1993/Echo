import { connect } from 'dva';

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
