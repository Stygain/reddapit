/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import ListingParser from './ListingParser.js';
import SubredditSidebar from './SubredditSidebar.js';


function SubredditPage(props) {
  const { subreddit } = useParams();

  const [ open, setOpen ] = useState(false);
  const [ subredditPageData, setSubredditPageData ] = useState({data:{children:[]}});

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid gray; */}

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;

    .listing {
      ${'' /* border: 2px solid red; */}

      ${open
        ?
        "border-right: 1px solid rgb(180, 180, 180); \
        transition: border 0.8s ease-in-out 0.2s;"
        :
        "border-right: 1px solid rgba(180, 180, 180, 0); \
        transition: border 0.6s ease-in-out;"
      }

      ${'' /* .sidebar-container {
        border: 5px solid red;

        width: 100%;
        height: 100%;

        background-color: rgb(189, 189, 189);
      } */}
    }
  `;

  useEffect(() => {
    async function fetchSubredditPage() {
      let responseBody = {};
      // setLoadingUser(true);
      const response = await fetch(
        ("https://oauth.reddit.com/r/" + subreddit + "?raw_json=1&limit=2"),
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

      setSubredditPageData(responseBody)
      // setLoadingUser(false)
    }
    fetchSubredditPage()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

  return (
    <div css={styling}>
      <ListingParser listing={subredditPageData} />
      <div className="sidebar-container">
        <SubredditSidebar open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}


export default SubredditPage;