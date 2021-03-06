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

    .post-box .title-container {
      ${'' /* border: 1px solid red; */}

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .post-box .title-container h3 {
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

    .post-box .title-container p {
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
    }row

    .post-box .actions p {
      ${'' /* border: 1px solid black; */}

      margin: 0px 5px;
    }


    ${'' /* @media (max-width: 900px) {
      .post-box .title-container {
        border: 1px solid green;

        flex-direction: column;
      }
    } */}
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
        <div className="title-container">
          <h3><a className="title" href={props.data.data.is_self ? "/" + props.data.data.subreddit_name_prefixed + "/" + props.data.data.id : props.data.data.url}>{props.data.data.title}</a></h3>
          <div className="post-info">
            <p>by <a className="user" href={"/user/" + props.data.data.author}>{props.data.data.author}</a></p>
            <p>in <a className="subreddit" href={"/r/" + props.data.data.subreddit}>{props.data.data.subreddit}</a></p>
          </div>
        </div>
        {
          props.data.data.selftext === ""
          ?
            props.data.data.post_hint === "link"
            ?
              <div className="body">
                <img src={props.data.data.thumbnail} alt={props.data.data.title} />
              </div>
            :
              props.data.data.post_hint === "image"
              ?
                <div className="body">
                  <img src={props.data.data.url} alt={props.data.data.title} />
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
          <p><a href={"/r/" + props.data.data.subreddit + "/" + props.data.data.id}>Comments ({props.data.data.num_comments})</a></p>
        </div>
      </div>
    </div>
  );
}

export default RedditLink;
