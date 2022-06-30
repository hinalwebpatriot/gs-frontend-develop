import React from "react";
import CompletedRingDiamond from "./CompletedRingDiamond";
import CompletedRingSetting from "./CompletedRingSetting";

const CompletedRingItemSection = ({ diamond, setting, id, handleUpdate, isSharing, list, position }) => (
  <div className="col-lg-6">
    <div className="row complete-row">
      <CompletedRingDiamond
        data={diamond}
        optionId={id}
        settingId={setting.id}
        ringSize={setting.selected_size.slug}
        handleUpdate={handleUpdate}
        isSharing={isSharing}
        list={list}
        position={position}
      />
      <CompletedRingSetting
        data={setting}
        optionId={id}
        diamondId={diamond.id}
        handleUpdate={handleUpdate}
        isSharing={isSharing}
        list={list}
        position={position + 1}
      />
    </div>
  </div>
);

export default CompletedRingItemSection;
