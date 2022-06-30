import React from "react";
import CompareTableRow from "../CompareTableRow";

const CompareEngagementBottomSlide = ({ data }) => {
  const currentSize = "au";
  const {
    metal = {},
    band_width = {},
    min_ring_size = {},
    max_ring_size = {},
    ring_collection = {},
    stone_shape = {},
    stone_size = {},
    side_setting_type = "",
    setting_type = "",
    carat_weight = '',
    average_ss_colour = '',
    average_ss_clarity = '',
    approx_stones = ''
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
      <CompareTableRow>{stone_shape ? stone_shape.title : "-"}</CompareTableRow>
      <CompareTableRow>
        {stone_size ? `${stone_size.count} ${stone_size.dimension}` : "-"}
      </CompareTableRow>
      <CompareTableRow>{side_setting_type || "-"} </CompareTableRow>
      <CompareTableRow>{setting_type || "-"}</CompareTableRow>
      <CompareTableRow>
        {ring_collection ? ring_collection.title : "-"}
      </CompareTableRow>
      <CompareTableRow>{carat_weight || "-"}</CompareTableRow>
      <CompareTableRow>{average_ss_colour || "-"}</CompareTableRow>
      <CompareTableRow>{average_ss_clarity || "-"}</CompareTableRow>
      <CompareTableRow>{approx_stones || "-"}</CompareTableRow>
    </div>
  );
};

export default CompareEngagementBottomSlide;
