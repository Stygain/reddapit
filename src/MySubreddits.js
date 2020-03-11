/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { clearTitle } from './redux/actions.js';

import PulseBubble from './Loaders/PulseBubble.js';

function MySubreddits(props) {
    const dispatch = useDispatch();

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
    a{
      color: white;
    }

    .subreddit-listing {
      display: inline-block;
      margin: 0;
      margin: 5px 5px 5px 5px;
      width: 170px;
      border-radius: 10px;
      height: 170px;
      box-shadow: 0px 5px 10px 1px rgba(0.1,0,0,0.3);
      transition: box-shadow 0.5s ease;
      justify-content: center;
      font-size: 20px;
      font-family: Odibee Sans, cursive;
      line-height: 150px;
      text-wrap: wrap;
      text-align: center;
    }
    .my-subreddits-title{
      height: 50px;
      background-color: #ff971c;
      line-height: 50px;
      color: white;
      vertical-align: middle;
      font-size: 26px;
      padding-left: 20px;
      font-family: Odibee Sans, cursive;
      margin-bottom: 20px;
    }

    .flex-container{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-left: 50px;
      margin-right: 40px;
      margin-bottom: 20px;
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
      color: black;
    }
    .orange{
      background-color: #ff971c;
    }
    .cyan{
      background-color: cyan;
      color: black;
    }
    .long-subreddit{
      font-size:18px;
    }
    .average-subreddit{
      font-size: 26px;
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

    useEffect(() => {
      dispatch(clearTitle());
    }, [dispatch]);


    const colorSet = ["red", "blue", "green", "yellow", "orange", "cyan"];


    function colorPicker(){
      var index = Math.floor(Math.random() * colorSet.length);
      return colorSet[index];
    }

    function fontSizeSet(display_name){
      if(display_name.length > 14){
        return "long-subreddit";
      } else{
        return "average-subreddit";
      }
    }

    var mineSubreddits;
    if(mySubredditsData.children !== undefined){
      mySubredditsData.children.sort((a, b) =>
        ((a.data.display_name.toLowerCase() > b.data.display_name.toLowerCase()) ? 1 : -1));
        mineSubreddits = mySubredditsData.children.map((child) =>
          (<Link to={child.data.url} key={child.data.display_name}>
          <div key={child.data.display_name}
          className={"subreddit-listing " + colorPicker() + " " + fontSizeSet(child.data.display_name) }>{child.data.display_name_prefixed}</div>
          </Link>
          ))
        }
    console.log(mySubredditsData.children);

    return (
        <div css={styling}>
          <div className="my-subreddits-title">My Subreddits</div>
          {loadingUser ? (
            <div className="bubble-container">
              <PulseBubble />
            </div>
          ) :
            <div className="flex-container">
                {mineSubreddits}
            </div>
          }
        </div>
      );

}

export default MySubreddits;
