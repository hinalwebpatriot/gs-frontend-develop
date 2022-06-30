import React from "react";
import { connect } from "react-redux";
import { metaTagsSelector } from "../../_selectors/metaTagsSelectors";
import createMetaSlug from "../../../utils/createMetaSlug";

const MetaH1 = ({ meta, className, pageNumber }) => {
  return (
    <>
      {meta && (
        <div className="d-flex justify-content-between align-items-center">
          <h1 style={{'textTransform': 'capitalize'}} className={className}>{meta.h1}</h1>
          {pageNumber && <small className="meta-pagenumber">Page {pageNumber}</small>}
        </div>
      ) }
    </>
  )
};

const mapStateToProps = (state, props) => {
  const { slug, page, params, type, match } = props;
  
  let metaSlug = slug.toLowerCase();
  
  if (!slug) {
    metaSlug = createMetaSlug(page, params);
  }
  if (type === 'product') {
    let { catalog, filter } = match.params;
    if (catalog === 'cluster-rings') {
      catalog = 'rings'
    }
    metaSlug = `jewellery-${catalog}`;
    if (filter) {
      metaSlug = `jewellery-${catalog}-${filter}`;
    }
  }

  return {
    meta: metaTagsSelector(state, metaSlug),
    className: props.className
  };
};

export default connect(mapStateToProps)(MetaH1);
