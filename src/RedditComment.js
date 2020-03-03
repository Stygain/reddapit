/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import VoteContainer from './VoteContainer.js';


function RedditComment(props) {
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
      ${'' /* background: linear-gradient(to bottom, rgb(5, 135, 163) 0%, rgb(5, 135, 163) 100%); */}
      ${'' /* background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px; */}
      transition: color 0.2s ease-in-out;
    }

    a:hover {
      color: rgb(0, 0, 0);
      ${'' /* background: linear-gradient(to bottom, rgb(0, 209, 255) 0%, rgb(0, 209, 255) 100%); */}
    	${'' /* background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px; */}
    }

    a.title {
      background: linear-gradient(to bottom, rgb(5, 135, 163) 0%, rgb(5, 135, 163) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.title:hover {
      background: linear-gradient(to bottom, rgb(0, 209, 255) 0%, rgb(0, 209, 255) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.user {
      background: linear-gradient(to bottom, rgb(181, 101, 27) 0%, rgb(181, 101, 27) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.user:hover {
      background: linear-gradient(to bottom, rgb(255, 124, 4) 0%, rgb(255, 124, 4) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.subreddit {
      background: linear-gradient(to bottom, rgb(75, 124, 69) 0%, rgb(75, 124, 69) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.subreddit:hover {
      background: linear-gradient(to bottom, rgb(72, 190, 58) 0%, rgb(72, 190, 58) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.comments {
      background: linear-gradient(to bottom, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%);
      background-position: 0 100%;
    	background-repeat: repeat-x;
    	background-size: 2px 2px;
    }

    a.context {
      background: linear-gradient(to bottom, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%);
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
      align-items: flex-end;
      flex-direction: row;
      justify-content: flex-start;
    }

    .comment-box .actions p {
      ${'' /* border: 1px solid black; */}

      margin: 0px 5px;
    }
  `;

  return (
    <div css={styling}>
      <div className="comment-box">
        {/* {console.log(props.data)} */}
        <div className="title">
          <h3><a className="title" href={props.data.data.link_url}>{props.data.data.link_title}</a></h3>
          <div className="post-info">
            <p>by <a className="user" href={"/user/" + props.data.data.link_author}>{props.data.data.link_author}</a></p>
            <p>in <a className="subreddit" href={"https://www.reddit.com/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        <div className="body">
          <VoteContainer data={props.data} dir="vertical" />
          <p className="content">{props.data.data.body}</p>
        </div>
        <div className="actions">
          <p><a className="comments" href={props.data.data.link_url}>Comments ({props.data.data.num_comments})</a></p>
          <p><a className="context" href={"https://www.reddit.com/" + props.data.data.permalink}>Context</a></p>
        </div>
      </div>
    </div>
  );
}

export default RedditComment;
