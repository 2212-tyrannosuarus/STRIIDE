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
import { Link, useParams } from "react-router-dom";
import UserIcon from "./UserIcon";
import AddUser from "./AddUser";
import ProductIcon from "./ProductIcon";
import ManageProduct from "./ManageProduct";
import ManageUser from "./ManageUser";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddProduct from "./AddProduct";

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
    <div className="adminpage-container">
      <div className="adminpage-left">
        <div id="left-top">
          <hr></hr>
          <Button onClick={handleGetUsers}>
            <Link to="/adminpage/users">Manage Users</Link>
          </Button>
          <Button onClick={handleAddUser}>
            <Link to="/adminpage/addusers">Add Users</Link>
          </Button>
        </div>
        <div id="left-bottom">
          <hr></hr>
          <Button onClick={handleGetProducts}>
            <Link to="/adminpage/products">Manage Products</Link>
          </Button>
          <Button onClick={handleAddProduct}>
            <Link to="/adminpage/addproducts">Add Products</Link>
          </Button>
        </div>
      </div>
      <div className="adminpage-right">
        {display !== "none" ? (
          display === "products" ? (
            products.map((product) => {
              return (
                <ProductIcon
                  key={product.id}
                  product={product}
                  setDisplay={setDisplay}
                />
              );
            })
          ) : display === "users" ? (
            users.map((user) => {
              return (
                <UserIcon key={user.id} user={user} setDisplay={setDisplay} />
              );
            })
          ) : display === "adduser" ? (
            <AddUser />
          ) : display === "manageproduct" ? (
            <ManageProduct />
          ) : display === "manageuser" ? (
            <ManageUser />
          ) : (
            <AddProduct />
          )
        ) : null}
      </div>
    </div>
  );
}
