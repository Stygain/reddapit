/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


function RedditComment(props) {
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

    width: 100%;
    height: 100%;
    margin: 0px;
    margin: 20px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: rgb(37, 37, 37);
      text-decoration: none;
      background: linear-gradient(to bottom, rgb(255, 152, 0) 0%, rgb(255, 152, 0) 100%);
    	background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
      transition: color 0.2s ease-in-out;
    }

    a:hover {
      color: rgb(0, 0, 0);
      background: linear-gradient(to bottom, rgb(204, 122, 0) 0%, rgb(204, 122, 0) 100%);
    	background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    .comment-box {
      ${'' /* border: 1px solid white; */}

      border-radius: 10px;
      padding: 5px;
      margin: 0px;
      width: 80%;
      ${'' /* height: 100px; */}
      background-color: rgb(242, 242, 242);
      box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.4);
      transition: box-shadow 0.5s ease;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .comment-box:hover {
      box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.5);
    }

    .comment-box h3 {
      ${'' /* border: 1px solid blue; */}

      margin: 0px;
    }

    .comment-box p {
      ${'' /* border: 1px solid green; */}

      margin: 0px;
    }

    .comment-box .title {
      ${'' /* border: 1px solid black; */}

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .comment-box .title h3 {
      margin: 0px 3px;

      text-align: left;
    }

    .comment-box .post-info {
      ${'' /* border: 1px solid white; */}

      flex-basis: 40%;
      flex-grow: 2;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .comment-box .title p {
      margin: 0px 3px;

      text-align: left;
    }

    .comment-box .body {
      ${'' /* border: 1px solid black; */}

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    .comment-box .score-box {
      ${'' /* border: 1px solid black; */}

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    .comment-box .score-box div {
      ${'' /* border: 1px solid black; */}

      padding: 0px;
      margin: 0;
      font-size: 30px;
      cursor: pointer;
    }

    .comment-box .score-box p {
      user-select: none;
      font-weight: 600;
    }

    .comment-box .score-box .upvote {
      color: rgb(235, 103, 29);
      transition: text-shadow 0.3s ease;
      user-select: none;
    }

    .comment-box .score-box .upvote.active {
      text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.77);
    }

    .comment-box .score-box .downvote {
      color: rgb(17, 121, 166);
      transition: text-shadow 0.3s ease;
      user-select: none;
    }

    .comment-box .score-box .downvote.active {
      text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.77);
    }

    .comment-box .body p {
      text-align: left;
    }

    .comment-box .body .content {
      flex-grow: 2;
    }

    .comment-box .actions {
      ${'' /* border: 1px solid black; */}

      align-self: flex-end;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }

    .comment-box .actions p {
      ${'' /* border: 1px solid black; */}

      margin: 0px 5px;
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
      // console.log(responseBody);
    }
    makeVotePost()
  }

  function upvote() {
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
      <div className="comment-box">
        {console.log(props.data)}
        <div className="title">
          <h3><a href={props.data.data.link_url}>{props.data.data.link_title}</a></h3>
          <div className="post-info">
            <p>by <a href={"/user/" + props.data.data.link_author}>{props.data.data.link_author}</a></p>
            <p>in <a href={"https://www.reddit.com/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        {/* <p>{props.data.data.author}</p> */}
        <div className="body">
          {/* TODO action this */}
          <div className="score-box">
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
          <p className="content">{props.data.data.body}</p>
          {/* <p>{props.data.data.edited}</p> */}
        </div>
        <div className="actions">
          {/* <p>Up: {props.data.data.ups}</p>
          <p>Down: {props.data.data.downs}</p> */}
          <p><a href={props.data.data.link_url}>Comments ({props.data.data.num_comments})</a></p>
          <p><a href={"https://www.reddit.com/" + props.data.data.permalink}>Context</a></p>
          {/* <p><a href={props.data.data.link_url}>Full Post</a></p> */}
        </div>
      </div>
    </div>
  );
}

export default RedditComment;
