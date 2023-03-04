import { Badge, IconButton, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, ShoppingCart } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectTotalQuantity } from "../../reducers/shoppingCartSlice";
import { connect } from "react-redux";
import { logout } from "../../store";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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

const UserMenu = (props) => {
  const { user, handleLogout } = props;
  const navigate = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdminPanel = () => {
    navigate.push("/adminpage");
  };

  const classes = useStyles();

  return (
    <div>
      <span
        className={classes.language}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {`HI, ${user.firstname.toUpperCase()}`}
      </span>

      <Menu
        style={{
          top: "40px",
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.status === "admin" ? (
          <MenuItem onClick={handleAdminPanel}>Admin Panel</MenuItem>
        ) : null}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const Navbar = (props) => {
  const { user, isLoggedIn, logoutUser } = props;

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
          {isLoggedIn ? (
            <UserMenu user={user} handleLogout={logoutUser} />
          ) : (
            <Link to="/login">
              <span className={classes.language}>LOGIN</span>
            </Link>
          )}
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

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    user: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logoutUser() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
