import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectError,
  selectErrorType,
} from "../../reducers/adminPageSlice";
import "./Test.css";
import Button from "@material-ui/core/Button";
import { showNotification } from "../../reducers/notificationSlice";
import { Notification } from "../Notification";

export default function Test() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0.0);
  const [product_category, setProduct_category] = useState("Lifestyle");
  const [color_category, setColor_category] = useState("Black");
  const [gender, setGender] = useState("Women");
  let notification = useSelector((state) => state.notification.notification);

  //Client-side check for valid inputs
  const handleSubmit = async (event) => {
    event.preventDefault();
    let intPrice = parseInt(price);
    if (
      name === "" ||
      description === "" ||
      image === "" ||
      price === "" ||
      product_category === "" ||
      color_category === "" ||
      gender === ""
    ) {
      dispatch(
        showNotification({
          open: true,
          message: "Please fill in all form fields",
          type: "error",
        })
      );
      return;
    } else {
      await dispatch(
        createProduct({
          name,
          description,
          image,
          price,
          product_category,
          color_category,
          gender,
        })
      );
      dispatch(
        showNotification({
          open: true,
          message: "Product Added Successfully",
          type: "success",
        })
      );
    }
  };

  return (
    <div className="adduser-container-div">
      {" "}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <div className="test-form-container">
        <form className="test-form" onSubmit={handleSubmit}>
          <input
            required
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            required
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
            <option value="Lifestyle">Lifestyle</option>
            <option value="Running">Running</option>
            <option value="Training">Training</option>
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
      </div>
    </div>
  );
}
