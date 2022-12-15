import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

const EMAIL = 'email@gmail.com';

describe('testando a pagina de login', () => {
  test('se a pagina de login é renderizada', () => {
    renderWithRouterAndRedux(<Login />);
    const title = screen.getByRole('heading', { name: /login/i, level: 1 });
    expect(title).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox');
    expect(inputEmail.type).toBe('email');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, EMAIL);
    expect(inputEmail).toHaveValue(EMAIL);

    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    expect(inputPassword.type).toBe('password');
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveValue('123456');

    const button = screen.getByRole('button');
    userEvent.type(inputEmail, 'email@bruno');
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '12345');
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, '.com');
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '66');
    expect(button).toBeDisabled();
  });

  test('se ao clicar no botão de entrar, redireciona para a pagina da carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'email@gmail.com');
    userEvent.type(password, '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
