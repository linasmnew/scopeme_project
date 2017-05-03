import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/signup';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/login';

import {
  AUTHENTICATED, UNAUTHENTICATED
} from '../actions/authCheck';


export default function auth(state = {
  isFetching: false,
  isAuthenticated: false
}, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    case UNAUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: undefined
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.errorMessage
      });
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: undefined
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.errorMessage
      });
    default: return state;
  }
}
