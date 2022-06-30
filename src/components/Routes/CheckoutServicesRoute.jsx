import React from "react";
import { Route } from "react-router-dom";
import CheckoutServicesWrapper from "../Wrapper/CheckoutServicesWrapper";

export default function CheckoutRoute(props) {
    return (
        <CheckoutServicesWrapper path={props.path}>
            <Route {...props} />
        </CheckoutServicesWrapper>
    );
}
