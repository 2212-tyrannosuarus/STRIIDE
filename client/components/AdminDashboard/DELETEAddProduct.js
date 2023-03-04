import { assert } from "chai";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../reducers/adminPageSlice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0.0);
  const [product_category, setProduct_category] = useState("Grocery");
  const [color_category, setColor_category] = useState("Black");
  const [gender, setGender] = useState("Women");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let intPrice = parseInt(price);
    await dispatch(
      createProduct({
        name,
        description,
        image,
        price: intPrice,
        product_category,
        color_category,
        gender,
      })
    );
  };

  return (
    <nav className="applicationnavBar">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name: </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="image">Image: </label>
        <input
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="price">Price: </label>
        <input
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="product_category">Category: </label>
        <select
          id="product_category"
          name="product_category"
          onChange={(e) => setProduct_category(e.target.value)}
        >
          <option value="Grocery">Grocery</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Electronics">Electronics</option>
        </select>
        <label htmlFor="color_category">Color: </label>
        <select
          id="color_category"
          name="color_category"
          onChange={(e) => setColor_category(e.target.value)}
        >
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
        </select>
        <label htmlFor="gender">Gender: </label>
        <select
          id="gender"
          name="gender"
          onClick={(e) => setGender(e.target.value)}
        >
          <option value="Women">Female</option>
          <option value="Men">Male</option>
        </select>
        <button type="submit">Submit</button>
        {/* <p>{error}</p> */}
      </form>
    </nav>
  );
}
