import React from "react";
import NavFavoriteButton from "../../../_common/Buttons/NavFavoriteButton";
import NavCompareButton from "../../../_common/Buttons/NavCompareButton";

const CompareAndFaveButtons = ({ marginLeft = "15px", type }) => (
  <div className="header-extra" style={{ marginLeft: marginLeft }}>
    <NavFavoriteButton type={type} />
    <NavCompareButton type={type} />
  </div>
);

export default CompareAndFaveButtons;
