import { combineReducers } from 'redux';

import alertReducer from './alert';
import loadingReducer from './loading';
import searchReducer from './search';
import sessionReducer from './session';
import spaceboxReducer from './spacebox';

const rootReducer = combineReducers({
  activeAlert: alertReducer,
  isLoading: loadingReducer,
  session: sessionReducer,
  spacebox: spaceboxReducer,
  spaceboxToSearch: searchReducer,
});

export default rootReducer;
