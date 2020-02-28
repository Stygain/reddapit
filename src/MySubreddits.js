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
      height: 150px;
      box-shadow: 0px 5px 10px 1px rgba(0.1,0,0,0.3);
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
      margin-left: 100px;
    }
    .descriptor {
      color: rgb(158, 158, 158);
    }

    .red{
      background-color: #ff3213;
      color: white;
    }
    .blue{
      background-color: #0341ae;
      color: white;
    }
    .green{
      background-color: #72cb3b;
    }
    .yellow{
      background-color: #ffd500;
    }
    .orange{
      background-color: #ff971c;
    }

    @keyframes fall {
      from{margin-bottom: 300px;}
      to{margin-bottom: 10px;}
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


    const colorSet = ["red", "blue", "green", "yellow", "orange"];


    function colorPicker(){
      var index = Math.floor(Math.random() * colorSet.length);
      console.log(index);
      return colorSet[index];
    }

    var mineSubreddits;
    if(mySubredditsData.children !== undefined){
        mineSubreddits = mySubredditsData.children.map((child) =>
          (
          <div key={child.data.display_name} className={"subreddit-listing " + colorPicker()}>{child.data.display_name}</div>
          ))
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


