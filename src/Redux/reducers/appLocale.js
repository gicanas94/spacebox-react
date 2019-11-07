const appLocaleReducer = (state = 'en', action) => {
  switch (action.type) {
    case 'APP_LOCALE_SET':
      return action.locale;
    default:
      return state;
  }
};

export default appLocaleReducer;
