/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import ListingParser from './ListingParser.js';


function FrontPage(props) {
  const [ frontPageData, setFrontPageData ] = useState({data:{children:[]}});

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

      setFrontPageData(responseBody)
      // setLoadingUser(false)
    }
    fetchFrontPage()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

  return (
    <div css={styling}>
      <ListingParser listing={frontPageData} />
    </div>
  );
}


export default FrontPage;
