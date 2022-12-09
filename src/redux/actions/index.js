export const ACTION_LOGIN = 'ACTION_LOGIN';

const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  email,
});

export default actionLogin;
