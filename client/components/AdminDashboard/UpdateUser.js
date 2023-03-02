import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../reducers/adminPageSlice";
import { selectOneAdminUser } from "../../reducers/adminPageSlice";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(selectOneAdminUser);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [status, setStatus] = useState("guess");

  useEffect(() => {
    setUserName(user.username || "");
    setPassword(user.password || "");
    setFirstName(user.firstname || "");
    setLastName(user.lastname || "");
    setEmail(user.email || "");
    setPhone_number(user.phone_number || "");
    setStatus(user.status || "guess");
  }, [user]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(
      updateUser({
        id: id,
        body: {
          username,
          password,
          firstname,
          lastname,
          email,
          phone_number,
          status,
        },
      })
    );
  };

  return (
    <nav className="applicationnavBar">
      <h1>Update User #{user.id} </h1>
      <form onSubmit={handleUpdate}>
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
        <select
          id="status"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="guess">Guess</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update</button>
        {/* <p>{error}</p> */}
      </form>
    </nav>
  );
}
