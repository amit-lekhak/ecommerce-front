import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getItems } from "./cartHelpers";
import Layout from "./Layout";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run,setRun] = useState(false);

  useEffect(() => {
    setItems(getItems());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {items.length} items</h2>
        <hr />
        {items.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              showAddToCartButton={false}
              showUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          );
        })}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Your cart is empty.
        <br />
        <Link to="/shop">Continue Shopping</Link>
      </h2>
    );
  };

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add, remove, checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
        <h2 className="mb-4">Your cart summary</h2>
        <hr />
        <Checkout products={items} run={run} setRun={setRun} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
