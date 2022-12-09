import { ACTION_LOGIN } from '../actions';

export const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
