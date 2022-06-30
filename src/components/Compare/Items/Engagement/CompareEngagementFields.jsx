import React from "react";
import CompareTableHeadRow from "../CompareTableHeadRow";

const CompareRingFields = () => (
  <div className="compare-table">
    <CompareTableHeadRow
      video={{ title: "Metal", category: "engagement-rings", type: "metal" }}
      bold
    >
      Metal
    </CompareTableHeadRow>
    <CompareTableHeadRow bold>Band width</CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Ring size", category: "engagement-rings", type: "size" }}
      bold
    >
      Available ring sizes
    </CompareTableHeadRow>
    {/*<CompareTableHeadRow bold>Certification</CompareTableHeadRow>*/}
    <CompareTableHeadRow
      video={{
        title: "Stone shape",
        category: "engagement-rings",
        type: "shape"
      }}
    >
      Stone shape
    </CompareTableHeadRow>
    <CompareTableHeadRow>Stone size</CompareTableHeadRow>
    <CompareTableHeadRow>Side settings type</CompareTableHeadRow>
    <CompareTableHeadRow>Setting type</CompareTableHeadRow>
    <CompareTableHeadRow
      video={{
        title: "Collection",
        category: "engagement-rings",
        type: "collection"
      }}
    >
      Collection
    </CompareTableHeadRow>
    <CompareTableHeadRow>Approx Carat Weight</CompareTableHeadRow>
    <CompareTableHeadRow>Average Side Stone Colour</CompareTableHeadRow>
    <CompareTableHeadRow>Average Side Stone Clarity</CompareTableHeadRow>
    <CompareTableHeadRow>Approx No. of Stones</CompareTableHeadRow>
  </div>
);

export default CompareRingFields;
