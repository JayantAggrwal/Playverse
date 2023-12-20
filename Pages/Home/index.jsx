import React from "react";

import "./Home.css";

import {
  PageContainer,
  SectionContainer,
  PrimaryCarousel,
  SecondaryCarousel,
} from "../../Component";

import { useData } from "../../Context/DataContext";
import { Link } from "react-router-dom";

function Home() {
  const { state } = useData();

  const fameList = [...state.productList].sort((a, b) => {
    return b.downloads - a.downloads;
  });

  const limitFameList = fameList.splice(0, 7);

  return (
    <PageContainer>
      <SectionContainer className="trending_section">
        <h2 className="section_head trending_head">#TRENDING</h2>
        <PrimaryCarousel carouselData={state.productList} />
      </SectionContainer>
      <SectionContainer className="category_section">
        <h2 className="section_head category_head">#BROWSE BY CATEGORY</h2>
        <SecondaryCarousel carouselData={state.categoryList} />
      </SectionContainer>
      <SectionContainer className="fame_section">
        <h2 className="section_head fame_head">#WALL OF FAME</h2>
        <div className="fame_body">
          {limitFameList.map((current, index) => {
            return (
              <Link
                key={current._id}
                className={`fame_item fame_item_${index}`}
                to={`/productList/${current._id}`}
              >
                <img src={current.thumbnail} alt="game_img" />
              </Link>
            );
          })}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default Home;
