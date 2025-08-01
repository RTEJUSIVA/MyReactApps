import React from "react";
import PropTypes from "prop-types";

const ProductDetails = ({ deepName, deepPrice, deepDescription }) => {
  return (
    <div>
      <section>
        <h3>{deepName}</h3>
        <h3>{deepPrice}</h3>
        <h3>{deepDescription}</h3>
      </section>
    </div>
  );
};

export default ProductDetails;

ProductDetails.PropTypes = {
  deepName: PropTypes.number.isRequired,
  deepPrice: PropTypes.number.isRequired,
  deepDescription: PropTypes.number.isRequired,
};
