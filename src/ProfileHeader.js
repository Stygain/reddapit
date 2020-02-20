/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './PulseBubble.js';


function ProfileHeader(props) {
  const [ profileData, setProfileData ] = useState({});
  const [ loadingProfile, setLoadingProfile ] = useState(false);
  const styling = css`
    border: 1px solid blue;

  `;
  useEffect(() => {
    async function fetchProfileData() {
      let responseBody = {};
      setLoadingProfile(true);
      const response = await fetch(
        `https://oauth.reddit.com/api/v1/me`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": ("bearer " + "23328459-WEHVw3IgR995vLqmcp9_uISNars"),
            "User-Agent": ("reddapit" + "/" + "0.1" + " by " + "seekvengeance")
          }
        }
      );
      responseBody = await response.json();
      console.log(responseBody);

      setProfileData(responseBody)
      setLoadingProfile(false)
    }
    fetchProfileData()
  }, []);
  return (
    <div css={styling}>
      {loadingProfile ? (
        <PulseBubble />
      ) :
        <div>
          <div className="username-karma">
            <h1>{profileData["name"]}</h1>
            <h3>{profileData["comment_karma"]} Comment Karma</h3>
            <h3>{profileData["link_karma"]} Link Karma</h3>
          </div>
        </div>
      }
    </div>
  );
}


export default ProfileHeader;
