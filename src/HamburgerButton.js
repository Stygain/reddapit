/** @jsx jsx */
import { jsx, css } from '@emotion/core';

function HamburgerButton(props) {
  const styling = css`
    & .button-container {
      display: none;
    }

    @media (max-width: 768px) {
      & .button-container {
        background-color: rgb(244, 244, 244);
        border-radius: 5px;
        margin: 0;
        padding: 4px 8px;
        margin-right: 8px;
        font-size: 25px;
        margin-left: 0px;
        transition: background-color 0.5s;
        z-index: 10;
        width: 35px;
        cursor: pointer;
        display: block;
        color: #000;
      }

      .button-container:hover {
        background-color: rgb(230, 230, 230);
      }

      .button-container.open {
        background-color: rgb(220, 220, 220);
      }

      .bar1.open.up {
        transform: translateY(1px) translateX(8.5px) rotate(-135deg) scaleX(0.8);
      }

      .bar2.open.up {
        transform: translateY(2px) translateX(0px) rotate(90deg) scaleY(1.2);
      }

      .bar3.open.up {
        transform: translateY(-20.5px) translateX(-8.5px) rotate(135deg) scaleX(0.8);
      }

      .bar1.open.right {
        transform: translateY(3px) translateX(8.5px) rotate(-135deg) scaleX(0.8);
      }

      .bar2.open.right {
        transform: translateY(0px) translateX(0px) rotate(180deg) scaleY(1.2);
      }

      .bar3.open.right {
        transform: translateY(-3px) translateX(8.5px) rotate(135deg) scaleX(0.8);
      }

      .button-container .button {
        display: inline-block;
        cursor: pointer;
      }

      .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: #333;
        margin: 6px 0;
        transition: 0.4s;
      }
    }
  `;

  return (
    <div css={styling}>
      <div className={props.action ? "button-container open" : "button-container"} onClick={() => {
        props.setAction(!props.action);
      }}>
        <div className="hamburger-button">
          <div className={props.action ? "bar1 open " + props.dir : "bar1"}></div>
          <div className={props.action ? "bar2 open " + props.dir : "bar2"}></div>
          <div className={props.action ? "bar3 open " + props.dir : "bar3"}></div>
        </div>
      </div>
    </div>
  );
}


export default HamburgerButton;
