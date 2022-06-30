import React from "react";
import { Link } from 'react-router-dom';
import routing from "../../../../config/routing";

const checkActive = (slug, category) => {
  return slug === category ? 'active' : '';
};

const FilterCategory = ({ filterCategories, catalogType, onChange }) => {
  let ctgs = filterCategories ? filterCategories.map((item, key) => {
    return (
      <Link
        to={routing(item.slug === 'rings' ? 'cluster-rings' : item.slug ).catalogFeed}
        key={key + item.slug}
        onClick={onChange}
        className={`catalog-name ${checkActive(item.slug, catalogType)}`}>
        {item.slug === 'rings' ? 'Cluster rings' : item.name}
      </Link>
    )
  }) : null;

  return <div className="change-catalog">{ctgs}</div>
}

export default FilterCategory;
