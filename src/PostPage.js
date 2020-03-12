/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import React from 'react';
import PulseBubble from './Loaders/PulseBubble';

import { useDispatch } from 'react-redux';
import { clearTitle } from './redux/actions.js';

import CommentVoteContainer from './CommentVoteContainer';

import ListingParser from './ListingParser.js';
import SubredditSidebar from './SubredditSidebar.js';


function CommentParser(props) {
  const styling = css`
    ${'' /* border: 1px solid red; */}

    .comment-container.depth-1 {
      border-left: 2px solid rgb(233, 233, 233);
    }

    .comment-container.depth-2 {
      border-left: 2px solid rgb(209, 209, 209);
    }

    .comment-container.depth-3 {
      border-left: 2px solid rgb(181, 181, 181);
    }

    .comment-container.depth-4 {
      border-left: 2px solid rgb(162, 162, 162);
    }

    .comment-container.depth-5 {
      border-left: 2px solid rgb(136, 136, 136);
    }

    .depth-0 {
      margin-left: 0px;
    }

    .depth-1 {
      margin-left: 15px;
    }

    .depth-2 {
      margin-left: 30px;
    }

    .depth-3 {
      margin-left: 45px;
    }

    .depth-4 {
      margin-left: 60px;
    }

    .depth-5 {
      margin-left: 75px;
    }
  `;

  function parser() {
    var comments = []
    try {
      console.log("INDEX:", props.index)
      console.log("COMMENT PARSER GIVEN: ", props.data);
      if (props.data.data.children) {
        comments = props.data.data.children.map((comment) => {
          // console.log("CHILD:", comment)

          var replies = [];
          if (comment.data.replies) {
            // console.log("REPLIES EXIST")
            replies = comment.data.replies.data.children.map((reply) => {
              // return (
              //   <div className={"comment-box depth-" + (props.index + 1)} key={reply.data.id}>
              //     <div>{reply.data.body}</div>
              //     <div className="reply-info">
              //       <CommentVoteContainer data={reply} />
              //       <Link to={"/user/" + reply.data.author} className="reply-author">{reply.data.author}</Link>
              //     </div>
              //   </div>
              // )
              return (
                <CommentParser data={reply} index={props.index + 1} />
              );
            })
          }

          return (
            <div className={"comment-container depth-" + props.index}>
              <div className={"comment-box depth-" + props.index} key={comment.data.id}>
                <div>{comment.data.body}</div>
                <div className="comment-info">
                  <CommentVoteContainer data={comment} />
                  <Link to={"/user/" + comment.data.author} className="comment-author">{comment.data.author}</Link>
                </div>
              </div>
              {replies}
            </div>
          );
        });
      } else {
        console.log("ELSE:", props.data);
        var replies = [];
        if (props.data.data.replies) {
          replies = props.data.data.replies.data.children.map((reply) => {
            return (
              <CommentParser data={reply} index={props.index + 1} />
            );
          })
        }

        return (
          <div className={"comment-container depth-" + props.index}>
            <div className={"comment-box depth-" + props.index} key={props.data.data.id}>
              <div>{props.data.data.body}</div>
              <div className="comment-info">
                <CommentVoteContainer data={props.data} />
                <Link to={"/user/" + props.data.data.author} className="comment-author">{props.data.data.author}</Link>
              </div>
            </div>
            {replies}
          </div>
        );
      }
      return comments;
    } catch {
      return null;
    }
  }

  var replyElements = parser();

  return (
    <div css={styling}>
      {replyElements}
    </div>
  );
}


