import React from "react";
import ReviewCategoryBlock from "./ReviewCategoryBlock";
import ReviewWrapperContainer from "../Shared/ReviewWrapperContainer";

const ReviewCategoryContainer = ({ type }) => {
  return (
    <ReviewWrapperContainer type={`${type}-category`}>
      <ReviewCategoryBlock />
    </ReviewWrapperContainer>
  );
};

export default ReviewCategoryContainer;
