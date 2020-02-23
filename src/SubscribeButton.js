/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useCookies } from 'react-cookie';


function SubscribeButton(props) {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();


  const styling = css`
    ${'' /* border: 1px solid pink; */}

    ${'' /* display: flex;
    justify-content: center;
    align-items: center; */}

    button {
      font-family: 'Odibee Sans', cursive;
      font-size: 18px;
    	${'' /* font-weight: 500; */}
      letter-spacing: 1px;

      ${'' /* margin-top: 20px; */}
      padding: 6px;
    	${'' /* text-transform: uppercase; */}
    	border: none;
    	cursor: pointer;
    	border-radius: 4px;
    	box-shadow: 0px 2px 10px rgba(50, 50, 50, 0.5);
    	transition: box-shadow 0.6s cubic-bezier(.29,0,.46,1);
    }

    button.subscribed {
      background: rgb(254, 93, 122);
      background: linear-gradient(to bottom left, rgb(254, 93, 122), rgb(254, 93, 122)));
    }

    button.not-subscribed {
      background: rgb(119, 171, 255);
      background: linear-gradient(to bottom left, rgb(119, 171, 255), rgb(40, 122, 255));
    }

    button:hover {
      box-shadow: 0px 2px 7px rgba(10, 10, 10, 0.5);
    }
  `;

  return (
    <div css={styling}>
      <button type="action" className={props.subscribed ? "action subscribed" : "action not-subscribed"}>{props.subscribed ? "Unsubscribe" : "Subscribe"}</button>
    </div>
  );
}

export default SubscribeButton;
