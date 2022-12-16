import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';

test('se as despesas são adicionadas corretamente na carteira', () => {
  renderWithRouterAndRedux(<WalletForm />);
  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  // const currency = screen.getByTestId('currency-input');
  const method = screen.getByTestId('method-input');
  const tag = screen.getByTestId('tag-input');

  expect(value).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  // expect(currency).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(tag).toBeInTheDocument();

  userEvent.type(value, '35');
  expect(value).toHaveValue(35);
  userEvent.type(tag, 'Alimentação');
  expect(tag).toHaveValue('Alimentação');
});

test('se a requisição é feita, e os campos das options são preenchidos pelo estado global', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => mockData,
  }));
  renderWithRouterAndRedux(<WalletForm />);

  await screen.findByTestId('currency-input');
});

test('se é possivel adicionar uma despesa', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => mockData,
  }));
  renderWithRouterAndRedux(<Wallet />);

  expect(global.fetch).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledTimes(1);

  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  // const currency = await screen.findByTestId('currency-input');
  // const method = screen.getByTestId('method-input');
  // const tag = screen.getByTestId('tag-input');
  const button = screen.getByRole('button', { name: /adicionar despesa/i });

  userEvent.type(value, '30');
  userEvent.type(description, 'uber');
  // userEvent.selectOptions(currency, 'USD');
  // userEvent.type(method, 'Dinheiro');
  // userEvent.type(tag, 'Transporte');
  userEvent.click(button);

  expect(value).toHaveValue(30);
  expect(description).toHaveValue('uber');
  // expect(currency).toHaveValue('USD');
  // expect(method).toHaveValue('Dinheiro');
  // expect(tag).toHaveValue('Transporte');
});
