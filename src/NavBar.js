/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import pages from './data/pages.json'

function NavBar(props) {
  const [ open, setOpen ] = useState(false);
  const styling = css`
    & {
      @import url('https://fonts.googleapis.com/css?family=Odibee+Sans&display=swap');

      margin: 0px;
      padding: 0px;
      width: 100%;
      z-index: 1;
      position: fixed;
      top: 0px;
      font-family: 'Odibee Sans', cursive;
      box-shadow: 0px 10px 15px rgba(33, 33, 33, 0.66);
      background-color: rgb(255, 255, 255);

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    & a {
      text-decoration: none;
      color: #000;
    }

    & .title {
      margin: 0;
      padding-left: 10px;

      width: 250px;
      font-size: 40px;
      text-align: left;
      font-weight: 500;
    }

    & .navlist {
      margin: 0px;
      padding: 0px;
      width: 100%;
      background: rgb(255, 255, 255);
    }

    .navlist .home {
      display: none;
    }

    & .button-container {
      display: none;
    }

    .navlist ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .navlist a {
      padding: 8px 12px;
      font-weight: 500;
      font-size: 30px;
      color: rgb(166, 166, 166);
      -webkit-transition: color 0.5s ease-in-out;
         -moz-transition: color 0.5s ease-in-out;
           -o-transition: color 0.5s ease-in-out;
          -ms-transition: color 0.5s ease-in-out;
              transition: color 0.5s ease-in-out;
    }

    .navlist ul li a.active {
      color: #000;
    }

    .navlist ul li a:hover:not(.active) {
      color: #444;
    }

    @media (max-width: 1300px) {
      & .title {
        width: 200px;
      }

      .navlist {
        width: 100%;
        position: absolute;
        top: 47px;
        box-shadow: 0px 10px 15px rgba(33, 33, 33, 0.66);
        overflow: hidden;

        height: 0;
        transition: height 0.5s;
      }

      .navlist .home {
        display: block;
      }

      .navlist.open {
        height: auto;
        height: 225px;
      }

      .navlist ul {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .navlist ul li a {
        padding: 0;
        display: block;
      }

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

      .bar1.open {
        transform: translateY(1px) translateX(8.5px) rotate(-135deg) scaleX(0.8);
      }

      .bar2.open {
        transform: translateY(2px) translateX(0px) rotate(90deg) scaleY(1.2);
      }

      .bar3.open {
        transform: translateY(-20.5px) translateX(-8.5px) rotate(135deg) scaleX(0.8);
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

    @media (max-width: 768px) {
      & .title {
        width: 160px;
        font-size: 32px;
      }

      .navlist {
        top: 47px;
      }
    }
  `;

  return (
    <div css={styling} className='navbar'>
      <NavLink className="title" to="/">Reddapit</NavLink>
      <div className={open ? "button-container open" : "button-container"} onClick={() => {
        setOpen(!open);
      }}>
        <div className="hamburger-button">
          <div className={open ? "bar1 open" : "bar1"}></div>
          <div className={open ? "bar2 open" : "bar2"}></div>
          <div className={open ? "bar3 open" : "bar3"}></div>
        </div>
      </div>
      <div className={open ? "navlist open" : "navlist"}>
        <ul>
          <li className="navlink home" key="/">
            <NavLink exact to="/" onClick={() => {
              setOpen(!open);
            }}>
              Home
            </NavLink>
          </li>
          {pages["pages"].map(({name, url}) => {
            return (<li className="navlink" key={url}>
              <NavLink exact to={url} onClick={() => {
                setOpen(!open);
              }}>
                {name}
              </NavLink>
            </li>);
          })}
        </ul>
      </div>
    </div>
  );
}


export default NavBar;
