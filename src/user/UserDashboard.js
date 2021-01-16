/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setHistory(response);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, hIndex) => {
              return (
                <div key={hIndex}>
                  <hr />
                  {h.products.map((product, pIndex) => {
                    return (
                      <div key={pIndex}>
                        <h6>Product name: {product.name}</h6>
                        <h6>Product price: ${product.price}</h6>
                        <h6>
                          Purchased date: {moment(product.createdAt).fromNow()}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-lg-4 col-md-5">{userLinks()}</div>

        <div className="col-lg-8 col-md-7">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
