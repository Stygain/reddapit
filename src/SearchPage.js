/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useDispatch } from 'react-redux';
import { clearTitle, setPage } from './redux/actions.js';

import ListingParser from './ListingParser.js';

import PulseBubble from './Loaders/PulseBubble.js';


function SearchPage(props) {
  const { query } = useParams();
  // console.log("QUERY: " + query);

  const [ searchPageData, setSearchPageData ] = useState({data:{children:[]}});
  const [ loadingSearchPage, setLoadingSearchPage ] = useState({data:{children:[]}});

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
    async function fetchSearchContent() {
      let responseBody = {};
      setLoadingSearchPage(true);
      var payloadStr = "/search?q=" + query;
      console.log("PAYLOAD STR", payloadStr);
      const response = await fetch(
        `https://oauth.reddit.com${payloadStr}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": ("bearer " + cookies.accessToken),
            "User-Agent": (cookies.redditApp + "/" + cookies.redditVersion + " by " + cookies.username)
          }
        }
      );
      responseBody = await response.json();
      console.log(responseBody);

      if (responseBody.error) {
        if (responseBody.error === 401) {
          window.location.href = "/login";
        } else if (responseBody.error === 404) {
          window.location.href = "/404";
        }
      }

      setSearchPageData(responseBody)
      setLoadingSearchPage(false)
    }
    fetchSearchContent()
  }, [query, cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

  useEffect(() => {
    dispatch(clearTitle());
    dispatch(setPage("search", ""));
  }, [dispatch]);

  return (
    <div css={styling}>
      {loadingSearchPage ?
        <div className="centerer">
          <PulseBubble />
        </div>
      :
        <ListingParser listing={searchPageData} />
      }
    </div>
  );
}


export default SearchPage;
