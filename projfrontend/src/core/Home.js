import React, { useState, useEffect } from "react";
import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";
import "../styles.css";
import Card from "./Card";

// const cors = require('cors');
// getProducts.use(cors())

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  });

  return (
    <Base title="Home Page" description="Welcome To T'Shirt Store">
      <h1>Home Component</h1>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
