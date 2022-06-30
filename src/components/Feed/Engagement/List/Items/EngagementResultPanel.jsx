import React from "react";
import ResultPanelWrapper from "../../../Shared/ResultPanel/ResultPanelWrapper";
import CompareAndFaveButtons from "../../../Shared/ResultPanel/CompareAndFaveButtons";
import ResultsCount from "../../../Shared/ResultPanel/ResultsCount";
import PanelViewButtons from "../../../Shared/ResultPanel/PanelViewButtons";
import EngagementSortDropdownContainer from "./EngagementSortDropdownContainer";

const EngagementResultPanel = ({ total, view, changeView }) => (
  <ResultPanelWrapper type="engagement">
    <PanelViewButtons view={view} handleChange={changeView} />
    <CompareAndFaveButtons type="engagement" />
    <ResultsCount count={total} />
    <EngagementSortDropdownContainer />
  </ResultPanelWrapper>
);

export default EngagementResultPanel;
