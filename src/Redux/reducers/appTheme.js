import themes from '../../styles/themes';

const initialState = JSON.parse(
  localStorage.getItem('appTheme'),
) || themes[0];

const appThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APP_THEME_SET':
      localStorage.setItem('appTheme', JSON.stringify(action.theme));
      return action.theme;
    default:
      return state;
  }
};

export default appThemeReducer;
