/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import RedditComment from './RedditComment.js';
import RedditLink from './RedditLink.js';


function ListingParser(props) {
  const styling = css`
    ${'' /* border: 1px solid red; */}
  `;
  return (
    <div css={styling} className="listing">
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
