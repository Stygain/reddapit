/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useDispatch } from 'react-redux';
import { setTitle, setPage } from './redux/actions.js';

import UserHeader from './UserHeader.js';
import Trophy from './Trophy.js';
import UserOverview from './UserOverview.js';


function UserPage(props) {
  const { userAccount } = useParams();

  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid red; */}

  `;

  useEffect(() => {
    dispatch(setTitle("/u/" + userAccount));
    dispatch(setPage("user"));
  }, [dispatch, userAccount]);

  return (
    <div css={styling}>
      {
        userAccount === cookies.username
        ?
        <div>
          <UserHeader username={userAccount} />
          <Trophy />
        </div>
        :
        <UserHeader username={userAccount} />
      }

      <UserOverview username={userAccount} />
    </div>
  );
}


export default UserPage;
