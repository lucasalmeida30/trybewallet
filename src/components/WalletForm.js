import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchApi, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    category: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  saveExpense = async () => {
    const { value, method, description, currency, category } = this.state;
    const { dispatch, idToEdit } = this.props;
    const exchangeRates = await fetchApi();
    // delete exchangeRates.USDT;
    const newObj = {
      id: idToEdit,
      value,
      method,
      description,
      currency,
      tag: category,
      exchangeRates,
    };
    dispatch(addExpense(newObj));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiroooo',
      category: 'Alimentação',
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { value, method, description, currency, category } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.map((e, index) => <option key={ index }>{e}</option>)}
            </select>
          </label>

          <label htmlFor="pagamento">
            Método de pagamento:
            <select
              onChange={ this.handleChange }
              name="method"
              data-testid="method-input"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="categoria">
            Categoria:
            <select
              name="category"
              value={ category }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <label htmlFor="descrição">
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.saveExpense }
          >
            Adicionar despesa
          </button>
        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
