import React from "react";

import "./WishList.css";
import {
  PageContainer,
  SectionContainer,
  PrimaryCard,
  EmptyWishList,
} from "../../Component";
import { useData } from "../../Context/DataContext";

function WishList() {
  const { state } = useData();

  return (
    <PageContainer>
      <SectionContainer className="wish_section">
        <h1 className="wish_head">WISH LIST ♥</h1>
        {state.wishList.length == 0 ? (
          <div>
            <EmptyWishList />
          </div>
        ) : (
          <div className="wish_body">
            {state.wishList.map((currentGame) => {
              return (
                <PrimaryCard {...currentGame} key={currentGame.id} isWishList />
              );
            })}
          </div>
        )}
      </SectionContainer>
    </PageContainer>
  );
}

export default WishList;
