import "./AdminDashBoardPage.css";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchAdminAllProducts,
  fetchAdminAllUsers,
  selectAllAdminProducts,
  selectAllAdminUsers,
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
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import AddProduct from "./AddProduct";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import InventoryTable from "./InventoryTable";
import ProductIconInv from "./ProductIconInv";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function AdminDashBoardPage(props) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("none");
  const products = useSelector(selectAllAdminProducts);
  const users = useSelector(selectAllAdminUsers);

  const classes = useStyles();
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);

  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };
  const handleClickUser = () => {
    setOpenUser(!openUser);
  };

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
  const handleInventory = async (event) => {
    dispatch(adminReduce.clearState());
    await dispatch(fetchAdminAllProducts());
    setDisplay("inventory");
  };

  return (
    <div className="adminpage-container">
      <div className="adminpage-left">
        <div id="left-top">
          <hr></hr>
          <Button onClick={handleGetUsers}>
            <PersonIcon />
            <Link to="/adminpage/users">Manage Users</Link>
          </Button>
          <Button onClick={handleAddUser}>
            <PersonAddIcon />
            <Link to="/adminpage/addusers">Add Users</Link>
          </Button>
        </div>
        <div id="left-bottom">
          <hr></hr>
          <Button onClick={handleGetProducts}>
            <InboxIcon />
            <Link to="/adminpage/products">Manage Products</Link>
          </Button>
          <Button onClick={handleAddProduct}>
            <AddIcon />
            <Link to="/adminpage/addproducts">Add Products</Link>
          </Button>
        </div>
        <div id="left-bottomb">
          <hr></hr>
          <Button onClick={handleGetUsers}>
            <AttachMoneyIcon />
            <Link to="/adminpage/users">Manage Sales</Link>
          </Button>
          <Button onClick={handleInventory}>
            <ShowChartIcon />
            <Link to="/adminpage/addusers">Manage Inventories</Link>
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
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {/* {placeholder for text} */}
                </ListSubheader>
              }
              className={classes.root}
            >
              <ListItem button onClick={handleClickAdmin}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Management" />
                {openAdmin ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {users.map((user) => {
                    if (user.status === "admin") {
                      let fullname = user.firstname + " " + user.lastname;
                      return (
                        <ListItem
                          key={user.id}
                          button
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <Link
                            to={`/adminpage/manage_users/${user.id}`}
                            onClick={() => setDisplay("manageuser")}
                          >
                            <ListItemText primary={fullname} />
                          </Link>
                        </ListItem>
                      );
                    }
                  })}
                </List>
              </Collapse>
              <ListItem button onClick={handleClickUser}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
                {openUser ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openUser} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {users.map((user) => {
                    if (user.status === "guest") {
                      let fullname = user.firstname + " " + user.lastname;
                      return (
                        <ListItem
                          key={user.id}
                          button
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <Link
                            to={`/adminpage/manage_users/${user.id}`}
                            onClick={() => setDisplay("manageuser")}
                          >
                            <ListItemText primary={fullname} />
                          </Link>
                        </ListItem>
                      );
                    }
                  })}
                </List>
              </Collapse>
            </List>
          ) : display === "adduser" ? (
            <AddUser />
          ) : display === "manageproduct" ? (
            <ManageProduct />
          ) : display === "manageuser" ? (
            <ManageUser />
          ) : display === "manageinv" ? (
            <InventoryTable />
          ) : display === "inventory" ? (
            products.map((product) => {
              return (
                <ProductIconInv
                  key={product.id}
                  product={product}
                  setDisplay={setDisplay}
                />
              );
            })
          ) : (
            <AddProduct />
          )
        ) : null}
      </div>
    </div>
  );
}
