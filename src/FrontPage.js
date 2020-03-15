/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useDispatch } from 'react-redux';
import { clearTitle, setPage } from './redux/actions.js';

import ListingParser from './ListingParser.js';

import PulseBubble from './Loaders/PulseBubble.js';


function FrontPage(props) {
  const [ frontPageData, setFrontPageData ] = useState({data:{children:[]}});
  const [ loadingFrontPage, setLoadingFrontPage ] = useState({data:{children:[]}});

  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid red; */}

    .centerer {
      ${'' /* border: 1px solid green; */}

      width: 100%;

      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `;

  useEffect(() => {
    async function fetchFrontPage() {
      let responseBody = {};
      setLoadingFrontPage(true);
      const response = await fetch(
        ("https://oauth.reddit.com/?raw_json=1"),
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

      setFrontPageData(responseBody)
      setLoadingFrontPage(false)
    }
    fetchFrontPage()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

  useEffect(() => {
    dispatch(clearTitle());
    dispatch(setPage("frontpage", ""));
  }, [dispatch]);

  return (
    <div css={styling}>
      {loadingFrontPage ?
        <div className="centerer">
          <PulseBubble />
        </div>
      :
        <ListingParser listing={frontPageData} />
      }
    </div>
  );
}


export default FrontPage;
