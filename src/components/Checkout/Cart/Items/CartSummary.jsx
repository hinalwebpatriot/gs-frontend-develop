import React, { Fragment } from "react";
import CustomTooltip from "../../../_common/CustomTooltip";
import CustomTooltipHref from "../../../_common/CustomTooltipHref";
import BuyArrowSvg from "../../../../img/jsSvg/BuyArrowSvg";
import localeStore from "../../../../config/LocalesStore";
import api from "../../../../config/api";
import { allowDeliveryRoute, setIsGift } from "../../Delivery/DeliveryActions";
import { clearPromocode, fetchCart } from '../CartActions';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { flowRight as compose } from "lodash";
import routing from "../../../../config/routing";
import { settingsLocationOptionsSelector } from "../../../_selectors/settingSelector";
import TextInputField from "../../../_common/TextInputField";
import {PreloaderImg} from "../../../_common/Preloader";
import PromocodeConfirmModal from "./PromocodeConfirmModal";
import { Promocode } from "./Promocode";

class CartSummary extends React.Component {

  constructor(props) {
    super(props);
    this.promoCode = React.createRef();
    this.state = {
      isValid: "none",
      status: "none",
      errors: {},
      showPromocodeConfirmModal: false
    }
  }

  componentDidUpdate(prevProps) {
    const { data, fetchCart} = this.props;
    if (prevProps.data.promocodeStatus === 'REQUEST' && data.promocodeStatus === 'SUCCESS') {
      fetchCart();
    }
  }

  pushToDelivery = () => {
    const { allowDeliveryRoute, history } = this.props;
    allowDeliveryRoute();
    history.push(routing().delivery);
  };

  handleAllModals = () => {
    this.setState({
      showPromocodeConfirmModal: false
    });
  };

  handlePromocodeConfirmModal = () => {
    this.handleAllModals({
      showPromocodeConfirmModal: !this.state.showPromocodeConfirmModal
    });
  };

  handleClear = () => {
    const { clearPromocode } = this.props;
    clearPromocode();
    this.promoCode.current.value = '';
  }

  handleApplyBeforeCall = () => {
    this.setState({status: "request"});
  }

  handleApply = (typeOfResponse, with_confirmation, errors = {}) => {
    const { confirmedPromocode, isConfirmedPromocode } = this.props;

    if (typeOfResponse === 'success') {
      this.setState({
        showPromocodeConfirmModal: with_confirmation,
        status: "success",
        isValid: true,
        errors: {},
      }, () => {
        const { showPromocodeConfirmModal } = this.state;
        if(!showPromocodeConfirmModal) {
          confirmedPromocode();
        }
      })
    }
    if (typeOfResponse === 'error') {
      this.setState({
        showPromocodeConfirmModal: false,
        status: "failure",
        isValid: false,
        errors
      })
    }
  }

  render() {
    const { setIsGift, confirmedPromocode, statusFromSection, data } = this.props;
    const { count, price, referral_discount, promo_code, cart_discount } = data;
    const { isValid, status, errors, showPromocodeConfirmModal } = this.state;
    const isDisabled = status === 'request' || statusFromSection === 'request';
    return (
      <Fragment>
        <div className="cart-right-block">
          <p className="section-title section-title--type2">Order summary</p>
          <div className="summary-table">
            {/*<div className="row summary-table__row">*/}
            {/*<div className="col-6">*/}
            {/*<span>{count} product</span>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="row summary-table__row">
              <div className="col-6">
                <span>Product total</span>
              </div>
              <div className="col-6">
                <p className="val">
                  {count} {count > 1 ? "products" : "product"}
                </p>
              </div>
            </div>
            {/*
            <div className="row summary-table__row">
              <div className="col-6">
                <span>Delivery</span>
              </div>
              <div className="col-6">
                <p className="val">Free</p>
              </div>
            </div>
            */}
            <div className="row summary-table__row">
              <div className="col-6">
                <span>GST</span>
              </div>
              <div className="col-6">
                <p className="val">
                  {localeStore.formatPrice(
                      (price * (1 - 1/(1 + parseFloat(localeStore.taxPercent)/100))).toFixed(2)
                  )}
                  <CustomTooltip path="checkout.saleTax" />
                </p>
              </div>
            </div>
            { cart_discount !== null &&
              <div className="row summary-table__row">
                <div className="col-6">
                  <span>Cart discount</span>
                </div>
                <div className="col-6">
                  <div className="val">
                    <span>{localeStore.formatPrice(cart_discount)}</span>
                    <CustomTooltipHref path="checkout.referral_discount" href="/terms-and-conditions" />
                  </div>
                </div>
              </div>
            }
            { referral_discount !== null &&
              <div className="row summary-table__row">
                <div className="col-6">
                  <span>Referral discount</span>
                </div>
                <div className="col-6">
                  <div className="val">
                    <span>{localeStore.formatPrice(referral_discount)}</span>
                    <CustomTooltipHref path="checkout.referral_discount" href="/terms-and-conditions" />
                  </div>
                </div>
              </div>
            }
            <div className="row summary-table__row">
              <div className="col-6">
                <span>Total price</span>
              </div>
              <div className="col-6">
                <p className="val">{localeStore.formatPrice(price)}</p>
              </div>
            </div>
          </div>
          <Promocode
            isDisabled={isDisabled}
            isValid={isValid}
            errors={errors}
            promo_code={promo_code}
            handleApplyBeforeCall={this.handleApplyBeforeCall}
            handleApplyCallBack={this.handleApply}
            handleClearCallBack={this.handleClear}
            promoCodeRef={this.promoCode} 
            />
          <div className="gift-option">
            <div className="gift-option__check">
              <input
                type="checkbox"
                className="checkbox checkbox--type3"
                id="fc1"
                onChange={({ currentTarget }) =>
                  setIsGift(currentTarget.checked)
                }
              />
              <label htmlFor="fc1">
                <span>This it a gift</span>
                <a href="#">What is included</a>
                <CustomTooltip path="checkout.whatIsIncluded" />
              </label>
            </div>
          </div>
          <div className="gift-option">
            <div className="gift-option__check">
              <a href="#">What your order includes?</a>
            </div>
          </div>

          <div className="delivery-terms">
            <p>By placing your order, you agree to the</p>
            <a href="#">Delivery Terms</a>
          </div>
          <div className="cart-form-info">
            <p>
              Our customer care team will help you with that.
            </p>
          </div>
          <div className="cart-actions">
            <button className="buy-btn" onClick={this.pushToDelivery}>
              <span className="buy-btn__text">Checkout Securely</span>
              <span className="buy-btn__arrow">
                <BuyArrowSvg />
              </span>
            </button>
            {/*<CheckoutPaypalButton/>*/}
          </div>
        </div>
        {
          showPromocodeConfirmModal && (
              <PromocodeConfirmModal
              isConfirmed={confirmedPromocode}
              promoCode={this.promoCode.current.value}
              handleModal={this.handlePromocodeConfirmModal}
              />)
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  taxPercent: settingsLocationOptionsSelector(state),
  state: state,
  ...props
});

const mapDispatchToProps = {
  setIsGift,
  allowDeliveryRoute,
  fetchCart,
  clearPromocode
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CartSummary);
