export const ADD_ACCESS_TOKEN = 'ADD_ACCESS_TOKEN';
export const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN';
export const ADD_USERNAME = 'ADD_USERNAME';
export const ADD_REDDIT_APP = 'ADD_REDDIT_APP';
export const ADD_REDDIT_APP_VERSION = 'ADD_REDDIT_APP_VERSION';

export function addAccessToken(accessToken) {
  return { type: ADD_ACCESS_TOKEN, accessToken };
}

export function removeAccessToken(accessToken) {
  return { type: REMOVE_ACCESS_TOKEN, accessToken };
}

export function addUsername(username) {
  return { type: ADD_USERNAME, username };
}

export function addRedditApp(redditApp) {
  return { type: ADD_REDDIT_APP, redditApp };
}

export function addRedditVersion(redditVersion) {
  return { type: ADD_REDDIT_APP_VERSION, redditVersion };
}
