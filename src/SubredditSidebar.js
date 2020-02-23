/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import HamburgerButton from './HamburgerButton.js';
import SubscribeButton from './SubscribeButton.js';
import ListingParser from './ListingParser.js';


function SubredditSidebar(props) {
  const { subreddit } = useParams();

  const [ open, setOpen ] = useState(true);
  const [ subredditSidebarData, setSubredditSidebarData ] = useState({data:{children:[]}});

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    border: 1px solid red;

    ${'' /* font changing? */}

    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .sidebar-container {
      ${'' /* border: 1px solid green; */}

      width: 0px;
      opacity: 0%;
      overflow-x: hidden;

      transition: opacity 0.4s cubic-bezier(.65,0,.71,1),
                  width 0.5s cubic-bezier(.42,.42,.46,1) 0.3s;
    }

    .sidebar-container.open {
      width: 250px;
      opacity: 100%;

      transition: opacity 0.4s cubic-bezier(.65,0,.71,1) 0.3s,
                  width 0.5s cubic-bezier(.42,.42,.46,1);
    }

    .hamburger-container {
      ${'' /* border: 1px solid orange; */}

      width: 51px;
      align-self: flex-start;
    }

    .title-subscribe {
      border: 1px solid green;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
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
        <div className="title-subscribe">
          <h2>{subredditSidebarData["data"]["display_name"]}</h2>
          {console.log(subredditSidebarData["data"]["user_is_subscriber"])}
          <SubscribeButton subscribed={subredditSidebarData["data"]["user_is_subscriber"]} />
        </div>
        <h4>{subredditSidebarData["data"]["title"]}</h4>
        <p>{subredditSidebarData["data"]["subscribers"]} subscribers</p>
        <p>{subredditSidebarData["data"]["active_user_count"]} subscribers present</p>
        {/* <p>{subredditSidebarData["data"]["description"]}</p> */}
        <p>{subredditSidebarData["data"]["public_description"]}</p>
      </div>
    </div>
  );
}


export default SubredditSidebar;
