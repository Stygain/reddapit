/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


function VoteContainer(props) {
  const [ score, setScore ] = useState(props.data.data.score);
  var origScore = props.data.data.score;
  if (props.data.data.likes) {
    origScore = props.data.data.score - 1;
  } else {
    origScore = props.data.data.score;
  }

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();


  const styling = css`
    ${'' /* border: 1px solid pink; */}

    display: flex;
    justify-content: center;
    align-items: center;

    .score-box {
      ${'' /* border: 1px solid black; */}

      ${'' /* background-color: rgb(255, 255, 255); */}

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .score-box.vertical {
      flex-direction: column;
    }

    .score-box.horizontal {
      flex-direction: row;
    }

    .score-box div {
      ${'' /* border: 1px solid black; */}

      padding: 0px;
      margin: 0;
      font-size: 30px;
      cursor: pointer;
    }

    .score-box p {
      user-select: none;
      font-weight: 600;
    }

    .score-box .upvote {
      color: rgb(156, 122, 103);
      transition: color 0.3s ease,
                  text-shadow 0.3s ease;
      user-select: none;
    }

    .score-box .upvote.active {
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.77);
      color: rgb(235, 103, 29);
    }

    .score-box .downvote {
      color: rgb(110, 138, 149);
      transition: color 0.3s ease,
                  text-shadow 0.3s ease;
      user-select: none;
    }

    .score-box .downvote.active {
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.77);
      color: rgb(17, 121, 166);
    }
  `;

  function vote(direction) {
    async function makeVotePost() {
      let responseBody = {};
      var payloadStr = ("?dir=" + direction + "&id=" + props.data.data.name)
      const response = await fetch(
        `https://oauth.reddit.com/api/vote${payloadStr}`,
        {
          method: "POST",
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
        window.location.href = "/login";
      }
    }
    makeVotePost()
  }

  function upvote() {
    if (props.data.data.archived) {
      // TODO turn this into a modal
      alert('archived');
      return;
    }
    var direction;
    if (score === origScore) {
      setScore(score + 1);
      direction = 1;
    } else if (score < origScore) {
      setScore(score + 2);
      direction = 1;
    } else {
      setScore(origScore);
      direction = 0;
    }

    // Make POST
    vote(direction);
  }

  function downvote() {
    if (props.data.data.archived) {
      // TODO turn this into a modal
      alert('archived');
    }
    var direction;
    if (score === origScore) {
      setScore(score - 1);
      direction = -1;
    } else if (score > origScore) {
      setScore(score - 2);
      direction = -1;
    } else {
      setScore(origScore);
      direction = 0;
    }

    // Make POST
    vote(direction);
  }

  return (
    <div css={styling}>
      <div className={"score-box " + props.dir}>
        <div
          className={score > origScore ? "upvote active" : "upvote"}
          onClick={() => upvote()}>
          ⬆
        </div>
        <p>{score}</p>
        <div
          className={score < origScore ? "downvote active" : "downvote"}
          onClick={() => downvote()}>
          ⬇
        </div>
      </div>
    </div>
  );
}

export default VoteContainer;
