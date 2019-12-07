const confirmationModalReducer = (state = null, action) => {
  switch (action.type) {
    case 'CONFIRMATION_MODAL_OPEN':
      return action.content;
    case 'CONFIRMATION_MODAL_CLOSE':
      return null;
    default:
      return state;
  }
};

export default confirmationModalReducer;
