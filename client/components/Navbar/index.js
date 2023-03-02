import { Badge, IconButton, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, ShoppingCart } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalQuantity } from "../../reducers/shoppingCartSlice";

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: 70,
    backgroundColor: "#fff",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
  },
  wrapper: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  left: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  language: {
    fontSize: 14,
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
      fontWeight: "bold",
      bottom: "4px",
    },
    cursor: "pointer",
    marginLeft: 10,
    marginRight: 15,
    color: "#000000",
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: 20,
    padding: "5px 10px",
    marginLeft: 25,
    marginRight: 25,
  },
  searchInput: {
    marginLeft: 10,
    "&::placeholder": {
      fontStyle: "italic",
    },
  },
  center: {
    flex: 1,
    textAlign: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#000000",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuItem: {
    fontSize: 14,
    cursor: "pointer",
    marginLeft: 25,
  },
}));

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  let totalQuantity = useSelector(selectTotalQuantity);

  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/men">
            <span className={classes.language}>MEN</span>
          </Link>
          <Link to="/women">
            <span className={classes.language}>WOMEN</span>
          </Link>
        </div>
        <div className={classes.center}>
          <Link to="/home">
            <h1 className={classes.logo}>OUR NAME</h1>
          </Link>
        </div>
        <div className={classes.right}>
          <div className={classes.searchContainer}>
            <Search style={{ color: "gray", fontSize: 16 }} />
            <InputBase
              placeholder="Search"
              className={classes.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/login">
            <span className={classes.language}>SIGN IN</span>
          </Link>
          <IconButton aria-label="cart">
            <Link to="/shoppingcart">
              <Badge
                overlap="rectangular"
                badgeContent={totalQuantity}
                color="error"
              >
                <ShoppingCart style={{ color: "black" }} />
              </Badge>
            </Link>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
