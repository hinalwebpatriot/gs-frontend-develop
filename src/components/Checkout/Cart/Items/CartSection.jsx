import React from "react";
import CartHeader from "./CartHeader";
import selectors from "../../../_selectors/cartSelectors";
import { clearPromocode, fetchCart } from "../CartActions";
import { connect } from "react-redux";
import CartSummary from "./CartSummary";
import CheckoutList from "../../Shared/CheckoutList";
import { Preloader } from "../../../_common/Preloader";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';
import { dataLayerPush } from '../../../../utils/dataLayer';

class CartSection extends React.Component {

  state = {
    isConfirmedPromocode: false,
    loaded: false
  }

  constructor(props) {
    super(props);
  }

  confirmedPromocode = () => {
    this.setState({
      isConfirmedPromocode: !this.state.isConfirmedPromocode
    })
  }

  componentDidMount() {
    const { fetchCart, clearPromocode, status, data } = this.props;
    if (status !== "request") {
      // clearPromocode();
      fetchCart();
      this.setState({loaded: true});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetchCart, status, data } = this.props;
    if(prevState.isConfirmedPromocode !== this.state.isConfirmedPromocode){
      console.log('status', status);
      if (status !== "request") {
        fetchCart();
        this.setState({loaded: true})
      }
    }
    const { promocodeStatus } = data;
    if ((promocodeStatus === 'SUCCESS' || promocodeStatus === 'FAILURE') && this.state.loaded === false) {
      fetchCart();
      this.setState({loaded: true});
    }
    //check update and prevent double tracking
    if (prevProps.status !== this.props.status)
      //check if we have cart
      if (this.props.status === 'success' && this.props.data.items.length) {
        GoogleEE.checkoutStep({
          products: this.props.data.items,
          step: 1
        });
      }

    if (this.props.status === 'success' && this.props.data.items.length) {
      dataLayerPush({
        'dynx_itemid': data.items.map(item => item.sku).join(','),
        'dynx_totalvalue': data.price,
        'dynx_pagetype': 'cart'
      });
    }
  }

  render() {
    const { status, data } = this.props;
    const { isConfirmedPromocode, loaded } = this.state;

    if ((status === "request" || status === 'none') && !loaded) {
      return (
        <section className="cart-section">
          <Preloader margin="40vh auto" />
        </section>
      );
    }

    if (!data.items.length && !loaded) {
      console.log('second if: status', status);
      return (
        <section className="cart-section">
          <h2
            style={{
              margin: "30vh auto",
              textAlign: "center",
              fontSize: "2rem"
            }}
          >
            No items
          </h2>
        </section>
      );
    }

    return (
      <section className="cart-section">
        <div className="container">
          <CartHeader total={status !== "request" ? data.price : 0} />
          <div className="row">
            <div className="col-lg-6">
              <CheckoutList data={data} />
            </div>
            <div className="col-lg-6">
              <CartSummary
                data={data}
                confirmedPromocode={this.confirmedPromocode}
                statusFromSection={status}
              />
            </div>
          </div>
          {/*<CartBuyOptions />*/}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.status(state),
  data: selectors.data(state)
});

const mapDispatchToProps = {
  fetchCart,
  clearPromocode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartSection);
