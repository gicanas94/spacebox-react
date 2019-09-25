let alertTimeouts = [];

export const alertReset = () => (dispatch) => {
  for (let i = 0; i < alertTimeouts.length; i += 1) {
    clearTimeout(alertTimeouts[i]);
  }

  alertTimeouts = [];

  dispatch({ type: 'ALERT_RESET' });
};

export const alertSet = alert => (dispatch) => {
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

export const authUserSet = authUser => ({
  type: 'AUTH_USER_SET',
  authUser,
});

export const loadingSet = isLoading => ({
  type: 'LOADING_SET',
  isLoading,
});

export const searchBarChange = draft => ({
  type: 'SEARCH_BAR_CHANGE',
  draft,
});

export const spaceboxesSet = spaceboxes => ({
  type: 'SPACEBOXES_SET',
  spaceboxes,
});
