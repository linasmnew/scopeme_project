export const LOGOUT = 'LOGOUT';

function receiveLogout() {
  return {
    type: LOGOUT,
    isAuthenticated: false
  };
}

export function logoutRequest() {
  return dispatch => {
    return fetch('/api/logout', {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(response => {
      if(response.ok) {
         dispatch(receiveLogout());
        return response.json();
      }

    });
  }
}
