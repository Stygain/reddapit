export const SET_TITLE = 'SET_TITLE';
export const CLEAR_TITLE = 'CLEAR_TITLE';
export const SET_MODAL_SHOW = 'SET_MODAL_SHOW';
export const SET_PARENT_COMMENT = 'SET_PARENT_COMMENT';
export const SET_PAGE = 'SET_PAGE';


export function setTitle(title) {
  console.log("Set title");
  return { type: SET_TITLE, title };
}

export function clearTitle() {
  console.log("Clear title");
  return { type: CLEAR_TITLE };
}

export function setModalShow(show) {
  console.log("Set modal show");
  return { type: SET_MODAL_SHOW, show };
}

export function setParentComment(id) {
  console.log("Set parent comment");
  return { type: SET_PARENT_COMMENT, id };
}

export function setPage(pageType, page) {
  console.log("Set page");
  return { type: SET_PAGE, pageType, page };
}
