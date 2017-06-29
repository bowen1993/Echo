import React from 'react';
import PropTypes from 'prop-types';

class AccountKit extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.state = {
      disabled: false,
    };
  }

  componentDidMount() {
    if (!window.AccountKit) {
      ((cb) => {
        const tag = document.createElement('script');
        tag.setAttribute(
          'src',
          `https://sdk.accountkit.com/${this.props.language}/sdk.js`,
        );
        tag.setAttribute('id', 'account-kit');
        tag.setAttribute('type', 'text/javascript');
        tag.onload = cb;
        document.head.appendChild(tag);
      })(() => {
        window.AccountKit_OnInteractive = this.onLoad.bind(this);
      });
    }
  }

  onLoad() {
    const { appId, csrf, version } = this.props;
    console.log(csrf);
    window.AccountKit.init({
      appId,
      state: csrf,
      version,
      fbAppEventsEnabled: false,
      debug: true,
    });
    this.setState({
      disabled: false,
    });
  }

  signIn() {
    if (this.state.disabled) {
      return;
    }
    const { onResponse } = this.props;
    const countryCode = '+86';
    const phoneNumber = '17682319855';
    window.AccountKit.login(this.props.loginType, { }, resp => onResponse(resp));
  }

  render() {
    const disabled = this.state.disabled || this.props.disabled;
    return this.props.children({
      onClick: () => {
        this.signIn();
      },
      disabled,
    });
  }
}

AccountKit.propTypes = {
  csrf: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  loginType: PropTypes.oneOf(['PHONE', 'EMAIL']),
  disabled: PropTypes.bool,
  language: PropTypes.string,
};

AccountKit.defaultProps = {
  disabled: false,
  language: 'en_US',
  loginType: 'PHONE',
};

export default AccountKit;
