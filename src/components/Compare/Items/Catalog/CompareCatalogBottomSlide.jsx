import React from "react";
import CompareTableRow from "../CompareTableRow";
import capitalizeString from "../../../../utils/capitalizeString";

const CompareWeddingBottomSlide = ({ data }) => {
  const currentSize = "au";
  const {
    metal = {},
    band_width = {},
    min_size = {},
    max_size = {},
    brand = {},
    gender = "",
    carat_weight = "",
    approx_stones,
  } = data.options;
  return (
    <div className="compare-table-col">
      <CompareTableRow bold>{metal ? metal.title : "-"}</CompareTableRow>
      <CompareTableRow bold>
        {band_width ? `${band_width.count} ${band_width.dimension}` : "-"}
      </CompareTableRow>
      <CompareTableRow bold>
        {min_size && max_size
          ? `${min_size.title}-${
              max_size.title
            }`
          : "-"}
      </CompareTableRow>
      {/*<CompareTableRow bold>GIA</CompareTableRow>*/}
      <CompareTableRow>{gender || "-"}</CompareTableRow>
      <CompareTableRow>
        {brand ? brand.title : "-"}
      </CompareTableRow>
      <CompareTableRow>{carat_weight || "-"}</CompareTableRow>
      <CompareTableRow>{approx_stones || "-"}</CompareTableRow>
    </div>
  );
};

export default CompareWeddingBottomSlide;
