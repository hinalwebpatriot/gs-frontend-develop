import React from "react";
import { Route } from "react-router-dom";
import { isServer } from "../../utils/isServer";
import CheckoutWrapper from "../Wrapper/CheckoutWrapper";

class CheckoutRoute extends React.Component {
  render () {
    const { path } = this.props;
    return (
      <CheckoutWrapper path={path}>
        <Route {...this.props} />
      </CheckoutWrapper>
    );
  }
}

export default CheckoutRoute;
