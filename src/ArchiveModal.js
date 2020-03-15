/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { useDispatch, useSelector } from 'react-redux';
import { clearTitle, setModalShow, setParentComment, setPage, setArchiveModalShow } from './redux/actions.js';
import { getModalShow, getParentComment, getArchiveModalShow } from './redux/selectors.js';


function ArchiveModal(props){
  const dispatch = useDispatch();
  const archiveModalShow = useSelector(getArchiveModalShow);

  const styling = css`
    ${'' /* border: 4px solid red; */}

    position: fixed;
    z-index: 5;
    opacity: 0%;
    text-align: center;
    margin: 0;

    top: -100%;
    left: 0%;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    transition: 0.8s ease-in-out;

    &.open {
      opacity: 100%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .background {
      ${'' /* border: 1px solid blue; */}

      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;

      background-color: rgba(171, 171, 171, 0.52);

      cursor: pointer;

      transition: 0.8s ease-in-out;
    }

    .menu {
      ${'' /* border: 1px solid red; */}

      min-width: 35%;
      max-height: 0;
      margin-bottom: 200%;
      border-radius: 10px;
      padding: 0px 10px;

      box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.49);

      background-color: rgb(255, 255, 255);
      z-index: 2;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      overflow: hidden;

      transition: 0.8s ease-in-out;
    }

    .menu.open {
      margin-bottom: 0;
      min-height: 100px;
    }

    .menu h3 {
      @import url('https://fonts.googleapis.com/css?family=Odibee+Sans&display=swap');
      font-family: 'Odibee Sans', cursive;
      font-weight: 500;
      font-size: 24px;
      color: red;
      line-height: 100px;
      vertical-align: center;
    }`;

  return(
    <div css={styling} className={archiveModalShow === true ? "open" : ""}>
    <div className="background" onClick={
      () => {
        dispatch(setArchiveModalShow(false));
      }
    }></div>
    <div className={archiveModalShow === true ? "menu open" : "menu"}>
      <h3>This post is archived, voting and commenting are not allowed.</h3>
    </div>
  </div>

  );
}

export default ArchiveModal;
