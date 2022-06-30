import React from "react";
import ResultPanelWrapper from "../../../Shared/ResultPanel/ResultPanelWrapper";
import CompareAndFaveButtons from "../../../Shared/ResultPanel/CompareAndFaveButtons";
import ResultsCount from "../../../Shared/ResultPanel/ResultsCount";
import PanelViewButtons from "../../../Shared/ResultPanel/PanelViewButtons";
import WeddingSortDropdownContainer from "./WeddingSortDropdownContainer";

const WeddingResultPanel = ({ total, view, changeView }) => (
  <ResultPanelWrapper type="wedding">
    <PanelViewButtons view={view} handleChange={changeView} />
    <CompareAndFaveButtons type="wedding" />
    <ResultsCount count={total} />
    <WeddingSortDropdownContainer />
  </ResultPanelWrapper>
);

export default WeddingResultPanel;
