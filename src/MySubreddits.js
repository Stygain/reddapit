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

    .subreddit-listing {
      display: inline-block;
      margin: 0;
      margin: 5px 5px 5px 5px;
      width: 150px;
      border-radius: 10px;
      padding: 5px;
      height: 150px;
      background-color: rgb(242, 242, 242);
      box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.4);
      transition: box-shadow 0.5s ease;
      justify-content: center;
      font-size: 22px;
      line-height: 150px;
      text-align: center;
    }

    .flex-container{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
    }
    .descriptor {
      color: rgb(158, 158, 158);
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
            <div key={child.data.display_name} className="subreddit-listing">{child.data.display_name}</div>
        );
    }

    console.log(mySubredditsData);
    console.log(mySubredditsData.children);

    return (
        <div css={styling} className="flex-container">
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


