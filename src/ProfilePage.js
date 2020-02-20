/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './PulseBubble.js';
import ProfileHeader from './ProfileHeader.js';
import Trophy from './Trophy.js';

function epochToYear(epochTime) {
  var myDate = new Date(epochTime *1000);
  return([myDate.getMonth(), myDate.getDay(), myDate.getFullYear()]);
}

function accountAgeYears(epochTime) {
  var [month, day, year] = epochToYear(epochTime);
  // console.log(month + "/" + day + "/" + year)
  var today = new Date();
  // console.log(today.getFullYear())
  var ageDays = today.getDay() - day;
  var ageMonths = today.getMonth() - month;
  var ageYears = today.getFullYear() - year;
  // console.log(ageDays + "  " + ageMonths + "  " + ageYears)
  if (ageMonths >= 0) {
    return ageYears;
  } else {
    return ageYears - 1;
  }
}

function ProfilePage(props) {
  const styling = css`
    border: 1px solid red;

  `;
  return (
    <div css={styling}>
      <ProfileHeader />
      <Trophy />
    </div>
  );
}


export default ProfilePage;
