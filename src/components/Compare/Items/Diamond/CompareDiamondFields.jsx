import React from "react";
import CompareTableHeadRow from "../CompareTableHeadRow";

const CompareDiamondFields = () => (
  <div className="compare-table">
    <CompareTableHeadRow
      video={{ title: "Shape", category: "diamonds", type: "shape" }}
      bold
    >
      Shape
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Carat", category: "diamonds", type: "carat" }}
      bold
    >
      Carat
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Colour", category: "diamonds", type: "color" }}
      bold
    >
      Colour
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Clarity", category: "diamonds", type: "clarity" }}
      bold
    >
      Clarity
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Cut", category: "diamonds", type: "cut" }}
      bold
    >
      Cut
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Polish", category: "diamonds", type: "polish" }}
    >
      Polish
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Symmetry", category: "diamonds", type: "symmetry" }}
    >
      Symmetry
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{
        title: "Fluorescence",
        category: "diamonds",
        type: "fluorescence"
      }}
    >
      Fluorescence
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Dimensions", category: "diamonds", type: "size_ratio" }}
    >
      Dimensions
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Table", category: "diamonds", type: "table" }}
    >
      Table
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Depth", category: "diamonds", type: "depth" }}
    >
      Depth
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Girdle", category: "diamonds", type: "girdle" }}
    >
      Girdle
    </CompareTableHeadRow>
    <CompareTableHeadRow
      video={{ title: "Culet", category: "diamonds", type: "culet" }}
    >
      Culet
    </CompareTableHeadRow>
    <CompareTableHeadRow video={{ title: "", category: "diamonds", type: "" }}>
      Certificate number
    </CompareTableHeadRow>
    <CompareTableHeadRow video={{ title: "", category: "diamonds", type: "" }}>
      Stock number
    </CompareTableHeadRow>
  </div>
);

export default CompareDiamondFields;
