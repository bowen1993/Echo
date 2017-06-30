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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
