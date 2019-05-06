const spaceboxReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SPACEBOXES_SET': {
      return {
        ...state,
        all: action.spaceboxes,
      };
    }
    default:
      return state;
  }
};

export default spaceboxReducer;
