import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./OrderHistory.css";
import { selectAllOrderSummary } from "../../reducers/checkoutSlice";

export const OrderHistory = (props) => {
  const orders = useSelector(selectAllOrderSummary);

  return (
    <div className="order-history-container">
      <h3>Your recent orders</h3>
      {orders && orders.length
        ? orders.map((order) => {
            return <div className="order-summary">
                {order && order.length ? (
                    order.map((orderDetail) => {
                        return (
                            <div className="order-detail">

                            </div>
                        )
                    })
                ): null}
            </div>;
          })
        : "No recent orders"}
    </div>
  );
};

export default OrderHistory;
