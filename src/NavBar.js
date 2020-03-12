/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getTitle } from './redux/selectors.js';

import HamburgerButton from './HamburgerButton.js';

import pages from './data/pages.json'

function NavBar(props) {
  const [ open, setOpen ] = useState(false);

  const title = useSelector(getTitle);

  const styling = css`
    & {
      @import url('https://fonts.googleapis.com/css?family=Odibee+Sans&display=swap');

      margin: 0px;
      padding: 0px;
      width: 100%;
      z-index: 3;
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

    .title-container {
      ${'' /* border: 1px solid red; */}

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
    }

    & .title {
      ${'' /* border: 1px solid green; */}

      margin: 0;
      padding-left: 10px;

      ${'' /* width: 250px; */}
      font-size: 40px;
      text-align: left;
      font-weight: 500;
    }

    .title-container h1 {
      font-size: 24px;
      text-align: left;
      font-weight: 500;
      color: rgb(149, 149, 149);
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

    @media (max-width: 768px) {
      & .title {
        ${'' /* width: 160px; */}
        font-size: 32px;
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
    }
  `;

  return (
    <div css={styling} className='navbar'>
      <div className="title-container">
        <NavLink className="title" to="/">Reddapit</NavLink>
        <h1>{title === "" ? "" : title}</h1>
      </div>
      <HamburgerButton action={open} setAction={setOpen} dir="up" />
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
