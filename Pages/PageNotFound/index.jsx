import React from "react";
import "./PageNotFound.css";
import PageContainer from "../../Component/Layout/PageContainer";
import SectionContainer from "../../Component/Layout/SectionContainer";
import PageNotFoundImg from "../../Asset/PageNotFound/PageNotFoundImg.gif";
import ActionLink from "../../Component/Action/ActionLink";

function PageNotFound() {
  return (
    <PageContainer>
      <SectionContainer className="not_found_section">
        <img
          src={PageNotFoundImg}
          alt="page not found"
          className="not_found_img"
        />
        <ActionLink reach="/">Back to Home</ActionLink>
      </SectionContainer>
    </PageContainer>
  );
}

export default PageNotFound;
