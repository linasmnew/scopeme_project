//In this file we'll combine the whole applications state
import { combineReducers } from 'redux';
import auth from './auth';
import scopes from './scopes';
import profile from './profile';
import publicProfile from './publicProfile';

const appReducer = combineReducers({
  publicProfile,
  auth,
  profile,
  scopes
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
