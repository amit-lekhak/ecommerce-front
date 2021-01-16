import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { deleteProduct, getProducts } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const {user,token} = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setProducts(response);
      }
    });
  };

  const destroyProduct = (productId) => {
      deleteProduct(user._id,token,productId)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          loadProducts();
        }
      });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on Products"
      className="container-fluid"
    >
      <div className="row">
          <div className="col-12">
          <h2 className="text-center">
              Total {products.length} products
          </h2>
          <hr />
              <ul className="list-group">
                  {products.map((product,index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>{product.name}</strong>
                      <Link to={`/admin/product/update/${product._id}`} >
                          <span className="badge badge-warning badge-pill">Update</span>
                      </Link>

                      <span onClick={() => destroyProduct(product._id)} className="badge badge-danger badge-pill">
                          Delete
                      </span>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
