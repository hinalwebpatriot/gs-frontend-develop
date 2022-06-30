import React from "react";
import VideoHint from "../../_common/VideoHint/VideoHint";

const CompareTableHeadRow = ({ children, bold, video = {} }) => (
  <div className="compare-row ">
    <div className="compare-col compare-col--first">
      <div
        className={`d-flex compare-title ${bold ? "compare-title--type2" : ""}`}
      >
        <VideoHint
          title={video.title}
          category={video.category}
          type={video.type}
        />
        <p className="compare-title__text">{children}</p>
      </div>
    </div>
  </div>
);

export default CompareTableHeadRow;
