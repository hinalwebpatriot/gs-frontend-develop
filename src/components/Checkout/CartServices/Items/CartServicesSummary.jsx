import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import CustomTooltip from "../../../_common/CustomTooltip";
import BuyArrowSvg from "../../../../img/jsSvg/BuyArrowSvg";
import localeStore from "../../../../config/LocalesStore";
import { pushServicesData } from "../CartServicesActions";
import selectors from "../../../_selectors/cartSelectors";
import { Promocode } from "../../Cart/Items/Promocode";
import CustomTooltipHref from "../../../_common/CustomTooltip";
import { fetchServicesCart } from '../../CartServices/CartServicesActions';

class CartServicesSummary extends Component {
    state = {
        isDisabled: false,
    }
    constructor(props) {
        super(props);
        this.promoCode = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { data, updateCart } = this.props;
        if (prevProps.data.promocodeStatus === 'REQUEST' && data.promocodeStatus === 'SUCCESS') {
            updateCart();
        }
    }

    handleApply = () => {
        const { updateCart } = this.props;
        updateCart();
        this.setState({isDisabled: false});
    }

    handleClear = () => {
        const { clearPromocode } = this.props;
        clearPromocode();
        this.promoCode.current.value = '';
    }

    render() {
        const { pushServicesData, data, status } = this.props;
        const { servicesCount, servicesPrice, referral_discount_services, promo_code_services, promocodeStatus } = data;
        const isDisabled = status === 'request';
        return (
            <Fragment>
                <div className="cart-right-block">
                    <p className="section-title section-title--type2">Order summary</p>
                    <div className="summary-table">
                        <div className="row summary-table__row">
                            <div className="col-6">
                                <span>Product total</span>
                            </div>
                            <div className="col-6">
                                <p className="val">
                                    {servicesCount} {servicesCount > 1 ? "Services" : "Service"}
                                </p>
                            </div>
                        </div>

                        <div className="row summary-table__row">
                            <div className="col-6">
                                <span>GST</span>
                            </div>
                            <div className="col-6">
                                <p className="val">
                                    {servicesPrice && localeStore.formatPrice(
                                        servicesPrice.inc_price - servicesPrice.raw_price
                                    )}
                                    <CustomTooltip path="checkout.saleTax" />
                                </p>
                            </div>
                        </div>

                        { referral_discount_services !== null &&
                            <div className="row summary-table__row">
                                <div className="col-6">
                                <span>Referral discount</span>
                                </div>
                                <div className="col-6">
                                <div className="val">
                                    <span>{localeStore.formatPrice(referral_discount_services)}</span>
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
                                <p className="val"> {servicesPrice && localeStore.formatPrice(
                                    Number(servicesPrice.inc_price)
                                )}</p>
                            </div>
                        </div>
                    </div>
                    {/* {this.promoCode.current && */}
                        <Promocode
                            isDisabled={isDisabled}
                            promo_code={promo_code_services}
                            handleApplyBeforeCall={() => {this.setState({isDisabled: true})}}
                            handleApplyCallBack={ this.handleApply }
                            handleClearCallBack={ this.handleClear }
                            promoCodeRef={this.promoCode}
                            textForPlaceholder={'Enter referral promocode'}
                        />
                    {/* } */}
                    <div className="cart-actions">
                         <button className="buy-btn" onClick={() => pushServicesData(this.props)}>
                            <span className="buy-btn__text">Checkout Securely</span>
                            <span className="buy-btn__arrow">
                                <BuyArrowSvg />
                            </span>
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    status: selectors.servicesStatus(state),
    data: selectors.data(state)
});

const mapDispatchToProps = {
    pushServicesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartServicesSummary);