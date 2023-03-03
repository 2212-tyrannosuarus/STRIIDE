import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import HomePage from "./components/HomePage";
import AllProductsPage from "./components/AllProductsPage";
import SingleProductPage, {
  singleProductPage,
} from "./components/SingleProductPage";
import ShoppingCart from "./components/ShoppingCart";
import AdminDashBoardPage from "./components/AdminDashboard";
import Checkout from "./components/Checkout";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/home" component={HomePage} />
          {/* <Redirect to="/home" /> */}
          <Route path="/men" component={AllProductsPage} />
          <Route path="/men/page/:pagenumber" component={AllProductsPage} />
          <Route exact path="/women" component={AllProductsPage} />
          <Route path="/women/page/:pagenumber" component={AllProductsPage} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/singleproduct/:id" component={singleProductPage} />
          <Route path="/shoppingcart" component={ShoppingCart} />
          <Route exact path="/adminpage" component={AdminDashBoardPage} />
          <Route exact path="/adminpage/users" component={AdminDashBoardPage} />
          <Route
            exact
            path="/adminpage/addusers"
            component={AdminDashBoardPage}
          />
          <Route
            exact
            path="/adminpage/addproducts"
            component={AdminDashBoardPage}
          />
          <Route
            exact
            path="/adminpage/products"
            component={AdminDashBoardPage}
          />
          <Route
            path="/adminpage/manage_products/:id"
            component={AdminDashBoardPage}
          />
          <Route
            path="/adminpage/manage_users/:id"
            component={AdminDashBoardPage}
          />

          {/* <Redirect to="/allproduct" /> */}
        </Switch>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={HomePage} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
