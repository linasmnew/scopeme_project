import handleResponse from './utils/handleResponse';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_UPDATED_PROFILE = 'RECEIVE_UPDATED_PROFILE';

function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile
  };
}

function receiveUpdatedProfile(profile) {
  return {
    type: RECEIVE_UPDATED_PROFILE,
    profile
  };
}

export function getProfileRequest() {
  return dispatch => {
    return fetch('/api/profile', {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(receiveProfile(data));
    });
  }
}

export function updateProfileRequest(profile) {
  return dispatch => {
    return fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(receiveUpdatedProfile(data));
    });
  }
}

export function changePassword(password) {
  return dispatch => {
    return fetch('/api/profile/change_password', {
      method: 'PUT',
      body: JSON.stringify(password),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse);
  }
}

export function removeAccount() {
  return dispatch => {
    return fetch('/api/profile', {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
      return dispatch({type: 'LOGOUT'});
    });
  }
}
