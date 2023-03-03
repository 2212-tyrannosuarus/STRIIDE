import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../reducers/adminPageSlice";
import { selectOneAdminUser } from "../../reducers/adminPageSlice";
import "./Test.css";
import { Button } from "@material-ui/core";

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
    <div className="test-form-container">
      <form className="test-form" onSubmit={handleUpdate}>
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
          <option value="guess">Guess</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <Button type="submit">Submit</Button>
        <br />
      </form>
    </div>
  );
}
