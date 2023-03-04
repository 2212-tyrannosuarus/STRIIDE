import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./OrderHistory.css";
import { getAllOrderSummary, selectAllOrderSummary} from "../../reducers/checkoutSlice";

export const OrderHistory = (props) => {
  const orders = useSelector(selectAllOrderSummary);
  const dispatch = useDispatch();
  console.log('orders ', orders);

  useEffect(() => {
    console.log('inside useEffect')
    dispatch(getAllOrderSummary({userId: 1}))

    // async function getProduct() {
    //   for (let i = 0; i < orders.length; i++) {
    //     for (let j = 0; j < orders[i].orderdetails.length; j++) {
    //               let productid = orders[i].orderdetails[j].productId;
    //               product = await dispatch(getProduct(productid));
    //               console.log('product ', product);
    //               orders[i].orderdetails[j].imageUrl = product.image;
    //               orders[i].orderdetails[j].name = product.name;
    //               console.log('orders[i].orderdetails[j] ', orders[i].orderdetails[j]);
    //           }
    //         }
    // }
    // getProduct();
    
  },[dispatch])

  return (
    <div className="order-history-container">
      <h3>Your recent orders</h3>
      {orders && orders.length
        ? orders.map((order) => {
            return (<div className="order-summary" key={orders.id}>
              <p key={order.id}>{order.total_price}</p>
                {order["orderdetails"] && order["orderdetails"].length ? (
                    order["orderdetails"].map((orderDetail) => {
                        return (
                            <div className="order-detail" key={ order["orderdetails"].id}>
                              <p>{orderDetail.quantity}</p>
                              <p>{orderDetail.color}</p>
                              <p>{orderDetail.size}</p>
                              <p>{orderDetail.historic_price}</p>
                              <img src={orderDetail.image} width="100px"/>
                              <p>{orderDetail.name}</p>
                            </div>
                        )
                    })
                ): null}
            </div>);
          })
        : "No recent orders"}
    </div>
  );
};

export default OrderHistory;
