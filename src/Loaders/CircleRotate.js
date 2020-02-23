/** @jsx jsx */
import { jsx, css } from '@emotion/core';

function CircleRotate() {
  const styling = css`
    ${'' /* border: 1px solid green; */}

    width: 45px;
    height: 45px;
    position: relative;

    div {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      position: absolute;
    }

    div:nth-child(1) {
      border: 8px solid #000;
      border-color: #000 transparent transparent transparent;
      animation: circle-move-1 5s cubic-bezier(.76,0,.63,1) 0.25s infinite;
    }

    div:nth-child(2) {
      border: 8px solid #000;
      border-color: transparent #000 transparent transparent;
      animation: circle-move-2 5s cubic-bezier(.76,0,.63,1) 0.5s infinite;
    }

    div:nth-child(3) {
      border: 8px solid #000;
      border-color: transparent transparent #000 transparent;
      animation: circle-move-3 1.8s cubic-bezier(.76,0,.63,1) 0s infinite;
    }


    @keyframes circle-move-1 {
      0% {
        border-color: #000 transparent transparent transparent;
      }
      25% {
        border-color: transparent #000 transparent transparent;
        transform: rotate(360deg);
      }
      50% {
        border-color: transparent transparent #000 transparent;
        transform: rotate(720deg);
      }
      75% {
        border-color: transparent transparent transparent #000;
        transform: rotate(1080deg);
      }
    }

    @keyframes circle-move-2 {
      0% {
        border-color: transparent #000 transparent transparent;
      }
      25% {
        border-color: transparent transparent #000 transparent;
        transform: rotate(360deg);
      }
      50% {
        border-color: transparent transparent transparent #000;
        transform: rotate(720deg);
      }
      75% {
        border-color: #000 transparent transparent transparent;
        transform: rotate(1080deg);
      }
    }

    @keyframes circle-move-3 {
      0% {
        border-color: transparent transparent #000 transparent;
      }
      25% {
        border-color: transparent transparent transparent #000;
        transform: rotate(360deg);
      }
      50% {
        border-color: #000 transparent transparent transparent;
        transform: rotate(720deg);
      }
      75% {
        border-color: transparent #000 transparent transparent;
        transform: rotate(1080deg);
      }
    }
  `;
  return (
    <div css={styling}>
  	  <div></div>
  	  <div></div>
  	</div>
  );
}

export default CircleRotate;
