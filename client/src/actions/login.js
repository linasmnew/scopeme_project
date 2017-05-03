import handleResponse from './utils/handleResponse';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true
  };
}

export function loginRequest(userData) {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(receiveLogin());
    });
  }
}
