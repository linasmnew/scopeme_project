import handleResponse from '../utils/handleResponse';


export const RECEIVE_PUBLIC_PROFILE = 'RECEIVE_PUBLIC_PROFILE';
export const RECEIVE_SCOPES_PUBLICLY = 'RECEIVE_SCOPES_PUBLICLY';

function receiveProfile(publicProfile) {
  return {
    type: RECEIVE_PUBLIC_PROFILE,
    publicProfile
  };
}


export function getPublicProfile(username) {
  return dispatch => {
    return fetch(`/api/user/bio/${username}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        return response.json().then(data => {
          return dispatch(receiveProfile(data));
        });
      } else {
      }
    });
  }
}



function receiveScopes(scopes) {
  return {
    type: RECEIVE_SCOPES_PUBLICLY,
    scopes
  };
}

export function getAllScopesRequest(username) {
  return dispatch => {
    return fetch(`/api/user/scopes/${username}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        return response.json().then(data => {
          return dispatch(receiveScopes(data));
        });
      } else {
        // console.log('api/user/scopes/:username response bad');
      }
    });
  }
}



export function getUserByUsername(username) {
  return dispatch => {
    return fetch(`/api/user/${username}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse);
  }
}
