import { combineReducers } from 'redux';

import alertReducer from './alert';
import appLocaleReducer from './appLocale';
import loadingReducer from './loading';
import searchReducer from './search';
import sessionReducer from './session';
import spaceboxReducer from './spacebox';

const rootReducer = combineReducers({
  activeAlert: alertReducer,
  appLocale: appLocaleReducer,
  isLoading: loadingReducer,
  session: sessionReducer,
  spacebox: spaceboxReducer,
  spaceboxToSearch: searchReducer,
});

export default rootReducer;
