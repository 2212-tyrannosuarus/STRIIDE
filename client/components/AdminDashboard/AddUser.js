import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddUser() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [status, setStatus] = useState("");

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
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="firstname">First Name: </label>
        <input
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastname">Last Name: </label>
        <input
          name="lastname"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phone_number">Phone #: </label>
        <input
          name="phone_number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <label htmlFor="status">Admin Status: </label>
        <input
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit">Submit</button>
        {/* <p>{error}</p> */}
      </form>
    </nav>
  );
}
