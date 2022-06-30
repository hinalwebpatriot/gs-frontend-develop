import React from "react";
import { connect } from "react-redux";
import { metaTagsSelector } from "../../_selectors/metaTagsSelectors";
// import withFetch from "../../_common/HOC/WithFetch";
// import api from "../../../config/api";
import ProductCategoriesBlock from "./Items/ProductCategoriesBlock";

const AllProductsCategories = ({ data, status, meta }) => {
  if (status !== "success") {
    return null;
  }

  let adapter = {};

  try {
    adapter = {
      data: data,
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

  return <ProductCategoriesBlock {...adapter} title={meta.h1} />;
};

const mapStateToProps = state => {
  return {
    meta: metaTagsSelector(state, 'index'),
    ...state.main.allProductCategories
  }
}

export default connect(mapStateToProps)(AllProductsCategories)

// export default withFetch(api.main.comingSoonCategories)(AllProductsCategories);
