import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import RoutesList from "./RoutesList";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

import userInfoContext from "./userInfoContext";

/**
 *  Renders Navigation and Routes List
 *
 *  Props: None
 *
 *  State: userInfo object {
 *                          user: {username, firstName, lastName, email},
 *                          hasLoaded: true
 *                          },
 *         token
 *
 *  App -> Navigation & RoutesList
 *
 */


function App() {
  console.debug("App");

  const defaultToken = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({
    user: {
      username: null,
      firstName: null,
      lastName: null,
      email: null
    },
    hasLoaded: false
  });

  const [token, setToken] = useState(defaultToken);

  useEffect(
    function getUserInfo() {
      async function getUserApi() {
        if (!token) {
          setUserInfo({
            user: {
              username: null,
              firstName: null,
              lastName: null,
              email: null
            },
            hasLoaded: true
          });
        } else {
          JoblyApi.token = token;
          const decoded = jwt_decode(token);
          console.log("Use EFFECT decoded: ", decoded);
          try {
            const currUser = await JoblyApi.getUser(decoded.username);
            setUserInfo({
              user: {
                username: currUser.username,
                firstName: currUser.firstName,
                lastName: currUser.lastName,
                email: currUser.email
              },
              hasLoaded: true
            });
            localStorage.setItem("token", token);
          } catch (err) {
            console.log("CATCH ERROR", err)
            setToken(null)
            setUserInfo({
              user: {
                username: null,
                firstName: null,
                lastName: null,
                email: null
              },
              hasLoaded: true
            });
          }
        }
      }
      getUserApi();
    },
    [token]
  );

  console.log("userInfo: ", userInfo, "token: ", token);

  /** Signs user up and sets token
   *  Input: userInfo - Object
   *  {username, password, firstName, lastName, email}
   */
  async function userSignup(userInfo) {
    let token = await JoblyApi.userRegister(userInfo);
    console.log("SIGNUP Token: ", token);
    setToken(token);
  }

  /** Logs user in and sets token
   *  Input: userInfo - Object
   *  {username, password}
   */
  async function userLogin(userInfo) {
    let token = await JoblyApi.userLogin(userInfo);
    setToken(token);
  }

  /** Updates current user information and sets userInfo
   *
   *  Input: userInfo - Object
   *  {username, firstName, lastName, email}
   */
  async function userUpdate(userInfo) {
    let updatedUser = await JoblyApi.userUpdate(userInfo);
    console.log("Updated User: ", updatedUser);
    setUserInfo(u => (
      {
        ...u,
        user: {
          username: updatedUser.username,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email
        }})
    );
  }

  /** Logs current user out
   * sets token and userinfo to null and clears localstorage
   */
  function userLogout() {
    setToken(null);
    setUserInfo({
      user: {
        username: null,
        firstName: null,
        lastName: null,
        email: null
      },
      loggedIn: false
    });
    localStorage.removeItem("token");
    console.log("LOGOUT")
  }

  if (userInfo.hasLoaded === false) {
    console.log('LOADING');
    return (<i>...Loading</i>)
  }

  return (
    <div className="App">
      <userInfoContext.Provider value={userInfo}>
        <BrowserRouter>
          <Navigation userLogout={userLogout}/>
          <RoutesList
            userSignup={userSignup}
            userLogin={userLogin}
            userUpdate={userUpdate}
          />
        </BrowserRouter>
      </userInfoContext.Provider>
    </div>
  );
}

export default App;
