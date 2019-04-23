import { combineReducers } from 'redux';
import alertReducer from './alert';
import sessionReducer from './session';
import spaceboxReducer from './spacebox';
import userReducer from './user';

const rootReducer = combineReducers({
  alert: alertReducer,
  session: sessionReducer,
  spacebox: spaceboxReducer,
  user: userReducer,
});

export default rootReducer;
