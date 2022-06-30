import React from "react";

const MainStaticBanner = ({ head, text }) => (
  <section className="home-banner-section">
    <div className="container">
      <div className="home-banner">
        <h2 className="home-banner__title">{head}</h2>
        <p className="home-banner__text">{text}</p>
      </div>
    </div>
  </section>
);

export default MainStaticBanner;
