import React from "react";

const DeliveryTabs = ({ currentTab, handleChange, showHome }) => {
  if (!showHome && currentTab === "home") {
    handleChange("office");
  }

  return (
    <div className="category-tab category-tab--type3">
      {/*<div*/}
        {/*className={`category-tab__item ${*/}
          {/*currentTab === "office" ? "active" : ""*/}
        {/*}`}*/}
        {/*onClick={() => handleChange("office")}*/}
      {/*>*/}
        {/*Home /!* Sorry for this. It's client demand*!/*/}
      {/*</div>*/}
      {showHome && (
        <div
          className={`category-tab__item ${
            currentTab === "home" ? "active" : ""
          }`}
          onClick={() => handleChange("home")}
        >
          Office {/* Sorry for this. It's client demand*/}
        </div>
      )}
      {/*<div*/}
        {/*className={`category-tab__item ${*/}
          {/*currentTab === "showroom" ? "active" : ""*/}
        {/*}`}*/}
        {/*onClick={() => handleChange("showroom")}*/}
      {/*>*/}
        {/*Sydney showroom*/}
      {/*</div>*/}
    </div>
  );
};

export default DeliveryTabs;
