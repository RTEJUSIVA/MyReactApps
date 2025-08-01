import React, { useState } from "react";

const CreateProduct = () => {
  /* 
    {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
    */

  let [newproduct, setNewProduct] = useState({
    title: "",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  let handleChange = () => {};
  let handleAdd = () => {};

  return (
    <>
      <div className="container">
        <div className="row">
          <form onSubmit={handleAdd}>
            <div className="col-md-4 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                name="title"
                value={newproduct.title}
                label="title"
                onChange={handleChange}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Add Title"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Category
              </label>
              <input
                name="title"
                value={newproduct.title}
                label="title"
                onChange={handleChange}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Add Category"
              />
            </div>
            <div className="col-md-4 mb-3">
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Rate
                  </label>
                  <input
                    name="title"
                    value={newproduct.title}
                    label="title"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Rate"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Price
                  </label>
                  <input
                    name="title"
                    value={newproduct.title}
                    label="title"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Price"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
