import { connect } from 'dva';
import PureUser from 'Users/Users';
import PureProfile from 'Users/Profile';

const mapStateToProps = ({ users, questions, isFetching }) => {
  return {
    isFetching: isFetching.effects['users/onChangeUserInfo'],
    user: users.user,
    loginUser: users.loginUser,
    questions: questions.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: () => {
      dispatch({ type: 'users/onGetUser' });
    },
    checkLogin: (params) => {
      dispatch({ type: 'users/checkLogin', payload: { params } });
    },
    updateUserInfo: (userInfo) => {
      dispatch({ type: 'users/onChangeUserInfo', payload: { userInfo } });
    },
    onGetQuestionsByAuthor: (authorId) => {
      dispatch({ type: 'questions/getQuestionsByAuthor', payload: { authorId } });
    },
  };
};

const User = connect(mapStateToProps, mapDispatchToProps)(PureUser);
const UserProfile = connect(mapStateToProps, mapDispatchToProps)(PureProfile);

export {
  User,
  UserProfile
};
