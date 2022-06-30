import React from "react";
import ResultPanelWrapper from "../../../Shared/ResultPanel/ResultPanelWrapper";
import CompareAndFaveButtons from "../../../Shared/ResultPanel/CompareAndFaveButtons";
import CheckboxTripleExcellent from "../../Filters/Items/CheckboxTripleExcellent";
import Checkbox360View from "../../Filters/Items/Checkbox360View";
import ResultsCount from "../../../Shared/ResultPanel/ResultsCount";
import DiamondsSortDropdownContainer from "./DiamondsSortDropdownContainer";

const DiamondsResultPanel = ({ total }) => (
  <ResultPanelWrapper type="diamond" style={{ marginBottom: "30px" }}>
    <CompareAndFaveButtons marginLeft={0} type="diamond" />
    <CheckboxTripleExcellent />
    <Checkbox360View />
    <ResultsCount count={total} />
    <DiamondsSortDropdownContainer />
  </ResultPanelWrapper>
);

export default DiamondsResultPanel;
