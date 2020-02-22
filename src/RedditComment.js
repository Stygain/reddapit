/** @jsx jsx */
import { jsx, css } from '@emotion/core';


function RedditComment(props) {
  const styling = css`
    border: 1px solid pink;

    width: 100%;
    height: 100%;
    margin: 0px;
    margin: 20px 0px;
    background-color: rgb(170, 170, 170);

    display: flex;
    justify-content: center;
    align-items: center;

    .comment-box {
      border: 1px solid red;

      margin: 0px;
      width: 80%;
      ${'' /* height: 100px; */}

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .comment-box h3 {
      border: 1px solid blue;

      margin: 0px;
    }

    .comment-box p {
      border: 1px solid green;

      margin: 0px;
    }

    .comment-box .title {
      border: 1px solid black;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .comment-box .title h3 {
      margin: 0px 3px;

      text-align: left;
    }

    .comment-box .post-info {
      border: 1px solid white;

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
      border: 1px solid black;
    }

    .comment-box .body p {
      text-align: left;
    }

    .comment-box .actions {
      border: 1px solid black;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }

  `;
  return (
    <div css={styling}>
      <div className="comment-box">
        {console.log(props.data)}
        <div className="title">
          <h3><a href={props.data.data.link_url}>{props.data.data.link_title}</a></h3>
          <div className="post-info">
            <p>by <a href={"https://www.reddit.com/u/" + props.data.data.link_author}>{props.data.data.link_author}</a></p>
            <p>in <a href={"https://www.reddit.com/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        {/* <p>{props.data.data.author}</p> */}
        <div className="body">
          <p>{props.data.data.body}</p>
          {/* <p>{props.data.data.edited}</p> */}
        </div>
        <div className="actions">
          {/* TODO action this */}
          <p>{props.data.data.score}</p>
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
