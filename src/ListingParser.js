/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import RedditComment from './RedditComment.js';
import RedditLink from './RedditLink.js';


function ListingParser(props) {
  return (
    <div>
      {
        props.listing.data.children.map((item) => {
          // console.log(item)
          if (item["kind"] === "t1") {
            return(<RedditComment data={item} key={item.data.name} />);
          } else if (item["kind"] === "t3") {
            return(<RedditLink data={item} key={item.data.name} />);
          }
        })
      }
    </div>
  );
}


export default ListingParser;
