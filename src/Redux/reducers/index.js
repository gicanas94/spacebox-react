import { combineReducers } from 'redux';

import alertReducer from './alert';
import appLocaleReducer from './appLocale';
import authUserReducer from './authUser';
import confirmationModalReducer from './confirmationModal';
import homepageSpaceboxesReducer from './homepageSpaceboxes';
import isLoadingReducer from './isLoading';
import spaceboxToSearchReducer from './spaceboxToSearch';

const rootReducer = combineReducers({
  alert: alertReducer,
  appLocale: appLocaleReducer,
  authUser: authUserReducer,
  confirmationModal: confirmationModalReducer,
  homepageSpaceboxes: homepageSpaceboxesReducer,
  isLoading: isLoadingReducer,
  spaceboxToSearch: spaceboxToSearchReducer,
});

export default rootReducer;
