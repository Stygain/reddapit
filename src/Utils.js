/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export function ContentMargin(props) {
  const styling = css`
    margin-top: 90px;
  `;
  return (
    <div css={styling}>
      {props.children}
    </div>
  );
}

export function Center(props) {
  const styling = css`
    text-align: center;
  `;
  return (
    <div css={styling}>
      {props.children}
    </div>
  );
}
