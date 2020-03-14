/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useDispatch } from 'react-redux';
import { clearTitle, setPage } from './redux/actions.js';

import CircleRotate from './Loaders/CircleRotate.js';


function LoginPage(props) {
  const dispatch = useDispatch();

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ secret, setSecret ] = useState("");
  const [ clientId, setClientId ] = useState("");
  const [ appName, setAppName ] = useState("");
  const [ appVersion, setAppVersion ] = useState("");

  const [ submitLoading, setSubmitLoading ] = useState(false);
  const [ disableInputs, setDisableInputs ] = useState(false);

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid red; */}

    font-family: 'Odibee Sans', cursive;

    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    .login-win {
      ${'' /* border: 1px solid blue; */}

      min-width: 420px;
      min-height: 550px;
      border-radius: 20px;
      background-color: rgb(240, 240, 240);
      box-shadow: 0px 0px 40px rgba(40, 40, 40, 0.5);
    }

    .login-win h1 {
      ${'' /* border: 1px solid pink; */}

      font-size: 60px;
      margin: 10px 0px;
      letter-spacing: 2px;
    }

    form {
      ${'' /* border: 1px solid green; */}

      height: 80%;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    form input {
      margin: 10px 0px;

      font-size: 22px;
      text-align: center;
      padding: 4px;
      border: none;
      box-shadow: 0px 2px 10px rgba(50, 50, 50, 0.2);
      background-color: rgb(213, 213, 213);
      transition: box-shadow 0.3s ease-in-out;
    }

    form input:focus {
      box-shadow: 0px 2px 15px rgba(10, 10, 10, 0.5);
    }

    form input:disabled {
      color: rgb(122, 122, 122);
    }

    form input:nth-child(1) {
      margin-top: 40px;
    }

    .loader-wrapper {
      margin-top: 20px;
      padding: 6px;
    	border: none;
    	border-radius: 4px;
      width: 83px;
      height: 39px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

    	background: rgb(119, 171, 255);
    	background: linear-gradient(to bottom left, rgb(119, 171, 255), rgb(40, 122, 255));
    	box-shadow: 0px 2px 20px rgba(50, 50, 50, 0.5);
    }

    button {
      font-family: 'Odibee Sans', cursive;
      font-size: 35px;
    	font-weight: 600;
      letter-spacing: 1px;

      margin-top: 20px;
      padding: 6px;
    	text-transform: uppercase;
    	border: none;
    	cursor: pointer;
    	border-radius: 4px;
    	background: rgb(119, 171, 255);
    	background: linear-gradient(to bottom left, rgb(119, 171, 255), rgb(40, 122, 255));
    	box-shadow: 0px 2px 20px rgba(50, 50, 50, 0.5);
    	transition: 0.3s ease-in-out all;
    }

    button:hover {
      box-shadow: 0px 2px 15px rgba(10, 10, 10, 0.5);
    }
  `;

  function handleSubmit(event) {
    event.preventDefault();
    if (username === '' ||
        password === '' ||
        secret === '' ||
        clientId === '' ||
        appName === '' ||
        appVersion === '') {
      alert("An argument is empty!")
    } else {
      async function fetchAccessToken() {
        let responseBody = {};
        setSubmitLoading(true);
        setDisableInputs(true);
        const response = await fetch(
          `https://www.reddit.com/api/v1/access_token`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "Authorization": "Basic " + btoa(clientId + ":" + secret),
              "User-Agent": (appName + "/" + appVersion + " by " + username)
            },
            body: ("grant_type=password&username=" + username + "&password=" + password)
          }
        );
        // TODO add error handling
        responseBody = await response.json();
        console.log(responseBody);

        // Set cookies for our login information
        setCookie('accessToken', responseBody.access_token);
        setCookie('username', username);
        setCookie('appName', appName);
        setCookie('appVersion', appVersion);
        console.log(cookies);

        setSubmitLoading(false);
        setDisableInputs(false);
        setUsername('')
        setPassword('')
        setSecret('')
        setClientId('')
        setAppName('')
        setAppVersion('')
      }
      fetchAccessToken();
      // window.location.href = "/";
    }
  }

  function handleInputChange(event, setter) {
    // console.log("Input change: " + event.target.value)
    setter(event.target.value)
  }

  useEffect(() => {
    dispatch(clearTitle());
    dispatch(setPage("login", ""));
  }, [dispatch]);

  return (
    <div css={styling}>
      <div className="login-win">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="redditUsername"
            placeholder="Reddit Username"
            value={username}
            onChange={(event) => handleInputChange(event, setUsername)} disabled={disableInputs}
            />
          <input
            type="password"
            name="redditPassword"
            placeholder="Reddit Password"
            value={password}
            onChange={(event) => handleInputChange(event, setPassword)} disabled={disableInputs}
            />
          <input
            type="password"
            name="redditSecret"
            placeholder="Reddit Secret"
            value={secret}
            onChange={(event) => handleInputChange(event, setSecret)} disabled={disableInputs}
            />
          <input
            type="text"
            name="redditClientId"
            placeholder="Reddit Client ID"
            value={clientId}
            onChange={(event) => handleInputChange(event, setClientId)} disabled={disableInputs}
            />
          <input
            type="text"
            name="redditAppName"
            placeholder="App Name"
            value={appName}
            onChange={(event) => handleInputChange(event, setAppName)} disabled={disableInputs}
            />
          <input
            type="text"
            name="redditAppVersion"
            placeholder="App Version"
            value={appVersion}
            onChange={(event) => handleInputChange(event, setAppVersion)} disabled={disableInputs}
            />

          {submitLoading ?
            // TODO add some fancier loading thing here
            <div className="loader-wrapper">
              <CircleRotate />
            </div>
          :
            <button type="action" className="action">Enter</button>
          }
        </form>
      </div>
    </div>
  );
}


export default LoginPage;
