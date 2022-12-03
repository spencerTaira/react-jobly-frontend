import React, { useContext } from "react";
import "./HomePage.css";
import userInfoContext from "./userInfoContext";
import {useNavigate} from "react-router-dom";

/**
 *  Renders home page
 *
 *  Props: None
 *
 *  State: None
 *
 *  App -> HomePage
 */

function HomePage() {
  const userInfo = useContext(userInfoContext);
  console.debug("HomePage");

  const navigate = useNavigate();

  function signupClick(e) {
    e.preventDefault();
    navigate('/signup');
  }

  function loginClick(e) {
    e.preventDefault();
    navigate('/login');
  }


  return (
    <div className="HomePage">
      <div>
        <h1>Jobly</h1>
        {userInfo.user.username && <p>Welcome {userInfo.user.firstName}! </p>}
        <p>Find your dream job on a Korean beach!</p>
        {!userInfo.user.username &&
        <div className="HomePage-buttons">
          <button onClick={signupClick} className="btn btn-primary">Sign Up</button>
          <button onClick={loginClick} className="btn btn-primary">Log In</button>
        </div>
        }
      </div>
    </div>
  );
}

export default HomePage;
