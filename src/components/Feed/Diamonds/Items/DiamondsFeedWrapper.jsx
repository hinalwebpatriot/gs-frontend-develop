import React from "react";

const DiamondsFeedWrapper = ({ children }) => (
  <section className="feed-section" style={{ minHeight: '900px'}}>
    <div className="container">{children}</div>
  </section>
);

export default DiamondsFeedWrapper;
