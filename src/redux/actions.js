export const SET_TITLE = 'SET_TITLE';
export const CLEAR_TITLE = 'CLEAR_TITLE';

export function setTitle(title) {
  console.log("Set title");
  return { type: SET_TITLE, title };
}

export function clearTitle(id, count) {
  console.log("Clear title");
  return { type: CLEAR_TITLE };
}
