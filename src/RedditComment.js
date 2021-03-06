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
            <p>in <a className="subreddit" href={"/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        <div className="body">
          <VoteContainer data={props.data} dir="vertical" />
          <p className="content">{props.data.data.body}</p>
        </div>
        <div className="actions">
          {props.data.data.link_id ?
          <p><a href={"/r/" + props.data.data.subreddit + "/" + props.data.data.link_id.substring(3)}>Comments ({props.data.data.num_comments})</a></p>
            :
            <p>undef</p>
          }
        </div>
      </div>
    </div>
  );
}

export default RedditComment;
