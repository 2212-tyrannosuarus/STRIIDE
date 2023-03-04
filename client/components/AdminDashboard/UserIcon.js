import React from "react";
import { Link } from "react-router-dom";
export default function UserIcon(props) {
  const { user, setDisplay } = props;

  return (
    <div className="admin-user-icon">
      <div id="bottom">
        <Link
          to={`/adminpage/manage_users/${user.id}`}
          onClick={() => setDisplay("manageuser")}
        >
          <h6>
            {user.firstname} {user.lastname}
          </h6>
        </Link>
      </div>
    </div>
  );
}
