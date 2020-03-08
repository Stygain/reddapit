/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import React from 'react';
import PulseBubble from './Loaders/PulseBubble';

import VoteContainer from './VoteContainer';

import ListingParser from './ListingParser.js';
import SubredditSidebar from './SubredditSidebar.js';

function PostPage(props) {
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
        min-width: 200px;
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
        display: flex;
        justify-content: flex-start;
        align-items: start;
        justify-content: left;
        -webkit-justify-content: left;
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
            console.log(responseBody);

            setPostPageData(responseBody)
            setLoadingPost(false)
        }
        fetchSubredditPage()
    }, [subreddit, post, cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);

    function simpleCommentParser() {
        try {
            var comments = postPageData[1].data.children.map(comment =>
                <div className="comment-box" key={comment.data.id}>
                    
                    <div>{comment.data.body}</div>
                    <div className="comment-info">
                    <VoteContainer data={comment} />
                        <Link to={"/user/" + comment.data.author} className="comment-author">{comment.data.author}</Link>
                    </div>
                </div>
            );
            return comments;
        }
        catch{
            return null;
        }
    }

    function postParser() {
        //TODO: handle text vs image posts
        try {
            var selftext = postPageData[0].data.children[0].data.selftext;
            var title = postPageData[0].data.children[0].data.title;
            console.log("selftext is: " + selftext + " title is: " + title);
            return (
                <>
                    <div className="post-title">
                        {title}
                    </div>
                    <div>
                        {selftext}
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
    var commentElements = simpleCommentParser();

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
                        <Link to={"/user/" + post_author} >{post_author}</Link>
                        <div>{postPageData[0].data.children[0].data.subreddit}</div>
                    </div>
                    <div></div>
                    <div className="comments-area">{commentElements}</div>
                    <div className="subreddit-stretch"></div>
                </div>
            }
        </div>
    );
}


export default PostPage;
