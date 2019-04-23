const initialState = { authUser: JSON.parse(localStorage.getItem('authUser')) };

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
