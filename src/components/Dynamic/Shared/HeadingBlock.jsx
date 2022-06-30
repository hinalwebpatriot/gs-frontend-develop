import React from 'react';

export default function HeadingBlock({ title }) {
  return (
    <section className="home-banner-section height">
      <div className="container">
        <div className="home-banner home-banner--type2">
          <h2 className="home-banner__title">
            {title}
          </h2>
        </div>
      </div>
    </section>
  )
}
