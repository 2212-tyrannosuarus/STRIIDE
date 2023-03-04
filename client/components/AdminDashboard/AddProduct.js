import { assert } from "chai";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../reducers/adminPageSlice";
import "./Test.css";
import Button from "@material-ui/core/Button";

export default function Test() {
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
        price,
        //drop downs
        product_category,
        color_category,
        gender,
      })
    );
  };

  return (
    <div className="test-form-container">
      <form className="test-form" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          placeholder="Image URL"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <select
          id="product_category"
          name="product_category"
          onChange={(e) => setProduct_category(e.target.value)}
        >
          <option value="Grocery">Grocery</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Electronics">Electronics</option>
        </select>
        <br />

        <select
          id="color_category"
          name="color_category"
          onChange={(e) => setColor_category(e.target.value)}
        >
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
        </select>
        <br />
        <select
          id="gender"
          name="gender"
          onClick={(e) => setGender(e.target.value)}
        >
          <option value="Women">Female</option>
          <option value="Men">Male</option>
        </select>
        <br />
        <Button type="submit">Submit</Button>
        <br />
      </form>

      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        <div className="drop drop-5"></div>
      </div>
    </div>
  );
}
