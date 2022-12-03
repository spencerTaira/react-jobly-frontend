import React, { useState, useContext } from "react";
import Alert from './Alert';
// import "./ProfileForm.css";
import userInfoContext from './userInfoContext';

/**
 * Renders form
 *
 * Props: update - function
 *
 * State: formData - string
 *        error - Array
 *        success - Boolean
 *
 * Render:
 *   App -> ProfileForm
 */

function ProfileForm({ update }) {
  console.debug("ProfileForm");

  const userInfo = useContext(userInfoContext);
  const defaultFormData = {
    username: userInfo.user.username,
    firstName: userInfo.user.firstName,
    lastName: userInfo.user.lastName,
    email: userInfo.user.email,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  console.log('formData: ', formData, 'error: ', errors);
  /**
   * Updates form input
   *
   * Input: event object
   */
  function onChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /**
   *  Calls passed in parent function and resets formData
   *
   *  Input: event object
   */
  async function onSubmit(e) {
    e.preventDefault();
    try {
      console.log("IN TRY")
      await update(formData);
      setSuccess(true);
    } catch (error) {
      console.log("ERROR!", error)
      setErrors(error);
    }
  }

  return (
    <form className="ProfileForm container" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="profile-form-username">Username</label>
        <input
          id="profile-form-username"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={onChange}
          disabled
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="profile-form-firstName">First Name</label>
        <input
          id="profile-form-firstName"
          name="firstName"
          className="form-control"
          value={formData.firstName}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="profile-form-lastName">Last Name</label>
        <input
          id="profile-form-lastName"
          name="lastName"
          className="form-control"
          value={formData.lastName}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="profile-form-email">Email</label>
        <input
          id="profile-form-email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      {
        errors.length !== 0
          ? errors.map((e, idx) => (
              <Alert key={idx} message={e} type="danger" />
            ))
          : null
      }
      {success && <Alert message={"Updated successfully!"} type="success"/>}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ProfileForm;
