import MainLayout from 'MainLayout/MainLayout';
import { connect } from 'dva';

const mapStateToProps = ({ users }) => {
  return {
    loginUser: users.loginUser,
    CSRF: users.csrf,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetCsrf: () => {
      dispatch({ type: 'users/getCsrf' });
    },
    checkLogin: (params) => {
      dispatch({ type: 'users/checkLogin', payload: { params } });
    },
    check: () => {
      dispatch({ type: 'users/onGetCurrentUser' });
    },
    onLogout: () => {
      dispatch({ type: 'users/onLogout' });
    },
    test: () => {
      console.log('11111');
      dispatch({ type: 'users/testLogin' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
