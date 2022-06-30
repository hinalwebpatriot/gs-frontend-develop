import React from "react";
import CompareDiamondFields from "../Items/Diamond/CompareDiamondFields";
import CompareEngagementFields from "../Items/Engagement/CompareEngagementFields";
import CompareWeddingFields from "../Items/Wedding/CompareWeddingFields";

const CompareShareSidebar = ({ currentTab, status }) => {
  if (status !== "success") return null;

  return (
    <div className="compare-side">
      <div className="compare-row compare-row--shared" />
      {currentTab === "diamond" && <CompareDiamondFields />}
      {currentTab === "engagement" && <CompareEngagementFields />}
      {currentTab === "wedding" && <CompareWeddingFields />}
    </div>
  );
};

export default CompareShareSidebar;
