import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_ERRO,
  REQUEST_CURRENCIES_SUCESS } from '../actions/index';

const inittialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = inittialState, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case REQUEST_CURRENCIES_SUCESS:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case REQUEST_CURRENCIES_ERRO:
    return {
      ...state,
      currencies: action.payload.erro.message || 'Error',
    };
  default:
    return state;
  }
};

export default walletReducer;
