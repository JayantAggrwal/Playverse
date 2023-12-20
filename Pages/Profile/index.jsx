import React from "react";

import "./Profile.css";
import PageContainer from "../../Component/Layout/PageContainer";
import SectionContainer from "../../Component/Layout/SectionContainer";
import Tab from "../../Component/Tab";
import { UserProfile, UserAddress, UserOrders } from "./Components";

function Profile() {
  return (
    <PageContainer>
      <SectionContainer className="profile_section">
        <h3 className="profile_head">MY ACCOUNT</h3>
        <div className="profile_body">
          <Tab
            tabList={[
              {
                name: "Profile",
                component: <UserProfile />,
                reach: "/profile/user",
              },
              {
                name: "Addresses",
                component: <UserAddress />,
                reach: "/profile/address",
              },
              {
                name: "Orders",
                component: <UserOrders />,
                reach: "/profile/orders",
              },
            ]}
          />
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default Profile;
