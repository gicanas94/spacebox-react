export const alertSet = alert => ({
  type: 'ALERT_SET',
  alert,
});

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
