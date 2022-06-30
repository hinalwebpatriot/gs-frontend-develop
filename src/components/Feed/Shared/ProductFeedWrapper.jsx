import React from "react";

const RingFeedWrapper = ({ children }) => (
  <section className="feed-section feed-section--type2" style={{minHeight: '1000px'}}>
    <div className="container">
      <div className="row">{children}</div>
    </div>
  </section>
);

export default RingFeedWrapper;
