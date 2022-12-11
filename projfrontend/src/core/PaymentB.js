import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";

const PaymentB = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Navigate to="/signin" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((responce) => {
            if (responce.error) {
              if (responce.code == "1") {
                console.log("Payment Failed");
                signout(() => {
                  return <Navigate to="/" />;
                });
              }
            } else {
              setInfo({
                ...info,
                success: responce.success,
                loading: false,
              });
              console.log("Payment Success");
              let product_name = "";
              products.forEach(function (item) {
                product_name += item.name + ", ";
              });
              const orderData = {
                products: product_name,
                transaction_id: responce.transaction.id,
                amount: responce.transaction.amount,
              };
              createOrder(userId, token, orderData)
                .then((responce) => {
                  if (responce.error) {
                    if (responce.code == "1") {
                      console.log("Order Failed");
                    }
                    signout(() => {
                      return <Navigate to="/" />;
                    });
                  } else {
                    if (responce.success == true) {
                      console.log("Order Placed");
                    }
                  }
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("order failed", error);
                });
              cartEmpty(() => console.log("Card Is Emptyed OUT"));
              setReload(!reload);
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log("Nonce", e));
  };

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            {/* <DropIn
              options={{ authorisation: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn> */}
            <button onClick={onPurchase} className="btn btn-block btn-success">
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please Login First or add Somthing in Cart</h3>
        )}
      </div>
    );
  };
  return (
    <div>
      <h3>Your Amount is {getAmount()}</h3>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;
