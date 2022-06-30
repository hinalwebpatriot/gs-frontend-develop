import React from "react";
import CompareTableHeadRow from "../CompareTableHeadRow";

const CompareWeddingFields = () => (
  <div className="compare-table">
    <CompareTableHeadRow
      video={{ title: "Metal", category: "wedding-rings", type: "metal" }}
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
      video={{ title: "Gender", category: "engagement-rings", type: "gender" }}
    >
      Gender
    </CompareTableHeadRow>
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
    <CompareTableHeadRow>Approx No. of Stones</CompareTableHeadRow>
  </div>
);

export default CompareWeddingFields;
