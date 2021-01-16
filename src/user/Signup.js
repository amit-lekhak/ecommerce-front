import React, { useState } from "react";
import Layout from "../core/Layout";
import {signup} from "../auth";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const onChangeHandler = (type) => (event) => {
    setValues({ ...values, [type]: event.target.value, error: "" });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    signup({ name, email, password })
    .then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: true,
          name: "",
          email: "",
          password: "",
          error: "",
        });
      }
    });
  };


  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      You have successfully created an account. Please{" "}
      <Link to="/signin">Signin</Link>
    </div>
  );

  const signupForm = (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input value={name}
          onChange={onChangeHandler("name")}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input value={email}
          onChange={onChangeHandler("email")}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input value={password}
          onChange={onChangeHandler("password")}
          type="password"
          className="form-control"
        />
      </div>

      <button onClick={onSubmitHandler} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Signup Page"
      description="Signup to React Node e-commerce App"
      className="conatiner col-md-8 offset-md-2 mb-3"
    >
      {showError}
      {showSuccess}
      {signupForm}
    </Layout>
  );
};

export default Signup;
