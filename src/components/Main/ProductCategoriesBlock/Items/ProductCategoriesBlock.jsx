import React from "react";
import ProductCategoriesSlider from "./ProductCategoriesSlider";

export default class ProductCategoriesBlock extends React.Component {
  render() {
    const { data, title } = this.props;
    return (
      <section className="product-section">
        <div className="container">
          <h1 className="section-title">{title}</h1>
          <ProductCategoriesSlider data={data} />
        </div>
      </section>
    );
  }
}
