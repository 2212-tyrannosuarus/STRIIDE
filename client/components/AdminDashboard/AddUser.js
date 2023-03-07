import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../reducers/adminPageSlice";
import "./Test.css";
import { Button } from "@material-ui/core";

export default function AddUser() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [status, setStatus] = useState("guest");

  const handleSubmit = async (event) => {
    event.preventDefault();
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
  };

  return (
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
  );
}
