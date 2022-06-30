import React from "react";
import PaymentMethodConfirm from "./PaymentMethodConfirm";
import PaymentMethodBlock from "./PaymentMethodBlock";
import { connect } from "react-redux";
import selectors from "../../../_selectors/paymentSelectors";
import {
  selectPaymentMethod,
  changePaymentMethod} from "../PaymentActions";

class PaymentMethodContainer extends React.Component {
  render() {
    const {
      currentMethod,
      isSelected,
      methodsStatus,
      methods,
      selectPaymentMethod,
      changePaymentMethod,
      submitStatus,
      submitData,
      replace,
      orderData,
    } = this.props;

    if (isSelected) {
      return (
        <PaymentMethodConfirm
          method={currentMethod}
          status={submitStatus}
          data={submitData}
          orderData={orderData}
          replace={replace}
        />
      );
    }

    return (
      <PaymentMethodBlock
        status={methodsStatus}
        data={methods}
        method={currentMethod}
        handleChangeMethod={changePaymentMethod}
        handleSelect={selectPaymentMethod}
        replace={replace}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  isSelected: selectors.isMethodSelected(state),
  currentMethod: selectors.currentMethod(state),
  methodsStatus: selectors.methodsStatus(state),
  methods: selectors.methodsData(state),

  submitStatus: selectors.submitStatus(state),
  submitData: selectors.submitData(state),

  orderData: selectors.orderData(state),

  replace: props.replace
});

const mapDispatchToProps = {
  // fetchPaymentMethods,
  selectPaymentMethod,
  changePaymentMethod
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodContainer);
