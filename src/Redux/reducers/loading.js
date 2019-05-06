const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_SET':
      return action.isLoading;
    default:
      return state;
  }
};

export default loadingReducer;
