import handleResponse from './utils/handleResponse';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

function receiveSignup() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
  };
}

export function signupRequest(userData) {
  return dispatch => {
    return fetch('/api/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin',
      body: JSON.stringify(userData)
    }).then(handleResponse).then(data => {
        return dispatch(receiveSignup());
    });
  }
}
