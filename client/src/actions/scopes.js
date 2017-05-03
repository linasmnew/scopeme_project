import handleResponse from './utils/handleResponse';

export const ADD_SCOPE = 'ADD_SCOPE';
export const RECEIVE_SCOPES = 'RECEIVE_SCOPES';
export const REMOVE_SCOPE = 'REMOVE_SCOPE';
export const SCOPE_UPDATED = 'SCOPE_UPDATED';
export const SCOPE_FETCHED = 'SCOPE_FETCHED';

function addScope(scope) {
  return {
    type: ADD_SCOPE,
    scope
  };
}

function receiveScopes(scopes) {
  return {
    type: RECEIVE_SCOPES,
    scopes
  };
}

function removeScope(scopeId) {
  return {
    type: REMOVE_SCOPE,
    scopeId
  }
}

function scopeUpdated(scope) {
  return {
    type: SCOPE_UPDATED,
    scope
  }
}

function scopeFetched(scope) {
  return {
    type: SCOPE_FETCHED,
    scope
  }
}


export function addScopeRequest(scopeData) {
  return dispatch => {
    return fetch('/api/scopes', {
      method: 'POST',
      body: JSON.stringify(scopeData),
      headers: {  "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(addScope(data));
    });
  }
}

export function getAllScopesRequest() {
  return dispatch => {
    return fetch('/api/scopes', {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(receiveScopes(data));
    });
  }
}

export function removeScopeRequest(scopeId) {
  return dispatch => {
    return fetch(`/api/scopes/${scopeId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
      return dispatch(removeScope(scopeId));
    });
  }
}

//part of edit scope, prefetching to fill out form
export function fetchScope(scopeId) {
  return dispatch => {
    return fetch(`/api/scopes/${scopeId}`, {
      method: 'GET',
      headers: {  "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
        return dispatch(scopeFetched(data));
    });
  }
}

export function editScopeRequest(scopeData) {
  return dispatch => {
    return fetch(`/api/scopes/${scopeData._id}`, {
      method: 'PUT',
      body: JSON.stringify(scopeData),
      headers: { "Content-Type": "application/json" },
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
      return dispatch(scopeUpdated(data));
    });
  }
}
