import React from "react";

export default function RingsOffers({ offers, ringId }) {
  if (offers.length === 0) {
    return null;
  }

  return (
    <div className="category-block category-block--type2">
      {offers.map((offer, index) => (
        <button
          type="button"
          className="category active"
          key={`offer_${ringId}_${offer.id}_${index}`}

        >
          {offer.title}
        </button>
      ))}
    </div>
  );
}
