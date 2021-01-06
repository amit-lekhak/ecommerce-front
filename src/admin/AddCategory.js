import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const onChangeHandler = (event) => {
    setError(false);
    setName(event.target.value);
    setSuccess(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    //add api request
    console.log(user._id,token,name);
    createCategory(user._id, token, name).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
      }
    });
  };

  const categoryForm = (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={onChangeHandler}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} created successfully</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}!, ready to create a new category?`}
    >
      <div className="col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {categoryForm}
        {goBack()}
      </div>
    </Layout>
  );
};

export default AddCategory;
