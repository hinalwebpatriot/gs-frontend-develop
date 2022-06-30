import React from "react";

const DiamondsListHeader = ({ filterKeys, headerRef }) => (
  <div
    className="list-title-block"
    ref={headerRef}
    style={{ height: "36px", margin: 0 }}
  >
    <div className="list-img" />
    <div className="list-left-group">
      <p className="list-col">Shape</p>
      <p className="list-col list-col--center">Carat</p>
      <p className="list-col list-col--center">Color</p>
      <p className="list-col list-col--center">Clarity</p>
      <p className="list-col list-col--center">Cut</p>
      {filterKeys.includes("polish") && (
        <p className="list-col list-col--center">Polish</p>
      )}
      {filterKeys.includes("symmetry") && (
        <p className="list-col list-col--center">Symmetry</p>
      )}
      {filterKeys.includes("fluorescence") && (
        <p className="list-col list-col--center">Fluorescence</p>
      )}
      {filterKeys.includes("table") && (
        <p className="list-col list-col--center">Table</p>
      )}
      {filterKeys.includes("depth") && (
        <p className="list-col list-col--center">Depth</p>
      )}
      {filterKeys.includes("size_ratio") && (
        <p className="list-col list-col--center list-col--wider">Dimensions</p>
      )}
      <p className="list-col list-col--center">Certificate</p>
    </div>
    <div className="list-right-group">
      <p className="list-col list-col--center">Favourites</p>
      <p className="list-col list-col--center">Compare</p>
      <p className="list-col list-col--price list-col--center">Price</p>
      <p className="list-col" />
    </div>
  </div>
);

export default DiamondsListHeader;
