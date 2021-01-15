/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DropIn from "braintree-web-drop-in-react";
import {
  createOrder,
  getBraintreeClientToken,
  processPayment,
} from "./apiCore";
import { removeCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    error: "",
    clientToken: null,
    instance: {},
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({ ...data, clientToken: response.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const pay = () => {
    setLoading(true);
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then((response) => {
        // console.log(response);
        nonce = response.nonce;
        // console.log(
        //   "send nonce and total to process",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            //create order
            //empty cart

            if (response.success) {
              const orderData = {
                products: products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
                address: data.address,
              };

              createOrder(userId, token, orderData)
                .then((res) => {
                  console.log("CO: ", res);
                  if (res.error) {
                    // setData({...data,error: res.error,success: response.success});
                    console.log("res.error", res.error);
                  }
                    removeCart(() => {
                      console.log("Success and empty cart");
                      setRun(!run);
                    });
                  
                  setData({ ...data, success: true });
                  setLoading(false);
                })
                .catch((error) => {
                  console.log("catch error", error);
                  setData({ ...data, success: true });
                  setLoading(false);
                });
            } else {
              setData({
                ...data,
                success: response.success,
                error: response.message ? response.message : "",
              });
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        // console.log("Drop in error", error);
        setData({ ...data, error: error.message });
        setLoading(false);
      });
  };

  const addressChangeHandler = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={addressChangeHandler}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              />
            </div>

            <div>
              <DropIn
                options={{
                  authorization: data.clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => (data.instance = instance)}
              />
              <button onClick={pay} className="btn btn-success btn-block">
                Pay
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment is successful.
    </div>
  );

  const showLoading = () => loading && <h2>Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal(products)}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showLoading()}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
