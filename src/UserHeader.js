/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './Loaders/PulseBubble.js';


function UserHeader(props) {
  const [ userData, setUserData ] = useState({});
  const [ loadingUser, setLoadingUser ] = useState(false);

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

    .karma {
      ${'' /* border: 1px solid blue; */}

      margin-top: -10px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .karma-container {
      ${'' /* border: 1px solid green; */}

      width: 330px;
      border-radius: 10px;
      background-color: rgb(248, 248, 248);
      box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);

      z-index: 1;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      opacity: 0%;
      animation: 0.8s fade-in 1s forwards;
    }

    .karma-box {
      ${'' /* border: 1px solid black; */}

      padding: 5px 20px;
      padding-top: 20px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .karma-box .count {
      ${'' /* border: 1px solid green; */}

      border-radius: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
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
    async function fetchUserData() {
      let responseBody = {};
      setLoadingUser(true);
      const response = await fetch(
        ("https://oauth.reddit.com/user/" + props.username + "/about?raw_json=1"),
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
      if (responseBody.error) {
        window.location.href = "/login";
      }

      setUserData(responseBody["data"])
      setLoadingUser(false)
    }
    fetchUserData()
  }, [cookies.accessToken, props.username, cookies.username, cookies.redditApp, cookies.redditVersion]);
  return (
    <div css={styling}>
      {loadingUser ? (
        <div className="bubble-container">
          <PulseBubble />
        </div>
      ) :
        <div>
          <div className="username-karma">
            <div className="title-container">
              <div className="title-box">
                <h1>{userData["name"]}</h1>
              </div>
            </div>
            <div className="karma">
              <div className="karma-container">
                <div className="karma-box">
                  <h3 className="descriptor">Post Karma</h3>
                  <div className="count">
                    <h3>{userData["link_karma"]}</h3>
                  </div>
                </div>
                <div className="karma-box">
                  <h3 className="descriptor">Comment Karma</h3>
                  <div className="count">
                    <h3>{userData["comment_karma"]}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}


export default UserHeader;
