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
import UserIcon from "./UserIcon";
import AddProduct from "./AddProduct";
import AddUser from "./AddUser";

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
  const handleAddProduct = async (event) => {
    dispatch(adminReduce.clearState());
    setDisplay("addproduct");
  };
  const handleAddUser = async (event) => {
    dispatch(adminReduce.clearState());
    setDisplay("adduser");
  };

  return (
    <div className="allproducts-container">
      <div id="left">
        <div id="left-top">
          User
          <hr></hr>
          <button onClick={handleGetUsers}>Manage Users</button>
          <button onClick={handleAddUser}>Add Users</button>
        </div>
        <div id="left-bottom">
          Product Management
          <hr></hr>
          <button onClick={handleGetProducts}>Manage Products</button>
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>
      <div id="right">
        {display !== "none" ? (
          display === "products" ? (
            products.map((product) => {
              return <ItemIcon key={product.id} product={product} />;
            })
          ) : display === "users" ? (
            users.map((user) => {
              return <UserIcon key={user.id} user={user} />;
            })
          ) : display === "adduser" ? (
            <AddUser />
          ) : (
            <AddProduct />
          )
        ) : null}
      </div>
    </div>
  );
}
