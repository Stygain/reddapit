/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import React from 'react';
import PulseBubble from './Loaders/PulseBubble';

import ListingParser from './ListingParser.js';
import SubredditSidebar from './SubredditSidebar.js';

function SubredditPage(props) {
    const { subreddit, post } = useParams();

    const [loadingPost, setLoadingPost] = useState(true);
    const [postPageData, setPostPageData] = useState({ data: { children: [] } });

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies();
    const styling = css`
    position: relative;
    .comment-box{
        padding: 15px;
        height: auto;
        border: 1px solid black;
        margin-bottom: 10px;
        margin-top: 10px;
        border-radius: 10px;
        margin-left: 20px;
        max-width: 900px;
    }
    .post-container{
        min-width: 600px;
        margin-bottom: 20px;
        display: block;
        height: auto;
        background-color: lightgrey;
        color: black;
        line-height: 20px;
        padding: 15px;
        margin-left: 20px;
        margin-right: 20px;
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
    }
    .bubble-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
                <div className="comment-box" key={comment.data.id}>{comment.data.body}</div>
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


    return (

        <div css={styling}>

            {loadingPost ? (
                <div className="bubble-container">
                    <PulseBubble />
                </div>
            ) :
                <div>
                    <div className="post-container">{postText}</div>
                    <div>Comments:</div>
                    <div className="comments-area">{commentElements}</div>
                    <div className="subreddit-stretch"></div>
                </div>
            }
        </div>
    );
}


export default SubredditPage;
