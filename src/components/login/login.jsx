import { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setAuthToken } from '../../actions/auth';
import { redirectToAuthenticateUri } from '../../helpers/auth-helpers';

class Login extends Component {

  tokenReceived() {
    return window.location.hash && window.location.hash.indexOf('access_token') > 0;
  }

  processHash(hash) {
    const token = hash.substring(hash.indexOf('access_token=') + 'access_token='.length,
      hash.indexOf('&'));
    const expiresIn = hash.substring(hash.indexOf('expires_in=') + 'expires_in='.length);
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + parseInt(expiresIn, 10));

    this.props.dispatch(setAuthToken(token, expires));
  }

  render() {
    if (this.tokenReceived()) {
      this.processHash(window.location.hash);
      browserHistory.push('/');
    }
    else {
      redirectToAuthenticateUri();
    }
    return null;
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
