export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';

export function receiveAuthenticated() {
  return {
    type: AUTHENTICATED,
  };
}

export function receiveUnauthenticated() {
  return {
    type: UNAUTHENTICATED,
  };
}
