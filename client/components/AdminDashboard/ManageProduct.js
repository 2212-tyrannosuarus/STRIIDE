import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProduct,
  selectOneAdminProduct,
} from "../../reducers/adminPageSlice";
import UpdateProduct from "./UpdateProduct";

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
    <div className="admin-management-page">
      <div className="admin-management-page-left">
        <img src={product.image} width="100%" height="150"></img>
        <h4> {product.name}</h4>
        <p>
          <em>{product.description}</em>
        </p>
        <p>
          Price: $<em>{product.price}</em>
        </p>
        <p>
          Category: <em>{product.product_category}</em>
        </p>
        <p>
          Color: <em>{product.color_category}</em>
        </p>
        <p>
          Gender: <em>{product.gender}</em>
        </p>
      </div>
      <div className="admin-management-page-right">
        <UpdateProduct />
      </div>
    </div>
  );
}
