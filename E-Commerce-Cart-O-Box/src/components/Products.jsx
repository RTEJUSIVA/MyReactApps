import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Mosaic } from "react-loading-indicators";

const Products = () => {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/products", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Search Proper Data");
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <div>
        <Mosaic color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  } else {
    return (
      <>
        {products.length !== 0 && (
          <div className="container-fluid">
            <div className="row">
              {products.map((product) => {
                return (
                  <Card
                    key={product.id}
                    style={{ flex: "0 0 24%", maxWidth: "24%", margin: "0.5%" }}
                    className="product"
                  >
                    <center>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{ width: "9rem", height: "12rem" }}
                      />
                    </center>
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text
                        style={{ overflow: "scroll", height: "200px" }}
                      >
                        {product.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Footer>
                    <Button variant="primary">Click for Details</Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
      </>
    );
  }
};

export default Products;
