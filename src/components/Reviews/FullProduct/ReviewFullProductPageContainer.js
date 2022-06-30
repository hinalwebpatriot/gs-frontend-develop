import React from "react";
import ReviewFullProductPage from "./ReviewFullProductPage";
import ReviewWrapperContainer from "../Shared/ReviewWrapperContainer";

const ReviewFullProductPageContainer = ({ id, slug, type, history }) => {
  return (
    <ReviewWrapperContainer id={id} slug={slug} type={type}>
      <ReviewFullProductPage history={history} />
    </ReviewWrapperContainer>
  );
};

export default ReviewFullProductPageContainer;
