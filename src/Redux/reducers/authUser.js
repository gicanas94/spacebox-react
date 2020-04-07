// import SecureLS from 'secure-ls';

// const ls = new SecureLS();
const initialState = JSON.parse(localStorage.getItem('authUser'));

const authUserReducer = (state = initialState || false, action) => {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return action.authUser;
    }
    default:
      return state;
  }
};

export default authUserReducer;
