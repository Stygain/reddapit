/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import UserHeader from './UserHeader.js';
import Trophy from './Trophy.js';
import UserOverview from './UserOverview.js';


function UserPage(props) {
  const { userAccount } = useParams();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid red; */}

  `;
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
