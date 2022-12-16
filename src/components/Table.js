import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  deleteExpensesTable = (id) => {
    const { expenses, dispatch } = this.props;
    const expenseId = expenses.filter((e) => e.id !== id);
    dispatch(deleteExpenses(expenseId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map(({
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              }) => (
                <tr data-testid="linha-table" key={ id }>
                  <td>{description}</td>
                  <td>{tag }</td>
                  <td>{method }</td>
                  <td>{(+value).toFixed(2) }</td>
                  <td>{exchangeRates[currency].name }</td>
                  <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(+value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpensesTable(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
