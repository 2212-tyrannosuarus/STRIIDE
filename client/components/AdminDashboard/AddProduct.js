import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0.0);
  const [product_category, setProduct_category] = useState("");
  const [color_category, setColor_category] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // if (image === "") {
    //   await dispatcher(
    //     createThatCampusThunk({
    //       name: campusName,
    //       address: address,
    //       description: description,
    //     })
    //   );
    // } else {
    //   await dispatcher(
    //     createThatCampusThunk({
    //       name: campusName,
    //       imageUrl: image,
    //       address: address,
    //       description: description,
    //     })
    //   );
    // }
    // setCampusName("");
    // setAddress("");
    // setImage("");
    // setDescription("");
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
        <input
          name="product_category"
          value={product_category}
          onChange={(e) => setProduct_category(e.target.value)}
        />
        <label htmlFor="color_category">Color: </label>
        <input
          name="color_category"
          value={color_category}
          onChange={(e) => setColor_category(e.target.value)}
        />
        <label htmlFor="gender">Gender: </label>
        <input
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <button type="submit">Submit</button>
        {/* <p>{error}</p> */}
      </form>
    </nav>
  );
}
