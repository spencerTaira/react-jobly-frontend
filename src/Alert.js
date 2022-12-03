import React from 'react';

/**
 *  Renders alert message
 *
 *  Props: message, type (string)
 *
 *  State: None
 *
 *  ProfileForm, SignupForm, LoginForm -> Alert
 */

function Alert({message, type}) {
  console.debug('Alert');

  return (
    <div className={`Alert alert alert-${type}`} role="alert">
      {message}
    </div>
  )
}

export default Alert;