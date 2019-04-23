const alertReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALERT_SET':
      return {
        ...state,
        alert: action.alert,
      };
    default:
      return state;
  }
};

export default alertReducer;
