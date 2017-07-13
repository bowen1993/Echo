import { connect } from 'dva';
import PureUser from 'Users/Users';
import PureProfile from 'Users/Profile';

const mapStateToProps = ({ users }) => {
  return {
    user: users.user,
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
  };
};

const User = connect(mapStateToProps, mapDispatchToProps)(PureUser);
const UserProfile = connect(mapStateToProps, mapDispatchToProps)(PureProfile);

export {
  User,
  UserProfile,
};
