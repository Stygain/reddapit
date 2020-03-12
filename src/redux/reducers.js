import { combineReducers } from 'redux';

import {
  SET_TITLE,
  CLEAR_TITLE,
  SET_MODAL_SHOW,
  SET_PARENT_COMMENT
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

function modalShowReducer(state = false, action) {
  switch (action.type) {
    case SET_MODAL_SHOW:
      return action.show;

    default:
      return state;
  }
}

function parentCommentReducer(state = "", action) {
  switch (action.type) {
    case SET_PARENT_COMMENT:
      return action.id;

    default:
      return state;
  }
}


const rootReducer = combineReducers({
  title: titleReducer,
  modalShow: modalShowReducer,
  parentComment: parentCommentReducer,
});

export default rootReducer;
