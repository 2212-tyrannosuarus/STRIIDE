import React from "react";
import { Link } from "react-router-dom";
export default function UserIcon(props) {
  const { user } = props;

  return (
    <div className="admin-user-icon">
      <div id="top">
        {/* <img src={product.image} width="100" height="100"></img> */}
      </div>
      <div id="bottom">
        <Link to={`/adminpage/manage_users/${user.id}`}>
          <h4>
            {user.firstname} {user.lastname}
          </h4>
        </Link>
      </div>
    </div>
  );
}
