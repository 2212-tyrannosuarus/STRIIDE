import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProduct,
  selectOneAdminProduct,
} from "../../reducers/adminPageSlice";

export default function ManageProduct(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectOneAdminProduct);

  useEffect(() => {
    let string = window.location.pathname;
    string = string.slice(0, 25);
    if (string === "/adminpage/manage_product") {
      dispatch(fetchSingleProduct(id));
    }
  }, [window.location.pathname]);

  return (
    <div>
      <div>Manage Product # {id} [to be deleted]</div>
      <div>
        <img src={product.image} width="100" height="100"></img>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>{product.product_category}</p>
        <p>{product.color_category}</p>
        <p>{product.gender}</p>
      </div>
      <div>User Update</div>
    </div>
  );
}
