import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchSingleUser,
  selectOneAdminUser,
} from "../../reducers/adminPageSlice";
import UpdateUser from "./UpdateUser";

export default function ManageUser(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectOneAdminUser);
  useEffect(() => {
    let string = window.location.pathname;
    string = string.slice(0, 22);
    if (string === "/adminpage/manage_user") {
      dispatch(fetchSingleUser(id));
    }
  }, [window.location.pathname]);

  return (
    <div>
      <div>Manage User # {id} [to be deleted]</div>
      <div>
        <p>{user.username}</p>
        <p>{user.password}</p>
        <p>{user.firstname}</p>
        <p>{user.lastname}</p>
        <p>{user.email}</p>
        <p>{user.phone_number}</p>
        <p>{user.status}</p>
      </div>
      <div>
        <UpdateUser />
      </div>
    </div>
  );
}
