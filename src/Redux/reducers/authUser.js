import SecureLS from 'secure-ls';

const ls = new SecureLS();

const initialState = ls.get('au');

const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return action.authUser;
    }
    default:
      return state;
  }
};

export default authUserReducer;
