import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./OrderHistory.css";
import { getAllOrderSummary, selectAllOrderSummary} from "../../reducers/checkoutSlice";
import {getLoggedInUserId} from "../../reducers/shoppingCartSlice"

export const OrderHistory = (props) => {
  let orders = useSelector(selectAllOrderSummary);
  const dispatch = useDispatch();
  console.log('orders ', orders);

  useEffect(() => {
    console.log('inside useEffect')

     async function getOrderHistory () {
      const userId = await dispatch(getLoggedInUserId());
      console.log('userId ', userId);
      orders = await dispatch(getAllOrderSummary(userId.payload));
    }
    if (window.localStorage.getItem("token")) {
      getOrderHistory();
    }
    
  },[dispatch])

  

  return (
    <div className="order-history-container">
      <h2 className="order-history-h2">Your recent orders</h2>
      {orders && orders.length
        ? orders.map((order) => {
            return (<div className="order-summary" key={order.id}>
              <p key={order.id}>Order Placed On: {order.orderDate}</p>
              <p key={order.id}>Order Total Price: {order.total_price}</p>
                {order["orderdetails"] && order["orderdetails"].length ? (
                    order["orderdetails"].map((orderDetail) => {
                        return (
                            <div className="order-detail" key={ order["orderdetails"].id}>

                              <div className="order-history-left-col">
                              <img src={orderDetail.image} width="150px"/>
                              </div>

                              <div className="order-history-right-col">
                              <h3>{orderDetail.name}</h3>
                              <p>{orderDetail.color}</p>
                              <p>{orderDetail.size}</p>
                              <p>Qty: {orderDetail.quantity}</p>
                              <p>${orderDetail.historic_price.toFixed(2)}</p>
                              
                              </div >
                              
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
