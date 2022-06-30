import React from "react";
import ListViewSvg from "../../../../img/jsSvg/ListViewSvg";
import PaneViewSvg from "../../../../img/jsSvg/PaneViewSvg";

const PanelViewButtons = ({ view, handleChange }) => (
  <div className="result-view d-flex">
    <button aria-label="PanelViewButtons list"
      className={`result-view__btn ${view === "list" ? "active" : ""}`}
      onClick={() => handleChange("list")}
    >
      <span className="view-icon">
        <ListViewSvg />
      </span>
    </button>
    <button aria-label="PanelViewButtons pane"
      className={`result-view__btn ${view === "pane" ? "active" : ""}`}
      onClick={() => handleChange("pane")}
    >
      <span className="view-icon">
        <PaneViewSvg />
      </span>
    </button>
  </div>
);

export default PanelViewButtons;
