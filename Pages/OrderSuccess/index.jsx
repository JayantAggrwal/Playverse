import React, { useEffect } from "react";
import Lottie from "lottie-react";

import PaymentDone from "../../Asset/Lottie/PaymentDone.json";
import LoaderLottie from "../../Asset/Lottie/Loader.json";
import "./OrderSuccess.css";

import { PageContainer, SectionContainer } from "../../Component";

function OrderSuccess() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <PageContainer>
      <SectionContainer className="order_success_section">
        <h3 className="order_success_head">ORDER PLACED</h3>
        <div className="order_success_body">
          <Lottie
            animationData={PaymentDone}
            loop={true}
            style={{ width: "200px" }}
          />
          <p className="order_success_text">Your payment is complete</p>
          <p className="order_success_text">Sending you to Order Details</p>
          <Lottie
            animationData={LoaderLottie}
            loop={true}
            style={{ width: "150px" }}
            className="DNF_card_lottie"
          />
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default OrderSuccess;
