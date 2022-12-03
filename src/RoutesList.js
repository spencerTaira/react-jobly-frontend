import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import userInfoContext from './userInfoContext';


/**
 *  Create routes for application
 *
 *  Props: userLogin (func), userSignup (func), userProfile (func)
 *
 *  State: None
 *
 *  Render App -> RoutesList
 */


function RoutesList({userLogin, userSignup, userUpdate}) {
  const userInfo = useContext(userInfoContext);

  if (!userInfo.user.username) {
    return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm login={userLogin} />}/>
      <Route path="/signup" element={<SignupForm signup={userSignup}/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm login={userLogin} />}/>
        <Route path="/signup" element={<SignupForm signup={userSignup}/>} />
        <Route path="/profile" element={<ProfileForm update={userUpdate}/>} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    );
  }
}

export default RoutesList;
