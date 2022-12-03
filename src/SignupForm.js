import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
// import "./SignupForm.css";

/**
 * Renders form
 *
 * Props: onSubmission - function
 *
 * State: formData - string
 *        error - Array
 *
 * Render:
 *   App -> SignupForm
 */

function SignupForm({ signup }) {
  console.debug("SignupForm");
  const navigate = useNavigate();

  const defaultFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState([]);

  console.log("formData: ", formData, "error: ", errors);
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
      console.log("IN TRY");
      await signup(formData);
      setFormData(defaultFormData);
      navigate("/");
    } catch (error) {
      console.log("ERROR!", error);
      setErrors(error);
    }
  }

  return (
    <form className="SignupForm container" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="signup-form-username">
          Username
        </label>
        <input
          id="signup-form-username"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="signup-form-password">
          Password
        </label>
        <input
          id="signup-form-password"
          name="password"
          className="form-control"
          type="password"
          value={formData.password}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="signup-form-firstName">
          First Name
        </label>
        <input
          id="signup-form-firstName"
          name="firstName"
          className="form-control"
          value={formData.firstName}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="signup-form-lastName">
          Last Name
        </label>
        <input
          id="signup-form-lastName"
          name="lastName"
          className="form-control"
          value={formData.lastName}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="signup-form-email">
          Email
        </label>
        <input
          id="signup-form-email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      {errors.length !== 0
        ? errors.map((e, idx) => <Alert key={idx} message={e} type="danger" />)
        : null}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default SignupForm;
