/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import VoteContainer from './VoteContainer.js';


function RedditLink(props) {
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

    .post-box {
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

    .post-box:hover {
      box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.5);
    }

    .post-box h3 {
      ${'' /* border: 1px solid blue; */}

      margin: 0px;
    }

    .post-box p {
      ${'' /* border: 1px solid green; */}

      margin: 0px;
    }

    .post-box .title {
      ${'' /* border: 1px solid black; */}

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .post-box .title h3 {
      margin: 0px 3px;

      text-align: left;
    }

    .post-box .post-info {
      ${'' /* border: 1px solid white; */}

      flex-basis: 40%;
      flex-grow: 2;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .post-box .title p {
      margin: 0px 3px;

      text-align: left;
    }

    .post-box .body {
      ${'' /* border: 1px solid black; */}

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    .post-box .body p {
      text-align: left;
    }

    .body img {
      max-width: 97%;
      max-height: 600px;
      padding: 10px;
    }

    .post-box .body .text-content {
      flex-grow: 2;
    }

    .post-box .actions {
      ${'' /* border: 1px solid blue; */}

      width: 100%;

      align-self: flex-end;

      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
    }

    .actions .stretch {
      flex-grow: 10;
    }

    .post-box .actions p {
      ${'' /* border: 1px solid black; */}

      margin: 0px 5px;
    }
  `;

// archived
// visited
// is_self
// edited

// media_embed
// secure_media_embed
// post_hint="rich:video"

// image post:
// post_hint="link"
// selftext=""
// url
// thumbnail="link to thumbnail"

// selftext post:
// post_hint not present
// selftext="actual stuff"
// thumbnail="self"
  return (
    <div css={styling}>
      <div className="post-box">
        {console.log(props.data)}
        <div className="title">
          <h3><a className="title" href={props.data.data.url}>{props.data.data.title}</a></h3>
          <div className="post-info">
            <p>by <a className="user" href={"/user/" + props.data.data.author}>{props.data.data.author}</a></p>
            <p>in <a className="subreddit" href={"https://www.reddit.com/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        {
          props.data.data.selftext === ""
          ?
            props.data.data.post_hint === "link"
            ?
              <div className="body">
                <img src={props.data.data.thumbnail} />
              </div>
            :
              props.data.data.post_hint === "image"
              ?
                <div className="body">
                  <img src={props.data.data.url} />
                </div>
              :
                props.data.data.post_hint === "rich:video"
                ?
                  <div className="body">
                    <div
                      dangerouslySetInnerHTML={{__html: props.data.data.media_embed.content}}>
                    </div>
                  </div>
                :
                  <div></div>
          :
          <div className="body">
            <p className="text-content">{props.data.data.selftext}</p>
          </div>
        }

        <div className="actions">
          <VoteContainer data={props.data} dir="horizontal" />
          <div className="stretch"></div>
          <p><a className="comments" href={props.data.data.url}>Comments ({props.data.data.num_comments})</a></p>
          <p><a className="context" href={"https://www.reddit.com/" + props.data.data.permalink}>Context</a></p>
        </div>
      </div>
    </div>
  );
}

export default RedditLink;
