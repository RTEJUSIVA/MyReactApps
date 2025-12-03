import React from "react";
import ProductDetails from "./ProductDetails";

const ProductItem = ({ product }) => {
  //console.log(props);

  //   let { product } = props;

  //   console.log(product);

  return (
    <div>
      <h1>Displaying Product Items</h1>
      <section>
        <h3>Product Name: {product.name}</h3>
        <p>Product Price: {product.price}</p>
        <p>Product Description: {product.description}</p>
      </section>
      <ProductDetails
        deepName={product.name} 
        deepPrice={product.price}
        deepDescription={product.description}
      />
    </div>
  );
};

export default ProductItem;
