import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [reload, setReload] = useState(false);
  const [products, setProduct] = useState([]);
  useEffect(() => {
    setProduct(loadCart());
  }, [reload]);
  const loadProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1>Checkout</h1>
      </div>
    );
  };

  return (
    <Base title="Cart Page">
      <div className="row text-center">
        <div className="col-6">
          <h2>Products</h2>
          {loadProducts(products)}
        </div>
        <div className="col-6">
          <h2>Checkout</h2>
          {products.length > 0 ? (
            <PaymentB products={products} setReload={setReload} />
          ) : (
            <h3>Please Login Or Add Somthing in Card</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
