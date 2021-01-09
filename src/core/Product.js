/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getRelatedList, getSingleProduct } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        getRelatedList(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productID;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card
              product={product}
              description={product.description}
              showViewProductButton={false}
            />
          )}
        </div>
        <div className="col-4">
            <h4>Related products</h4>
            {relatedProducts.map((rproducts,index) => {
               return <div className="mb-3" key={index}>
                <Card product={rproducts} />
                </div>
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
