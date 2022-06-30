import React from "react";

const CategoryTabs = ({ tabsCount, currentTab, handleChange }) => {
  if (currentTab === null) {
    Object.keys(tabsCount).forEach(key => {
      if (tabsCount[key] !== 0) {
        handleChange(key);
      }
    });
  }

  return (
    <div className={`category-tab`}>
      <div
        className={`category-tab__item ${currentTab === "diamond" ? "active" : ""}`}
        onClick={() => handleChange("diamond")} >
          Diamonds <span>({tabsCount.diamond})</span>
      </div>
      <div
        className={`category-tab__item ${currentTab === "engagement" ? "active" : ""}`}
        onClick={() => handleChange("engagement")} >
          Engagement rings <span>({tabsCount.engagement})</span>
      </div>
      <div
        className={`category-tab__item ${currentTab === "wedding" ? "active" : ""}`}
        onClick={() => handleChange("wedding")} >
          Wedding rings <span>({tabsCount.wedding})</span>
      </div>
        <div
            className={`category-tab__item ${currentTab === "pendant" ? "active" : ""}`}
            onClick={() => handleChange("pendant")} >
            Pendant <span>({tabsCount.pendant})</span>
        </div>
        <div
            className={`category-tab__item ${currentTab === "ring" ? "active" : ""}`}
            onClick={() => handleChange("ring")} >
            Ring <span>({tabsCount.ring})</span>
        </div>
        <div
            className={`category-tab__item ${currentTab === "earring" ? "active" : ""}`}
            onClick={() => handleChange("earring")} >
            Earrings <span>({tabsCount.earring})</span>
        </div>
        <div
            className={`category-tab__item ${currentTab === "bracelet" ? "active" : ""}`}
            onClick={() => handleChange("bracelet")} >
            Bracelets <span>({tabsCount.bracelet})</span>
        </div>
        <div
            className={`category-tab__item ${currentTab === "eternity-ring" ? "active" : ""}`}
            onClick={() => handleChange("eternity-ring")} >
            Eternity rings <span>({tabsCount['eternity-ring']})</span>
        </div>

    </div>
  );
};

export default CategoryTabs;
