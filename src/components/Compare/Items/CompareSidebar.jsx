import React from "react";
import ActionsBlockContainer from "./ActionsBlockContainer";
import CompareDiamondFields from "./Diamond/CompareDiamondFields";
import CompareEngagementFields from "./Engagement/CompareEngagementFields";
import selectors from "../../_selectors/compareSelectors";
import { connect } from "react-redux";
import CompareWeddingFields from "./Wedding/CompareWeddingFields";

const CompareSidebar = ({ currentTab, status, tabsCount }) => {
  if (status !== "success") return null;
  if (!tabsCount[currentTab]) {
    return (
      <div className="compare-side">
        <div className="compare-row">
          <div className="compare-col compare-col--first">
            <ActionsBlockContainer currentTab={currentTab} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-side">
      <div className="compare-row">
        <div className="compare-col compare-col--first">
          <ActionsBlockContainer currentTab={currentTab} />
        </div>
      </div>

      {currentTab === "diamond" && <CompareDiamondFields />}
      {currentTab === "engagement" && <CompareEngagementFields />}
      {currentTab === "wedding" && <CompareWeddingFields />}
      {currentTab === "pendant" && <CompareWeddingFields />}
      {currentTab === "ring" && <CompareWeddingFields />}
      {currentTab === "earring" && <CompareWeddingFields />}
      {currentTab === "bracelet" && <CompareWeddingFields />}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  status: selectors.status(state),
  tabsCount: {
    diamond: selectors.tabCount(state, "diamond"),
    engagement: selectors.tabCount(state, "engagement"),
    wedding: selectors.tabCount(state, "wedding"),
    pendant: selectors.tabCount(state, "pendant"),
    ring: selectors.tabCount(state, "ring"),
    earring: selectors.tabCount(state, "earring"),
    bracelet: selectors.tabCount(state, "bracelet")
  },
  ...props
});

export default connect(mapStateToProps)(CompareSidebar);
