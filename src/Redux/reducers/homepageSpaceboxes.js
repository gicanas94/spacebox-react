const homepageSpaceboxesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HOMEPAGE_SPACEBOXES_SET': {
      return {
        ...state,
        all: action.spaceboxes,
      };
    }
    default:
      return state;
  }
};

export default homepageSpaceboxesReducer;
