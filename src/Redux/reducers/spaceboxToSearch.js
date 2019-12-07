const spaceboxToSearchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_BAR_CHANGE':
      return action.draft;
    default:
      return state;
  }
};

export default spaceboxToSearchReducer;