function PostPage(props) {
    const dispatch = useDispatch();

    const { subreddit, post } = useParams();

    const [loadingPost, setLoadingPost] = useState(true);
    const [postPageData, setPostPageData] = useState({ data: { children: [] } });

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies();
    const styling = css`
      position: relative;

    .comment-box{
        position: relative;
        padding: 15px;
        height: auto;
        min-width: 250px;
        margin-bottom: 10px;
        margin-top: 10px;
        border-radius: 10px;
        margin-left: 20px;
        background-color: rgb(242,242,242);
        box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.4);
        -webkit-transition: box-shadow 0.5s ease;
        transition: box-shadow 0.5s ease;
    }
    .post-container{
      ${'' /* border: 1px solid red; */}

        display: block;
        height: auto;
        line-height: 20px;
        padding: 20px;
        word-wrap: break-word
        border-radius: 10px;
        width: 80%;
        background-color: rgb(242,242,242);
        box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.4);
        word-wrap: break-word;
        margin: auto;
        margin-bottom: 30px;
    }
    .post-title{
        font-size: 22px;
        margin-bottom: 10px;
    }

    .image-type img {
      ${'' /* border: 1px solid black; */}

      max-width: 100%;
    }

    .post-data{
      ${'' /* border: 1px solid green; */}

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        margin: auto;
    }
    .comments-area{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        width: 80%;
        margin: auto;
    }

    .bubble-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      a{
        margin-top: 10;
        color: rgb(37,37,37);
        -webkit-text-decoration: none;
        text-decoration: none;
        background: linear-gradient(to bottom,rgb(255,152,0) 0%,rgb(255,152,0) 100%);
        background-position: 0 100%;
        background-repeat: repeat-x;
        background-size: 2px 2px;
        -webkit-transition: color 0.2s ease-in-out;
        transition: color 0.2s ease-in-out;
      }
      a:hover{

      }
      .comment-info{
        text-align: right;
        margin-top: 10px;
      }
      .score-box{
        text-align: left;
      }
  `;

    useEffect(() => {
        async function fetchSubredditPage() {
            let responseBody = {};
            setLoadingPost(true);
            const response = await fetch(
                ("https://oauth.reddit.com/r/" + subreddit + "/comments/" + post + "?raw_json=1&?sort=confidence"),
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": ("bearer " + cookies.accessToken),
                        "User-Agent": (cookies.redditApp + "/" + cookies.redditVersion + " by " + cookies.username)
                    }
                }
            );
            responseBody = await response.json();
            console.log("POST DATA:", responseBody);

            setPostPageData(responseBody)
            setLoadingPost(false)
        }
        fetchSubredditPage()
    }, [subreddit, post, cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

    useEffect(() => {
      dispatch(clearTitle());
    }, [dispatch]);

    function postParser() {
        var postContents = null;
        try {
            var postObject = postPageData[0].data.children[0].data;
            var selftext = postObject.selftext;
            var title = postObject.title;

            if( postObject.selftext === ""){
                if(postObject.post_hint === "link"){
                    postContents =
                        <div className="link-type">
                           <a href={postObject.url}><img src={postObject.thumbnail} /></a>
                        </div>;
                }
                else if(postObject.post_hint === "image"){
                    postContents =
                        <div className="image-type">
                            <img src={postObject.url}/>
                        </div>;
                }
            }
            else{
                postContents = selftext;
            }
            return (
                <>
                    <div className="post-title">
                        {title}
                    </div>
                    <div>
                        {postContents}
                    </div>
                </>
            );
        }
        catch (e) {
            console.log("postParser error" + e);
            return null;
        }
    }

    var postText = postParser();
    // var commentElements = simpleCommentParser();

    var post_author = null;

    try {
        post_author = postPageData[0].data.children[0].data.author;
    }
    catch (e) {
        console.log(e);
    }

    return (
        <div css={styling}>
            {loadingPost ? (
                <div className="bubble-container">
                    <PulseBubble />
                </div>
            ) :
                <div>
                    <div className="post-container">
                        {postText}
                        <div className="post-data">
                            <Link to={"/user/" + post_author} className="post-author">{post_author}</Link>
                            <Link to={"/r/" + postPageData[0].data.children[0].data.subreddit}>{"r/" + postPageData[0].data.children[0].data.subreddit}</Link>

                        </div>

                    </div>
                    <div></div>
                    <div className="comments-area"><CommentParser data={postPageData[1]} index={0} /></div>
                    <div className="subreddit-stretch"></div>
                </div>
                }
        </div>
    );
}

export default PostPage;
