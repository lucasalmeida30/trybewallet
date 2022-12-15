export const ACTION_LOGIN = 'ACTION_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCESS = 'REQUEST_CURRENCIES_SUCESS';
export const REQUEST_CURRENCIES_ERRO = 'REQUEST_CURRENCIES_ERRO';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  email,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const requestCurrenciesSucess = (payload) => ({
  type: REQUEST_CURRENCIES_SUCESS,
  payload,
});

const requestCurrenciesErro = (erro) => ({
  type: REQUEST_CURRENCIES_ERRO,
  payload: erro,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,

});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  payload: id,

});

export const fetchApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return json;
};

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const json = await fetchApi();
    const filterData = Object.keys(json).filter((element) => element !== 'USDT');
    dispatch(requestCurrenciesSucess(filterData));
  } catch (error) {
    dispatch(requestCurrenciesErro(error));
  }
};

export default actionLogin;
