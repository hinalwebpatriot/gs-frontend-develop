import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TopHeader from "./TopHeader";
import CheckoutHeaderMenu from "./HeaderMenu/CheckoutHeaderMenu";
import ContactExpertBlock from "../_common/ContactExpertBlock/ContactExpertBlock";
import CartBuyOptions from "../Checkout/Cart/Items/CartBuyOptions";
import redArrow from "../../img/svg/red_arrow.svg";
import routing from "../../config/routing";
import ScrollTopButton from '../_common/ScrollTopButton';
import selectors from "../_selectors/confirmationSelectors";
import CheckoutServicesHeaderMenu from "./HeaderMenu/CheckoutServicesHeaderMenu";

class CheckoutWrapper extends React.Component {
  render() {
    const { children, path, orderType } = this.props;
    return (
      <div className="wrapper sticky-header">
        <div className="content cart-content">
          <TopHeader />
          {
            orderType === 'service' ? <CheckoutServicesHeaderMenu path={path} /> : <CheckoutHeaderMenu path={path} />
          }
          {children}
          <div className="cart-section">
            <div className="container">
              <CartBuyOptions />
            </div>
          </div>
          <section className=" cart-contact-section">
            <div className="container">
              <p className="theme-subtitle theme-subtitle--medium ">
                Contact expert
              </p>
              <Link
                to={routing().terms}
                className="arrow-link arrow-link--type2"
              >
                Read our terms and conditions
                <span className="arrow-link__icon">
                  <img className="red-arrow" src={redArrow} alt="red arrow" />
                </span>
              </Link>
              <ContactExpertBlock />
            </div>
          </section>
          <ScrollTopButton/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  orderType: selectors.orderType(state)
})

export default connect(mapStateToProps, null)(CheckoutWrapper);