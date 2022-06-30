import React from "react";
import CompletedRingHeader from "./CompletedRingHeader";
import CompletedRingBuySection from "./CompletedRingBuySection";
import CompletedRingItemSection from "./CompletedRingItemSection";

const CompletedRing = ({ data, index, handleDelete, handleUpdate, isOne, isSharing, position, list }) => (
  <div className="complete-container">
    <CompletedRingHeader
      index={index}
      handleDelete={handleDelete}
      id={data.id}
      isOne={isOne}
      isSharing={isSharing}
      ringId={data.ring.id}
    />
    <div className="row">
      <CompletedRingItemSection
        diamond={data.diamond}
        setting={data.ring}
        id={data.id}
        handleUpdate={handleUpdate}
        isSharing={isSharing}
        list={list}
        position={position}
      />
      <CompletedRingBuySection
        data={data.common}
        id={data.id}
        diamond={data.diamond}
        setting={data.ring}
        isSharing={isSharing}
      />
    </div>
  </div>
);

export default CompletedRing;
