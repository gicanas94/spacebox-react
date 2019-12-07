const isLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADING_SET':
      return action.isLoading;
    default:
      return state;
  }
};

export default isLoadingReducer;
