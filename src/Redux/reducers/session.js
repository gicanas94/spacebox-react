import SecureLS from 'secure-ls';

const ls = new SecureLS();

const initialState = { authUser: ls.get('au') };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return {
        ...state,
        authUser: action.authUser,
      };
    }
    default:
      return state;
  }
};

export default sessionReducer;
