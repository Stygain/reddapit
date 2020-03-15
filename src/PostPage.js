/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
//eslint-disable-next-line
import React from 'react';
import PulseBubble from './Loaders/PulseBubble';

import { useDispatch, useSelector } from 'react-redux';
import { clearTitle, setModalShow, setParentComment, setPage, setArchiveModalShow } from './redux/actions.js';
import { getModalShow, getParentComment, getArchiveModalShow } from './redux/selectors.js';

import CommentVoteContainer from './CommentVoteContainer';
import CircleRotate from './Loaders/CircleRotate.js';

function CommentModal(props) {
  const dispatch = useDispatch();

  const modalShow = useSelector(getModalShow);
  const parentComment = useSelector(getParentComment);

  const [ submitLoading, setSubmitLoading ] = useState(false);
  const [ message, setMessage ] = useState("");

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 4px solid red; */}

    position: fixed;
    z-index: 5;
    opacity: 0%;
    text-align: center;
    margin: 0;

    top: -100%;
    left: 0%;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    transition: 0.8s ease-in-out;

    &.open {
      opacity: 100%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .background {
      ${'' /* border: 1px solid blue; */}

      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;

      background-color: rgba(171, 171, 171, 0.52);

      cursor: pointer;

      transition: 0.8s ease-in-out;
    }

    .menu {
      ${'' /* border: 1px solid red; */}

      min-width: 35%;
      max-height: 0;
      margin-bottom: 200%;
      border-radius: 10px;
      padding: 0px 10px;

      box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.49);

      background-color: rgb(255, 255, 255);
      z-index: 2;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      overflow: hidden;

      transition: 0.8s ease-in-out;
    }

    .menu.open {
      margin-bottom: 0;
      min-height: 30%;
      max-height: 50%;
    }

    .menu h3 {
      @import url('https://fonts.googleapis.com/css?family=Odibee+Sans&display=swap');
      font-family: 'Odibee Sans', cursive;
      font-weight: 500;
      margin-top: 20px;
      font-size: 32px;
    }

    .comment-form {
      display: flex;
      flex-direction: column;
      ${'' /* justify-content: center; */}
      align-items: center;
    }

    .comment-form textarea {
      ${'' /* width: 100%; */}
      min-width: 250px;
      min-height: 60px;
      margin-top: 15px;
    }

    .loader-wrapper {
      margin-top: 20px;
      padding: 6px;
    	border: none;
    	border-radius: 4px;
      width: 83px;
      height: 39px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

    	background: rgb(119, 171, 255);
    	background: linear-gradient(to bottom left, rgb(119, 171, 255), rgb(40, 122, 255));
    	box-shadow: 0px 2px 20px rgba(50, 50, 50, 0.5);
    }

    button {
      font-family: 'Odibee Sans', cursive;
      font-size: 22px;
    	font-weight: 500;
      letter-spacing: 1px;

      margin-top: 20px;
      margin-bottom: 10px;
      padding: 6px;
    	text-transform: uppercase;
    	border: none;
    	cursor: pointer;
    	border-radius: 4px;
    	background: rgb(119, 171, 255);
    	background: linear-gradient(to bottom left, rgb(119, 171, 255), rgb(40, 122, 255));
    	box-shadow: 0px 2px 20px rgba(50, 50, 50, 0.5);
    	transition: 0.3s ease-in-out all;
    }

    button:hover {
      box-shadow: 0px 2px 15px rgba(10, 10, 10, 0.5);
    }
  `;

  function handleSubmit(event) {
    event.preventDefault();
    // Make POST request for comment
    if (message !== "") {
      async function makeCommentPost() {
        let responseBody = {};
        setSubmitLoading(true);
        var payloadStr = ("?parent=" + parentComment + "&text=" + message)
        const response = await fetch(
          `https://oauth.reddit.com/api/comment${payloadStr}`,
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
        if (responseBody.success) {
          console.log("RELOAD")
          await new Promise(r => setTimeout(r, 1200));
          setSubmitLoading(false);
          await new Promise(r => setTimeout(r, 100));
          document.location.reload();
        }
      }
      makeCommentPost()
    }
  }

  function handleInputChange(event, setter) {
    console.log("Input change: " + event.target.value)
    setter(event.target.value);
  }

  return (
    <div css={styling} className={modalShow === true ? "open" : ""}>
      <div className="background" onClick={
        () => {
          dispatch(setModalShow(false));
          setMessage("");
        }
      }></div>
      <div className={modalShow === true ? "menu open" : "menu"}>
        <h3>Comment</h3>
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(event) => handleInputChange(event, setMessage)}
            />
          {submitLoading ?
            <div className="loader-wrapper">
              <CircleRotate />
            </div>
          :
            <button type="action" className="action">Submit</button>
          }
        </form>
      </div>
  	</div>
  );
}

