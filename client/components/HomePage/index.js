import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  fetchAllProducts,
} from "../../reducers/homePageSlice";

export const Home = (props) => {
  const { username } = props;
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {products && products.length
        ? products.map((product) => {
            return (
              <div key={product.id}>
                Product: {product.name} {product.description} {product.price}
              </div>
            );
          })
        : null}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
