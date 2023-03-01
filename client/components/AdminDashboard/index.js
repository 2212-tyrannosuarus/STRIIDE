import "./AdminDashBoardPage.css";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchAdminAllProducts,
  fetchAdminAllUsers,
  selectAllAdminProducts,
  selectAllAdminUsers,
  selectOneAdminProduct,
  selectOneAdminUser,
  adminReduce,
} from "../../reducers/adminPageSlice";
import ItemIcon from "../AllProductsPage/ItemIcon";

export default function AdminDashBoardPage(props) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("none");
  const products = useSelector(selectAllAdminProducts);
  const users = useSelector(selectAllAdminUsers);

  const handleGetProducts = async (event) => {
    dispatch(adminReduce.clearState());
    await dispatch(fetchAdminAllProducts());
    setDisplay("products");
  };
  const handleGetUsers = async (event) => {
    dispatch(adminReduce.clearState());
    await dispatch(fetchAdminAllUsers());
    setDisplay("users");
  };
  const handleGetProduct = async (event) => {
    dispatch(adminReduce.clearState());
  };
  const handleGetUser = async (event) => {
    dispatch(adminReduce.clearState());
  };

  return (
    <div className="allproducts-container">
      <div id="left">
        <div id="left-top">
          User
          <hr></hr>
          <button onClick={handleGetUsers}>Manage Users</button>
          <button>Add Users</button>
        </div>
        <div id="left-bottom">
          Product Management
          <hr></hr>
          <button onClick={handleGetProducts}>Manage Products</button>
          <button>Add Product</button>
        </div>
      </div>
      <div id="right">
        {display !== "none"
          ? display === "products"
            ? products.map((product) => {
                return <ItemIcon key={product.id} product={product} />;
              })
            : users.map((user) => {
                return <div key={user.id}>{user.name}</div>;
              })
          : null}
      </div>
    </div>
  );
}
