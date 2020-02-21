import { combineReducers } from 'redux';

import { ADD_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN } from './actions.js';

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

const rootReducer = combineReducers({
  accessToken: accessTokenReducer
});

export default rootReducer;
