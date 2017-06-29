import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';

function Login() {
  return (
    <div className={styles.normal}>
      <input value='+1' id='country_code' />
      <input placeholder='phone number' id='phone_number' />
      <button onClick='smsLogin();'>Login via SMS</button>
      <div>OR</div>
      <input placeholder='email' id='email' />
      <button onClick='emailLogin();'>Login via Email</button>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
