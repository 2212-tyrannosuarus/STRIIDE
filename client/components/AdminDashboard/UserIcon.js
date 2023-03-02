import React from "react";
export default function UserIcon(props) {
  const { user } = props;

  return (
    <div>
      <div id="top">
        {/* <img src={product.image} width="100" height="100"></img> */}
      </div>
      <div id="bottom">
        <h2>
          {user.firstname} {user.lastname}
        </h2>
      </div>
    </div>
  );
}
