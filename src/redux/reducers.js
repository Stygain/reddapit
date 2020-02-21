import { combineReducers } from 'redux';

import {
  ADD_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN,
  ADD_USERNAME,
  ADD_REDDIT_APP,
  ADD_REDDIT_APP_VERSION
} from './actions.js';


function accessTokenReducer(state = "", action) {
  switch (action.type) {
    case ADD_ACCESS_TOKEN:
      return action.accessToken;

    case REMOVE_ACCESS_TOKEN:
      return "";

    default:
      return state;
  }
}

function usernameReducer(state = "", action) {
  switch (action.type) {
    case ADD_USERNAME:
      return action.username;

    default:
      return state;
  }
}

function redditAppReducer(state = "", action) {
  switch (action.type) {
    case ADD_REDDIT_APP:
      return action.redditApp;

    default:
      return state;
  }
}

function redditVersionReducer(state = "", action) {
  switch (action.type) {
    case ADD_REDDIT_APP_VERSION:
      return action.redditVersion;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  username: usernameReducer,
  redditApp: redditAppReducer,
  redditVersion: redditVersionReducer
});

export default rootReducer;
