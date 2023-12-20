import React from "react";

import "./UserOrders.css";
import { useData } from "../../../../Context/DataContext";
import { ActionLink, OrderCard } from "../../../../Component";
import EmptyOrder from "../../../../Asset/Order/EmptyOrder.svg";

function UserOrders() {
  const { state } = useData();

  return (
    <div className="orders">
      {state.orderList.length === 0 && (
        <div className="orders_empty">
          <p className="orders_empty_text">
            Looks like you haven't placed an order
          </p>
          <span className="order_empty_label">ORDER NOW!</span>
          <img src={EmptyOrder} alt="empty_order" />
          <ActionLink className="orders_btn" reach="/productList">
            Explore
          </ActionLink>
        </div>
      )}
      {state.orderList.length > 0 &&
        state.orderList.map((current) => {
          return <OrderCard {...current} key={current.id} />;
        })}
    </div>
  );
}

export default UserOrders;
