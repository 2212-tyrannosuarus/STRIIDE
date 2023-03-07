import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllProductsPage from "./components/AllProductsPage";
import { singleProductPage } from "./components/SingleProductPage";
import ShoppingCart from "./components/ShoppingCart";
import AdminDashBoardPage from "./components/AdminDashboard";
import Checkout from "./components/Checkout";
import { me } from "./store";
import OrderConfirmation from "./components/Checkout/OrderConfirmation";
import OrderHistory from "./components/OrderHistory";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CheckoutTunnel from "./components/CheckoutTunnel";
import StripeIntegration from "./components/StripeIntegration";
import PageNotFound from "./components/PageNotFound/PageNotFound";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    function PrivateRoute({ children, ...rest }) {
      return (
        <Route
          {...rest}
          render={({ location }) =>
            isAdmin && isLoggedIn ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            )
          }
        />
      );
    }

    return (
      <div>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/men" component={AllProductsPage} />
          <Route path="/men/page/:pagenumber" component={AllProductsPage} />
          <Route exact path="/women" component={AllProductsPage} />
          <Route path="/women/page/:pagenumber" component={AllProductsPage} />
          <Route path="/checkout" component={StripeIntegration} />
          <Route path="/singleproduct/:id" component={singleProductPage} />
          <Route path="/shoppingcart" component={ShoppingCart} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
          <Route path="/orderhistory" component={OrderHistory} />
          <Route path="/checkoutTunnel" component={CheckoutTunnel} />
          <Route path="/404" component={PageNotFound} />

          <PrivateRoute exact path="/adminpage">
            <AdminDashBoardPage />
          </PrivateRoute>
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
          <Route exact path="/adminpage/sales" component={AdminDashBoardPage} />
          <Route
            exact
            path="/adminpage/inventory"
            component={AdminDashBoardPage}
          />
          <Route
            exact
            path="/adminpage/inventory/editinv/:id"
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

          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={RegisterForm} />

          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.status === "admin",
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
