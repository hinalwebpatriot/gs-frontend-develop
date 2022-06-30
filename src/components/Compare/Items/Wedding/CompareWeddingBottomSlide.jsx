import React from "react";
import CompareTableRow from "../CompareTableRow";
import capitalizeString from "../../../../utils/capitalizeString";

const CompareWeddingBottomSlide = ({ data }) => {
  const currentSize = "au";
  const {
    metal = {},
    band_width = {},
    min_ring_size = {},
    max_ring_size = {},
    ring_collection = {},
    gender = "",
    carat_weight = '',
    approx_stones,
  } = data.options;
  return (
    <div className="compare-table-col">
      <CompareTableRow bold>{metal ? metal.title : "-"}</CompareTableRow>
      <CompareTableRow bold>
        {band_width ? `${band_width.count} ${band_width.dimension}` : "-"}
      </CompareTableRow>
      <CompareTableRow bold>
        {min_ring_size && max_ring_size
          ? `${min_ring_size.title[currentSize]}-${
              max_ring_size.title[currentSize]
            }`
          : "-"}
      </CompareTableRow>
      {/*<CompareTableRow bold>GIA</CompareTableRow>*/}
      <CompareTableRow>{capitalizeString(gender) || "-"}</CompareTableRow>
      <CompareTableRow>
        {ring_collection ? ring_collection.title : "-"}
      </CompareTableRow>
      <CompareTableRow>{carat_weight || "-"}</CompareTableRow>
      <CompareTableRow>{approx_stones || "-"}</CompareTableRow>
    </div>
  );
};

export default CompareWeddingBottomSlide;
