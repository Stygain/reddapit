/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

async function fetchData() {
  const response = await fetch(
    `https://oauth.reddit.com/api/v1/me`,
    { method: "GET",
    headers: { 'Content-Type': 'application/json', "Authorization": ("bearer " + "23328459-Ol1l09HnycMCR5vXmV6GgN_B9XA"), "User-Agent": ("reddapit" + "/" + "0.1" + " by " + "seekvengeance")} }
  );
  let responseBody = await response.json();
  console.log(responseBody);
}
// let ignore = false;
// const controller = new AbortController();
//
// async function fetchSearchResults() {
//   let responseBody = {};
//   setLoading(true);
//   try {
//     const response = await fetch(
//       `https://api.github.com/search/repositories?q=${query}&sort=stars`,
//       { signal: controller.signal }
//     );
//     responseBody = await response.json();
//   } catch (e) {
//     if (e instanceof DOMException) {
//       console.log("== HTTP request aborted");
//     } else {
//       setError(true);
//       console.log(e);
//     }
//   }
//
//   if (!ignore) {
//     setError(false);
//     setLoading(false);
//     setRepos(responseBody.items);
//   } else {
//     console.log("== ignoring results");
//   }
//   // console.log("== response body:", responseBody);
// }
//
// fetchSearchResults();
// return () => {
//   controller.abort();
//   ignore = true;
// };

function Profile(props) {
  const styling = css`
    border: 1px solid red;

  `;

  return (
    <div css={styling}>
      <p onClick={() => fetchData()}>heres some text</p>
    </div>
  );
}


export default Profile;
