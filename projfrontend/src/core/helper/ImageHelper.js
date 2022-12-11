import React from "react";

const ImageHelper = ({ product }) => {
  // Using Props
  // const imageurl = product ? product.image : `https://assets.zeezest.com/users/PROD_5_1643795560889.jpg`;
  const imageurl = product
    ? product.image
      ? product.image
      : `https://assets.zeezest.com/users/PROD_5_1643795560889.jpg`
    : `https://assets.zeezest.com/users/PROD_5_1643795560889.jpg`;
  // const imageurl = "https://assets.zeezest.com/users/PROD_5_1643795560889.jpg";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="m-3 rounded"
        alt="Image1"
      />
    </div>
  );
};

export default ImageHelper;
