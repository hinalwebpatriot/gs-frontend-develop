import React from "react";
import withFetch from "../../_common/HOC/WithFetch";
import api from "../../../config/api";
import ProductCategoriesBox from "./Items/ProductCategoriesBox";

const SuggestedProductsCategories = ({ data, status }) => {
  if (status !== "success") {
    return null;
  }

  let adapter = {};

  try {
    adapter = {
      data: data.data,
      status: status
    };
  } catch {
    adapter = {
      data: [],
      status: "failure"
    };
  }

  if (!adapter.data.length) {
    return null;
  }

  return <ProductCategoriesBox {...adapter} />;
};

export default withFetch(api.main.suggestedCategories)(
  SuggestedProductsCategories
);
