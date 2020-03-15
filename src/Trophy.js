/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './Loaders/PulseBubble.js';


function Trophy(props) {
  const [ trophyData, setTrophyData ] = useState({data:{trophies:[]}});
  const [ loadingTrophies, setLoadingTrophies ] = useState(false);

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid green; */}

    margin-top: -10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      margin: 0;
      margin-top: 10px;
    }

    .trophy {
      ${'' /* border: 1px solid black; */}

      padding: 5px;
      text-align: center;
      border-radius: 10px;
      background-color: rgb(241, 241, 241);
      box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);

      opacity: 0%;
      animation: 0.8s fade-in 1.5s forwards;
    }

    .trophy-icon-container {
      ${'' /* border: 1px solid red; */}

      max-width: 200px;

      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .trophy-icon {
      padding: 5px;
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
    async function fetchTrophyData() {
      let responseBody = {};
      setLoadingTrophies(true);
      const response = await fetch(
        `https://oauth.reddit.com/api/v1/me/trophies?raw_json=1`,
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
        if (responseBody.error == 401) {
          window.location.href = "/login";
        } else if (responseBody.error == 404) {
          window.location.href = "/404";
        }
      }

      setTrophyData(responseBody)
      setLoadingTrophies(false)
    }
    fetchTrophyData()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);
  return (
    <div css={styling}>
      {loadingTrophies ? (
        <PulseBubble />
      ) :
        <div className="trophy">
          <h2>Trophies</h2>
          <div className="trophy-icon-container">
            {
              trophyData["data"]["trophies"].map((item) => {
                // console.log(item)
                return(<img className="trophy-icon" src={item["data"]["icon_70"]} key={item["data"]["icon_70"]} alt={item["data"]["name"]} />)
              })
            }
          </div>
        </div>
      }
    </div>
  );
}


export default Trophy;
