import handleResponse from './utils/handleResponse';

export function resetPasswordRequest(email) {
  return dispatch => {
    return fetch('/api/reset', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse);
  }
}


export function newPasswordRequest(data, token) {
  return dispatch => {
    return fetch(`/api/reset/${token}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse);
  }
}
