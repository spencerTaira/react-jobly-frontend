import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import userInfoContext from './userInfoContext';

/**
 *  Renders navigation bar
 *
 *  Props: userLogout
 *
 *  State: None
 *
 *  App -> Navigation -> Link
 */

function Navigation({userLogout}) {
  const userInfo = useContext(userInfoContext);

  return (
    <nav className="Navigation">
      <div className="Navigation-left">
        <NavLink className="Navigation-Link-Jobly" to='/'>
          Jobly
        </NavLink>
      </div>

      {
        !userInfo.user.username
          ? <div className="Navigation-right">
              <NavLink className="Navigation-Link-Signup" to='/signup'>
                Signup
              </NavLink>
              <NavLink className="Navigation-Link-Login" to='/login'>
                Login
              </NavLink>
            </div>

          : <div className="Navigation-right">
              <NavLink className="Navigation-Link-Companies" to='/companies'>
                Companies
              </NavLink>
              <NavLink className="Navigation-Link-Jobs" to='/jobs'>
                Jobs
              </NavLink>
              <NavLink className="Navigation-Link-Profile" to='/profile'>
                Profile
              </NavLink>
              <NavLink className="Navigation-Link-Logout" to='/' onClick={userLogout}>
                Logout {userInfo.user.username}
              </NavLink>
            </div>
      }
    </nav>
   );
}

export default Navigation;