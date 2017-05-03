import handleResponse from './utils/handleResponse';
export const RECEIVE_CREATED_USERNAME = 'RECEIVE_CREATED_USERNAME';

function receiveUpdatedUsername(username) {
  return {
    type: RECEIVE_CREATED_USERNAME,
    username
  };
}

export function updateUsernameRequest(username) {
  return dispatch => {
    return fetch('/api/profile/username', {
      method: 'POST',
      body: JSON.stringify(username),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(receiveUpdatedUsername(data));
    });
  }
}