function CommentParser(props) {
  const dispatch = useDispatch();

  const styling = css`
    ${'' /* border: 3px solid red; */}

    width: 100%;

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
      margin-left: 10px;
    }

    .depth-2 {
      margin-left: 15px;
    }

    .depth-3 {
      margin-left: 20px;
    }

    .depth-4 {
      margin-left: 25px;
    }

    .depth-5 {
      margin-left: 30px;
    }

    .comment-actions {
      ${'' /* border: 2px solid blue; */}

      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
    }

    .comment-button-container {
      margin-right: 10px;
    }

    .comment-button {

    }

    .comment-container {
      ${'' /* border: 1px solid green; */}

      ${'' /* width: 70%; */}
    }

    .comment-box{
      ${'' /* border: 2px solid black; */}

      padding: 15px;
      margin: 10px 0px;
      margin-left: 10px;
      border-radius: 10px;

      background-color: rgb(242,242,242);
      box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.4);

      transition: box-shadow 0.5s ease;
    }
  `;

  function parser() {
    var comments = []
    try {
      console.log("INDEX:", props.index)
      console.log("COMMENT PARSER GIVEN: ", props.data);
      if (props.data.data.children) {
        comments = props.data.data.children.map((comment) => {
          var replies = [];
          if (comment.data.replies) {
            replies = comment.data.replies.data.children.map((reply) => {
              return (
                <CommentParser data={reply} index={props.index + 1} />
              );
            })
          }

          return (
            <div className={"comment-container depth-" + props.index}>
              <div className={"comment-box depth-" + props.index} key={comment.data.id}>
                <div>{comment.data.body}</div>
                <div className="comment-actions">
                  <div className="comment-button-container">
                    <p className="comment-button" onClick={
                      () => {
                        if (!comment.data.archived) {
                          dispatch(setModalShow(true));
                          dispatch(setParentComment(comment.data.name));
                        } else {
                          dispatch(setArchiveModalShow(true));
                        }
                      }
                    }>Comment</p>
                  </div>
                  <div className="comment-info">
                    <CommentVoteContainer data={comment} />
                    <Link to={"/user/" + comment.data.author} className="comment-author">{comment.data.author}</Link>
                  </div>
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
              <div className="comment-actions">
                <div className="comment-button-container">
                  <p className="comment-button" onClick={
                    () => {
                      if (!props.data.data.archived) {
                        dispatch(setModalShow(true));
                        dispatch(setParentComment(props.data.data.name));
                      } else {
                        dispatch(setArchiveModalShow(true));
                      }
                    }
                  }>Comment</p>
                </div>
                <div className="comment-info">
                  <CommentVoteContainer data={props.data} />
                  <Link to={"/user/" + props.data.data.author} className="comment-author">{props.data.data.author}</Link>
                </div>
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

      margin-left: 15px;
    }

    .post-actions {
      ${'' /* border: 2px solid red; */}

      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
    }

    .comment-button-container {
      ${'' /* border: 1px solid blue; */}

    }

    p.comment-button {
      cursor: pointer;

      background: linear-gradient(to bottom, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%);
      background-position: 0 100%;
      background-repeat: repeat-x;
      background-size: 2px 2px;
    }


    .comments-area{
      ${'' /* border: 1px solid red; */}

      display: flex;
      flex-direction: column;
      align-items: center;
      ${'' /* justify-content: flex-end; */}
      width: 90%;
      margin: auto;
    }

    .bubble-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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

      if (responseBody.error) {
        if (responseBody.error == 401) {
          window.location.href = "/login";
        } else if (responseBody.error == 404) {
          window.location.href = "/404";
        }
      }

      setPostPageData(responseBody)
      setLoadingPost(false)
    }
    fetchSubredditPage()
  }, [subreddit, post, cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

  useEffect(() => {
    dispatch(clearTitle());
    dispatch(setPage("post", ""));
  }, [dispatch]);

  function postParser() {
    var postContents = null;
    try {
      var postObject = postPageData[0].data.children[0].data;
      var selftext = postObject.selftext;
      var title = postObject.title;

      if (postObject.selftext === ""){
        if (postObject.post_hint === "link"){
          postContents =
            <div className="link-type">
               <a href={postObject.url}>
                 <img src={postObject.thumbnail} alt={postObject.title} />
               </a>
            </div>;
        }
        else if (postObject.post_hint === "image"){
          postContents =
            <div className="image-type">
              <img src={postObject.url} alt={postObject.title} />
            </div>;
        }
      }
      else {
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
      <CommentModal />
      {loadingPost ? (
        <div className="bubble-container">
          <PulseBubble />
        </div>
      ) :
        <div>
          <div className="post-container">
            {postText}
            <div className="post-actions">
              <div className="comment-button-container">
                <p className="comment-button" onClick={
                  () => {
                    if (!postPageData[0].data.children[0].data.archived) {
                      dispatch(setModalShow(true));
                      dispatch(setParentComment(postPageData[0].data.children[0].data.name));
                    } else {
                      dispatch(setArchiveModalShow(true));
                    }
                  }
                }>Comment</p>
              </div>
              <div className="post-data">
                <Link to={"/user/" + post_author} className="user post-author">
                  {post_author}
                </Link>
                <Link to={"/r/" + postPageData[0].data.children[0].data.subreddit} className="subreddit">
                  {"r/" + postPageData[0].data.children[0].data.subreddit}
                </Link>
              </div>
            </div>
          </div>
          <div></div>
          <div className="comments-area">
            <CommentParser data={postPageData[1]} index={0} />
          </div>
          <div className="subreddit-stretch"></div>
        </div>
      }
    </div>
  );
}

export default PostPage;
