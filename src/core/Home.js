import React, { useEffect, useState } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";
import Search from "./Search";

const Home = (props) => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const loadProductsBySold = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySold();
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="React Node e-commerce App"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, index) => (
          <div key={index} className="col-lg-3 col-sm-12 col-md-6 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySold.map((product, index) => (
          <div key={index} className="col-lg-3 col-sm-12 col-md-4 mb-3">
            <Card product={product} />
          </div>        ))}
      </div>
    </Layout>
  );
};

export default Home;
