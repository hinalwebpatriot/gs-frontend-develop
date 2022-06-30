import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchServicesCart } from "../CartServicesActions"
import CheckoutServicesList from "./CheckoutServicesList";
import CartServicesSummary from "./CartServicesSummary";
import selectors from "../../../_selectors/cartSelectors";
import { clearPromocode } from "../../Cart/CartActions";

class CartServicesSection extends Component{

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
    }

    componentDidMount() {
        const { fetchServicesCart, status } = this.props;
        if (status !== "request") {
            fetchServicesCart(this.id);
        }
    }

    render() {
        const { servicesItems } = this.props.data;
        const { data, history, fetchServicesCart, clearPromocode } = this.props;
        return (
            <section className="cart-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <CheckoutServicesList data={servicesItems} />
                        </div>
                        <div className="col-lg-6">
                            <CartServicesSummary
                                data={data}
                                push={history.push}
                                updateCart={() => { fetchServicesCart(this.id)}} 
                                clearPromocode={clearPromocode}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    status: selectors.servicesStatus(state),
    data: selectors.data(state)
});

const mapDispatchToProps = {
    fetchServicesCart,
    clearPromocode
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartServicesSection));