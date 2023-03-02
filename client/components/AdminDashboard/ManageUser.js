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
    <div className="admin-management-page">
      <div className="admin-management-page-left">
        <p>
          Username: <em>{user.username}</em>
        </p>
        <p>
          Password: <em>{user.password}</em>
        </p>
        <p>
          First name: <em>{user.firstname}</em>
        </p>
        <p>
          Last name: <em>{user.lastname}</em>
        </p>
        <p>
          Email: <em>{user.email}</em>
        </p>
        <p>
          Phone#: <em>{user.phone_number}</em>
        </p>
        <p>
          Status: <em>{user.status}</em>
        </p>
      </div>
      <div className="admin-management-page-right">
        <UpdateUser />
      </div>
    </div>
  );
}
