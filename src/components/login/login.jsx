import { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setAuthToken } from '../../actions/auth';
import { redirectToAuthenticateUri } from '../../helpers/auth-helpers';

class Login extends Component {

  componentDidMount() {
    if (!this.props.hash) redirectToAuthenticateUri();
  }

  processHash(hash) {
    const token = hash.substring(hash.indexOf('#access_token=') + '#access_token='.length,
      hash.indexOf('&'));
    const expiresIn = hash.substring(hash.indexOf('expires_in=') + 'expires_in='.length);
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + parseInt(expiresIn, 10));

    this.props.dispatch(setAuthToken(token, expires));
  }

  render() {
    if (this.props.hash) {
      this.processHash(this.props.hash);
      browserHistory.push('/velferd');
    }
    return null;
  }
}

Login.propTypes = {
  hash: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
