const alertReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALERT_SET':
      return action.alert;
    case 'ALERT_RESET':
      return null;
    default:
      return state;
  }
};

export default alertReducer;
