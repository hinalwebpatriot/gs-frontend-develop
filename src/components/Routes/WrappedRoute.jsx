import React from "react";
import { Route } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

export default function WrappedRoute(props) {
  return (
    <Wrapper showroom={props.showroom} path={props.path}>
      <Route {...props} />
    </Wrapper>
  );
}
