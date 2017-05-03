import { RECEIVE_PUBLIC_PROFILE, RECEIVE_SCOPES_PUBLICLY } from '../actions/publicProfile/profile';
import { combineReducers } from 'redux';

function bioAndUsername(state = {}, action={}) {
  switch (action.type) {
    case RECEIVE_PUBLIC_PROFILE:
      return Object.assign({}, state, {
        bio: action.publicProfile.bio,
        username: action.publicProfile.username
      });

    default:
      return state;
  }
}

function scopes(state = [], action={}) {
  switch (action.type) {
    case RECEIVE_SCOPES_PUBLICLY:
      return action.scopes;

    default:
      return state;
  }
}

const publicProfile = combineReducers({
  bioAndUsername,
  scopes
});

export default publicProfile;
