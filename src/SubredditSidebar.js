/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import HamburgerButton from './HamburgerButton.js';
import ListingParser from './ListingParser.js';


function SubredditSidebar(props) {
  const { subreddit } = useParams();

  const [ open, setOpen ] = useState(true);
  const [ subredditSidebarData, setSubredditSidebarData ] = useState({data:{children:[]}});

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid red; */}

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .sidebar-container {
      ${'' /* border: 1px solid green; */}

      width: 0px;
      overflow-x: hidden;

      transition: width 0.5s ease;
    }

    .sidebar-container.open {
      width: 200px;
    }

    .hamburger-container {
      ${'' /* border: 1px solid orange; */}

      width: 51px;
      align-self: flex-start;
    }
  `;

  useEffect(() => {
    async function fetchSubredditSidebar() {
      let responseBody = {};
      // setLoadingUser(true);
      const response = await fetch(
        ("https://oauth.reddit.com/r/" + subreddit + "/about?raw_json=1"),
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
      console.log("SUBREDDIT SIDEBAR ABOUT")
      console.log(responseBody);

      setSubredditSidebarData(responseBody)
      // setLoadingUser(false)
    }
    fetchSubredditSidebar()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

// display_name
// display_name_prefixed
// header_img
// title
// active_user_count
// subscribers
// description
// public_description
// banner_background_image
// created
// user_is_subscriber

  return (
    <div css={styling}>
      <div className="hamburger-container">
        <HamburgerButton action={open} setAction={setOpen} dir="right" />
      </div>
      <div className={open ? "sidebar-container open" : "sidebar-container"}>
        <h2>{subredditSidebarData["data"]["display_name"]}</h2>
      </div>
    </div>
  );
}


export default SubredditSidebar;
