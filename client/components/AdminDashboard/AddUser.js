import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  selectError,
  selectErrorType,
} from "../../reducers/adminPageSlice";
import "./Test.css";
import { Button } from "@material-ui/core";
import { showNotification } from "../../reducers/notificationSlice";
import { Notification } from "../Notification";

export default function AddUser() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [status, setStatus] = useState("guest");
  let notification = useSelector((state) => state.notification.notification);

  //Client-side check for valid inputs
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      username === "" ||
      password === "" ||
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      phone_number === "" ||
      status === ""
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
      if (!email.includes(".")) {
        dispatch(
          showNotification({
            open: true,
            message: "Invalid Email! (Example: abc@gmail.com)",
            type: "error",
          })
        );
      } else {
        await dispatch(
          createUser({
            username,
            password,
            firstname,
            lastname,
            email,
            phone_number,
            status,
          })
        );
        dispatch(
          showNotification({
            open: true,
            message: "User Added Successfully",
            type: "success",
          })
        );
      }
    }
  };

  return (
    <div className="adduser-container-div">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <div className="test-form-container">
        <form className="test-form" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <input
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="Phone Number"
            name="phone_number"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
          />
          <br />
          <select
            id="status"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <Button type="submit">Submit</Button>
          <br />
        </form>
      </div>
    </div>
  );
}
