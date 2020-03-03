/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import ListingParser from './ListingParser.js';
import SubredditSidebar from './SubredditSidebar.js';

function SubredditPage(props) {
    const { subreddit, post } = useParams();

    const [open, setOpen] = useState(false);
    const [subredditPageData, setSubredditPageData] = useState({ data: { children: [] } });

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies();

    alert("post page!");

    const styling = css`
    ${'' /* border: 1px solid red; */}

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;

    .subreddit-stretch {
      ${'' /* border: 1px solid red; */}

      width: 100%;
      height: auto;
      height: 91vh;
      max-width: 15%;
      flex-shrink: 10;

      border-right: ${open ? "1px solid rgb(180, 180, 180)" : "1px solid rgba(180, 180, 180, 0)"};
      transition: ${open ? "border 0.8s ease-in-out 0.2s" : "border 0.6s ease-in-out"};
    }
    .comment-box{
        padding: 10px;
        height: auto;
        border: 1px solid black;
        margin-bottom: 10px;
        margin-top: 10px;
        border-radius: 10px;
        margin-left: 20px;
    }
  `;

    useEffect(() => {
        async function fetchSubredditPage() {
            let responseBody = {};
            // setLoadingUser(true);
            const response = await fetch(
                ("https://oauth.reddit.com/r/" + subreddit + "/comments/fcy4bj" + "?raw_json=1&?sort=confidence"),
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

            setSubredditPageData(responseBody)
            // setLoadingUser(false)
        }
        fetchSubredditPage()
    }, [subreddit, cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);


    function commentParser() {
        try {
            var comments = subredditPageData[1].data.children.map(comment =>
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
            var post = subredditPageData[0].data.title;
            return post;
        }
        catch{
            return null;
        }
    }
    
    var postText = postParser();
    var commentElements = commentParser();
    

    return (
        <div css={styling}>
            <div>{postText}</div>
            <div>{commentElements}</div>
            <div className="subreddit-stretch"></div>
            <SubredditSidebar open={open} setOpen={setOpen} />
        </div>
    );
}


export default SubredditPage;
