import React from "react";
import ActionLink from "../../Action/ActionLink";

import "./EmptyCart.css";

function EmptyCart() {
  return (
    <div className="empty_cart">
      <div className="empty_cart_head">
        <h3 className="empty_cart_title">Your cart is empty!</h3>
        <p className="empty_cart_description">Add items to it now.</p>
      </div>
      <ActionLink reach="/productList">Shop for Games & Apps</ActionLink>
    </div>
  );
}

export default EmptyCart;
