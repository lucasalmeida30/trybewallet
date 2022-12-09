import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actionLogin from '../redux/actions';

const PASSWORD_LENGTH = 5;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: false,
  };

  validationInfo = () => {
    const { password, email } = this.state;
    const validationPassword = password.length >= PASSWORD_LENGTH;
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validationEmail = regexEmail.test(email);
    this.setState(({
      isDisable: validationPassword && validationEmail,
    }));
  };

  getInfoUser = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), this.validationInfo());
  };

  submitButton = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(actionLogin(email));
    history.push('/carteira');
  };

  render() {
    const { isDisable, password, email } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input
          onChange={ this.getInfoUser }
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
        />
        <input
          onChange={ this.getInfoUser }
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
        />
        <button
          type="button"
          disabled={ !isDisable }
          onClick={ this.submitButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
