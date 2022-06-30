import React from "react";
import CompareTableRow from "../CompareTableRow";

const CompareDiamondBottomSlide = ({ data }) => {
  const {
    shape = {},
    color = {},
    polish = {},
    clarity = {},
    symmetry = {},
    fluorescence = {},
    cut = {},
    culet = {},
    girdle = "",
    dimensions = "",
    depth = "",
    carat = "",
    table = ""
  } = data.options;

  const { stock_number = "-", certificate_number = "-" } = data;
  return (
    <div className="compare-table-col">
      <CompareTableRow bold>{shape ? shape.title : "-"}</CompareTableRow>
      <CompareTableRow bold>{carat || "-"}</CompareTableRow>
      <CompareTableRow bold>{color ? color.title : "-"}</CompareTableRow>
      <CompareTableRow bold>{clarity ? clarity.title : "-"}</CompareTableRow>
      <CompareTableRow bold>{cut ? cut.title : "-"}</CompareTableRow>
      <CompareTableRow>{polish ? polish.title : "-"}</CompareTableRow>
      <CompareTableRow>{symmetry ? symmetry.title : "-"}</CompareTableRow>
      <CompareTableRow>
        {fluorescence ? fluorescence.title : "-"}
      </CompareTableRow>
      <CompareTableRow>{dimensions || "-"}</CompareTableRow>
      <CompareTableRow>{table ? table + "%" : "-"}</CompareTableRow>
      <CompareTableRow>{depth ? depth + "%" : "-"}</CompareTableRow>
      <CompareTableRow>{girdle || "-"}</CompareTableRow>
      <CompareTableRow>{culet ? culet.title : "-"}</CompareTableRow>
      <CompareTableRow>{certificate_number || "-"}</CompareTableRow>
      <CompareTableRow>{stock_number || "-"}</CompareTableRow>
    </div>
  );
};

export default CompareDiamondBottomSlide;
