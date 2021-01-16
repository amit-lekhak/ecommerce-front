/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { read, update, updateLocalStorage } from "./apiUser";

const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  // eslint-disable-next-line
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((response) => {
      if (response.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: response.name,
          email: response.email,
        });
      }
    });
  };

  useEffect(() => {
    init(props.match.params.userId);
  }, []);

  const onChangeHandler = (type) => (event) => {
    setValues({ ...values, error: false, [type]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    update(props.match.params.userId, token, { name, email, password }).then(
      (response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          updateLocalStorage(response, () => {
            setValues({
              ...values,
              name: response.name,
              email: response.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdateForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={onChangeHandler("name")}
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={onChangeHandler("email")}
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={onChangeHandler("password")}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={onSubmitHandler} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description={`G'day ${name}. You can update your profile here`}
      className="container mb-3"
    >
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdateForm(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
