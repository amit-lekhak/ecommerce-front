/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = (props) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    photo: "",
    shipping: "",
    category: "",
    categories: [],
    error: "",
    loading: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    quantity,
    categories,
    shipping,
    category,
    error,
    loading,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  const init = (productId) => {
    getProduct(productId).then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        //populate state
        setValues({
          ...values,
          name: response.name,
          description: response.description,
          price: response.price,
          category: response.category,
          shipping: response.shipping,
          quantity: response.quantity,
          formData: new FormData(),
        });
        //load categories
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  // const fileRef = useRef();
  // const selectRef1 = useRef();
  // const selectRef2 = useRef();

  useEffect(() => {
    init(props.match.params.productId);
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (type) => (event) => {
    const value = type === "photo" ? event.target.files[0] : event.target.value;
    formData.set(type, value);
    setValues({ ...values, [type]: value, error: "", createdProduct: "" });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, createdProduct: "" });
    updateProduct(user._id, token, props.match.params.productId, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          // fileRef.current.value = "";
          // selectRef1.current.value = "Please select";
          // selectRef2.current.value = "Please select";

          setValues({
            ...values,
            loading: false,
            error: false,
            redirectToProfile: true,
            createdProduct: data.name,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            formData: new FormData(),
          });
        }
      }
    );
  };

  const productForm = (
    <form className="mb-3" onSubmit={onSubmitHandler}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            accept="image/*"
            // ref={fileRef}
            onChange={onChangeHandler("photo")}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={onChangeHandler("name")}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          value={description}
          onChange={onChangeHandler("description")}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          value={price}
          onChange={onChangeHandler("price")}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          // ref={selectRef1}
          onChange={onChangeHandler("category")}
          className="form-control"
        >
          <option>Please select</option>
          {categories &&
            categories.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          // ref={selectRef2}
          onChange={onChangeHandler("shipping")}
          className="form-control"
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={onChangeHandler("quantity")}
          className="form-control"
        />
      </div>

      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  );

  const showError = error && <div className="alert alert-danger">{error}</div>;

  const showSuccess = createdProduct && (
    <h3 className="alert alert-info">
      {createdProduct} is successfully updated
    </h3>
  );

  const showLoading = loading && (
    <div class="d-flex justify-content-center">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}!, ready to create a new product?`}
    >
      <div className="col-md-8 offset-md-2">
        {showSuccess}
        {showError}
        {showLoading}
        {productForm}
        {redirectUser()}
      </div>
    </Layout>
  );
};

export default UpdateProduct;
