import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
// import "./LoginForm.css";

/**
 * Renders form
 *
 * Props: onSubmission - function
 *
 * State: formData - string
 *        error - Array
 *
 * Render:
 *   App -> LoginForm
 */

function LoginForm({ login }) {
  //update function name to userLogin
  console.debug("LoginForm");
  const navigate = useNavigate();
  const defaultFormData = {
    username: "",
    password: "",
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
      await login(formData);
      setFormData(defaultFormData);
      navigate("/");
    } catch (error) {
      console.log("ERROR!", error);
      setErrors(error);
    }
  }

  return (
    <form className="LoginForm container" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="login-form-username">Username</label>
        <input
          id="login-form-username"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="login-form-password">Password</label>
        <input
          id="login-form-password"
          name="password"
          className="form-control"
          type="password"
          value={formData.password}
          onChange={onChange}
        />
      </div>
      {errors.length !== 0
        ? errors.map((e, idx) => <Alert key={idx} message={e} type="danger"/>)
        : null}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default LoginForm;
