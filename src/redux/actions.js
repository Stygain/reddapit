export const ADD_ACCESS_TOKEN = 'ADD_ACCESS_TOKEN';
export const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN';

export function addAccessToken(accessToken) {
  return { type: ADD_ACCESS_TOKEN, accessToken };
}

export function removeAccessToken(accessToken) {
  return { type: REMOVE_ACCESS_TOKEN, accessToken };
}
