export const SET_TITLE = 'SET_TITLE';
export const CLEAR_TITLE = 'CLEAR_TITLE';
export const SET_MODAL_SHOW = 'SET_MODAL_SHOW';

export function setTitle(title) {
  console.log("Set title");
  return { type: SET_TITLE, title };
}

export function clearTitle(id, count) {
  console.log("Clear title");
  return { type: CLEAR_TITLE };
}

export function setModalShow(show) {
  console.log("Set modal show");
  return { type: SET_MODAL_SHOW, show };
}
