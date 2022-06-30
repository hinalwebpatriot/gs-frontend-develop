import React from "react";
import selectors from "../../_selectors/cartSelectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import routing from "../../../config/routing";
import { flowRight as compose } from "lodash";
import CartSvg from "../../../img/jsSvg/CartSvg";

const NavCartButton = props => {
  const { count, className, history } = props;
  return (
    <button className={className} onClick={() => history.push(routing().cart)}>
      <span className="extra-icon">
        <CartSvg />
      </span>
      {count}
    </button>
  );
};

const mapStateToProps = (state, props) => ({
  count: selectors.count(state),
  className: props.className
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavCartButton);
