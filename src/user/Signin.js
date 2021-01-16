import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticateStore, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "amit@gmail.com",
    password: "111111",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, error, loading, redirectToReferer } = values;
  const { user } = isAuthenticated();

  const onChangeHandler = (type) => (event) => {
    setValues({ ...values, [type]: event.target.value, error: "" });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticateStore(data, () => {
          setValues({
            ...values,
            redirectToReferer: true,
          });
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

  const showLoading = loading && (
    <div className="alert alert-info">
      <h2>Loading...</h2>
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (user) {
      return <Redirect to="/" />;
    }
  };

  const signinForm = (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          value={email}
          onChange={onChangeHandler("email")}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          value={password}
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
      title="Signin Page"
      description="Signin to React Node e-commerce App"
      className="conatiner col-md-8 offset-md-2 mb-3"
    >
      {showError}
      {showLoading}
      {signinForm}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
