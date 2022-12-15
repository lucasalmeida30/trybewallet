import { screen } from '@testing-library/react';
import Header from '../components/Header';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('se as informações do Header estar correta', () => {
  const initialState = {
    user: {
      email: 'email@example.com',
    },
    wallet: {
      expenses: [
        {
          value: '200',
          currency: 'USD',
          exchangeRates: mockData,
        },
        {
          value: '50',
          currency: 'EUR',
          exchangeRates: mockData,
        },
      ],
    },
  };

  const sum = 200 * 4.78 + 50 * 5.0;

  renderWithRouterAndRedux(<Header />, { initialState });
  const email = screen.getByTestId('email-field');
  expect(email).toHaveTextContent('email@example.com');
  expect(email).toBeInTheDocument();

  const sumTotal = screen.getByTestId('total-field');
  expect(sumTotal).toHaveTextContent(sum);
  expect(sumTotal).toBeInTheDocument();

  const brl = screen.getByTestId('header-currency-field');
  expect(brl).toHaveTextContent(/brl/i);
  expect(brl).toBeInTheDocument();
});
