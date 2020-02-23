/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import RedditComment from './RedditComment.js';
import RedditLink from './RedditLink.js';


function FrontPage(props) {
  const [ frontPageData, setFrontPageData ] = useState({children:[]});

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid red; */}

  `;

  useEffect(() => {
    async function fetchFrontPage() {
      let responseBody = {};
      // setLoadingUser(true);
      const response = await fetch(
        ("https://oauth.reddit.com/?raw_json=1"),
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": ("bearer " + cookies.accessToken),
            "User-Agent": (cookies.redditApp + "/" + cookies.redditVersion + " by " + cookies.username)
          }
        }
      );
      responseBody = await response.json();
      console.log(responseBody);

      setFrontPageData(responseBody["data"])
      // setLoadingUser(false)
    }
    fetchFrontPage()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

  return (
    <div css={styling}>
      {
        frontPageData["children"].map((item) => {
          // console.log(item)
          if (item["kind"] === "t1") {
            return(<RedditComment data={item} key={item.data.name} />);
          } else if (item["kind"] === "t3") {
            return(<RedditLink data={item} key={item.data.name} />);
          }
        })
      }
    </div>
  );
}


export default FrontPage;
