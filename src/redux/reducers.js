import { combineReducers } from 'redux';

import {
  SET_TITLE,
  CLEAR_TITLE
} from './actions.js';


function titleReducer(state = "", action) {
  switch (action.type) {
    case SET_TITLE:
      return action.title;

    case CLEAR_TITLE:
      return "";

    default:
      return state;
  }
}


const rootReducer = combineReducers({
  title: titleReducer,
});

export default rootReducer;
