/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

import PulseBubble from './Loaders/PulseBubble.js';

function MySubreddits(props) {

    const [mySubredditsData, setMySubredditsData] = useState({ data: { children: [] } });

    const [loadingUser, setLoadingUser] = useState(false);

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies();

    const styling = css`
    ${'' /* border: 1px solid blue; */}

    .bubble-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    h1, h3 {
      ${'' /* border: 1px solid green; */}

      margin: 0;
      padding: 0;
    }

    h1 {
      overflow: hidden;
      text-align: center;
      margin: 10px 0px;
    }

    .title-container {
      ${'' /* border 1px solid red; */}

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .title-box {
      ${'' /* border 1px solid red; */}

      z-index: 2;
      background: rgb(255, 255, 255);
      box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);

      border-radius: 10px;
      padding: 5px;
      width: 45%;

      opacity: 0%;

      animation: 0.8s fade-in 0.5s forwards;
    }

    .descriptor {
      color: rgb(158, 158, 158);
    }
    @keyframes fade-in {
      from {
        opacity: 0%;
      }
      to {
        opacity: 100%;
      }
    }
  `;

    useEffect(() => {
        async function fetchMineData() {
            let responseBody = {};
            setLoadingUser(true);
            const response = await fetch(
                ("https://oauth.reddit.com/subreddits/mine/" + "subscriber" + "?raw_json=1&limit=100"),
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

            setMySubredditsData(responseBody["data"]);
            setLoadingUser(false);
        }
        fetchMineData()
    }, [cookies.accessToken, props.username, cookies.username, cookies.redditApp, cookies.redditVersion]);

    var mineSubreddits;
    if(mySubredditsData.children !== undefined){
        mineSubreddits = mySubredditsData.children.map((child) =>
            <div key={child.data.display_name}>{child.data.display_name}</div>
        );
    }

    console.log(mySubredditsData);
    console.log(mySubredditsData.children);

    return (
        <div css={styling}>
          {loadingUser ? (
            <div className="bubble-container">
              <PulseBubble />
            </div>
          ) :
            <div>
                {mineSubreddits}
            </div>
          }
        </div>
      );

}

export default MySubreddits;


