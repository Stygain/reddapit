/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import VoteContainer from './VoteContainer.js';


function RedditComment(props) {
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
          <h3><a href={props.data.data.link_url}>{props.data.data.link_title}</a></h3>
          <div className="post-info">
            <p>by <a href={"/user/" + props.data.data.link_author}>{props.data.data.link_author}</a></p>
            <p>in <a href={"https://www.reddit.com/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        {/* <p>{props.data.data.author}</p> */}
        <div className="body">
          {/* TODO action this */}
          <VoteContainer data={props.data} dir="vertical" />
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
