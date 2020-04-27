let alertTimeouts = [];

export const alertReset = () => (dispatch) => {
  for (let i = 0; i < alertTimeouts.length; i += 1) {
    clearTimeout(alertTimeouts[i]);
  }

  alertTimeouts = [];

  dispatch({ type: 'ALERT_RESET' });
};

export const alertSet = (alert) => (dispatch) => {
  dispatch(alertReset());

  if (alert) {
    alertTimeouts.push(
      setTimeout(() => dispatch(alertReset()), alert.closeTime || 5000),
    );

    dispatch({
      type: 'ALERT_SET',
      alert,
    });
  }
};

export const appLocaleSet = (locale) => ({
  type: 'APP_LOCALE_SET',
  locale,
});

export const appThemeSet = (theme) => ({
  type: 'APP_THEME_SET',
  theme,
});

export const authUserSet = (authUser) => ({
  type: 'AUTH_USER_SET',
  authUser,
});

export const confirmationModalOpen = (content) => ({
  type: 'CONFIRMATION_MODAL_OPEN',
  content,
});

export const confirmationModalClose = () => ({
  type: 'CONFIRMATION_MODAL_CLOSE',
});

export const homepageSpaceboxesSet = (spaceboxes) => ({
  type: 'HOMEPAGE_SPACEBOXES_SET',
  spaceboxes,
});

export const isLoadingSet = (isLoading) => ({
  type: 'IS_LOADING_SET',
  isLoading,
});

export const searchBarChange = (draft) => ({
  type: 'SEARCH_BAR_CHANGE',
  draft,
});
