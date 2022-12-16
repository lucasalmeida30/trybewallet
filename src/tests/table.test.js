import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('should have input fields and button working properly', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const descriptionInput = screen.getByTestId('description-input');
  const valueInput = screen.getByTestId('value-input');
  const addExpense = screen.getByRole('button', { id: 'expense-button' });

  userEvent.type(valueInput, '200');
  userEvent.type(descriptionInput, 'Coxinha');
  userEvent.click(addExpense);

  const deleteButton = await screen.findByTestId('delete-btn');

  expect(deleteButton).toBeInTheDocument();

  userEvent.type(valueInput, '500');
  userEvent.type(descriptionInput, 'Bolo');
  userEvent.click(addExpense);

  const expense1 = await screen.findByText('Coxinha');
  const expense2 = await screen.findByText('Bolo');

  expect(expense1).toBeInTheDocument();
  expect(expense2).toBeInTheDocument();

  userEvent.click(deleteButton);

  expect(expense2).not.toBeInTheDocument();

  userEvent.click(deleteButton);

  expect(expense1).not.toBeInTheDocument();
});
