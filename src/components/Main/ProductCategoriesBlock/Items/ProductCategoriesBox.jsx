import React from "react";
import ProductCategoriesSlide from "./ProductCategoriesSlide";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";

class ProductCategoriesBox extends React.Component {
  render() {
    const { data } = this.props;

    const slides = data.map((item, index) => (
      <div className="col-lg-4" key={`product_cat_suggest_${item.id}`}>
        <ProductCategoriesSlide
          index={index}
          name={item.name}
          id={item.id}
          image={item.image}
          slug={item.slug}
        />
      </div>
    ));

    return (
      <section className="main-section">
        <div className="container">
          <div className="home-slider-box product-slider-box">
            <div className="product-container">
              <div className="row justify-content-center">{slides}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state)
});

export default connect(mapStateToProps)(ProductCategoriesBox);
