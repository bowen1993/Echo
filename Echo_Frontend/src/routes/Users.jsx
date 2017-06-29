import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import MainLayout from '../components/MainLayout/MainLayout';
import PrueUser from '../components/Users/Users';

function Users({ location, ...otherProps }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <PrueUser {...otherProps} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps({ users }) {
  return {
    user: users.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: () => {
      dispatch({ type: 'users/onGetUser' });
    },
    checkLogin: (params) => {
      console.log(params);
      dispatch({ type: 'users/checkLogin', payload: { params } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
