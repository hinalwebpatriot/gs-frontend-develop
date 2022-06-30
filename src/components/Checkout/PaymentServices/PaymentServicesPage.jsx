import React from "react";
import CheckoutHeader from "../Shared/CheckoutHeader";
import CheckoutServicesList from "../CartServices/Items/CheckoutServicesList";
import PaymentHeader from "../Payment/Items/PaymentHeader";
// import CheckoutOrderData from "../Shared/CheckoutOrderData";
import { Preloader } from "../../_common/Preloader";
import PaymentMethodContainer from "../Payment/Items/PaymentMethodContainer";
import routing from "../../../config/routing";
import selectors from "../../_selectors/paymentSelectors";
import { fetchServicesOrderData } from "../Payment/PaymentActions";
import { connect } from "react-redux";
import { dataLayerPush } from '../../../utils/dataLayer';

class PaymentServicesPage extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
            isExpanded: false
        };
    }

    handleToggle = () => {
        this.setState(state => ({ isExpanded: !state.isExpanded }));
    };

    componentDidMount() {
        const { fetchServicesOrderData, history } = this.props;

        fetchServicesOrderData({ id: this.id, replace: history.replace });
        dataLayerPush({
            'dynx_itemid': '',
            'dynx_totalvalue': '',
            'dynx_pagetype': 'other'
          });
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status === "request" && this.props.status === "success") {
            const { order, history } = this.props;
            if (order.info["Showroom"]) {
                history.push(
                    routing(`default?id=${order.info.Shared.id}`).paymentSuccess
                );
            }
        }
    }

    render() {
        const { history, status, order } = this.props;
        const { isExpanded } = this.state;

        if (status === "request" || status === "none") {
            return (
                <section className="cart-section">
                    <Preloader margin="40vh auto" />
                </section>
            );
        }

        return (
            <section className="cart-section">
                <div className="container">
                    <CheckoutHeader title="Payment" push={history.push} />
                    <div className="row">
                        <div className="col-lg-6">
                            <PaymentHeader
                                total={order.total}
                                handleToggle={this.handleToggle}
                                isExpanded={isExpanded}
                                isServices={true}
                            />
                            <p className="theme-subtitle theme-subtitle--medium xs-hide">
                                Your services
                            </p>
                            <CheckoutServicesList
                            data={order.items}
                            />
                            {/*<CheckoutOrderData data={order.info} />*/}
                        </div>
                        <div className="col-lg-6">
                            <PaymentMethodContainer replace={history.replace}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    status: selectors.servicesOrderStatus(state),
    order: selectors.orderData(state),
});

const clearState = fetchServicesOrderData.fulfill;

const mapDispatchToProps = {
    fetchServicesOrderData,
    clearState
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentServicesPage);


