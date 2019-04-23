const initialState = { spaceboxes: null };

const applySetSpaceboxes = (state, action) => ({
  ...state,
  spaceboxes: action.spaceboxes,
});

const applySetSpacebox = (state, action) => ({
  ...state,
  spaceboxes: {
    ...state.spaceboxes,
    [action.uid]: action.spacebox,
  },
});

const spaceboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SPACEBOXES_SET': {
      return applySetSpaceboxes(state, action);
    }
    case 'SPACEBOX_SET': {
      return applySetSpacebox(state, action);
    }
    default:
      return state;
  }
};

export default spaceboxReducer;
