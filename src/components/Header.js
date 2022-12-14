import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, sumTotal } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <p data-testid="total-field">{ sumTotal.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  sumTotal: state.wallet.expenses.reduce((a, b) => a
  + (+b.value * b.exchangeRates[b.currency].ask), 0),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sumTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
