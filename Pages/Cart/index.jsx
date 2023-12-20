import React from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";
import PageContainer from "../../Component/Layout/PageContainer";
import SectionContainer from "../../Component/Layout/SectionContainer";
import EmptyCart from "../../Component/Card/EmptyCart";
import CartCard from "../../Component/Card/CartCard";
import ActionButton from "../../Component/Action/ActionButton";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";

function Cart() {
  const { token } = useAuth();
  const { state } = useData();
  const navigate = useNavigate();
  console.log(state.cartList);

  const totalAmount = state.cartList.reduce((total, currentProduct) => {
    return (total += currentProduct.price * currentProduct.qty);
  }, 0);

  const discountedAmount = totalAmount - (totalAmount * 10) / 100;

  return (
    <PageContainer>
      <SectionContainer className="cart_section">
        <h1 className="cart_section_head">MY CART</h1>
        {state.cartList.length == 0 ? (
          <div>
            <EmptyCart />
          </div>
        ) : (
          <div className="cart_section_body">
            {/* CART PRICE */}
            <div className="cart_price">
              <h2 className="cart_price_title">Price Details</h2>
              <div className="cart_price_body">
                <p className="cart_price_body_item">
                  <span className="cart_price_body_item_key">Price</span>
                  <span className="cart_price_body_item_value">
                    ₹{totalAmount}
                  </span>
                </p>
                <p className="cart_price_body_item">
                  <span className="cart_price_body_item_key">Discount</span>
                  <span className="cart_price_body_item_value">
                    ₹{(totalAmount * 10) / 100}
                  </span>
                </p>
              </div>
              <div className="cart_price_footer">
                <p className="cart_price_footer_wrap">
                  <span className="cart_price_footer_key">Total Amount</span>
                  <span className="cart_price_footer_value">
                    ₹{discountedAmount}
                  </span>
                </p>
              </div>
              <div className="cart_price_action">
                <ActionButton handleClick={() => navigate("/checkout")}>
                  CHECKOUT
                </ActionButton>
              </div>
            </div>
            {/* <EmptyCart /> */}
            <div className="cart_wrap">
              <div className="cart_list">
                {state.cartList.map((currentGame) => {
                  return <CartCard {...currentGame} key={currentGame.id} />;
                })}
              </div>
            </div>
          </div>
        )}
      </SectionContainer>
    </PageContainer>
  );
}

export default Cart;
