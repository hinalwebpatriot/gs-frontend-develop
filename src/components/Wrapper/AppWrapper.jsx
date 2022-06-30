import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import Alert from "react-s-alert";
import { withRouter } from "react-router-dom";
import AlertTemplate from "../_common/AlertTemplate";
import ResizeWatcher from "../_common/HOC/ResizeWatcher";
import GoogleAnalyticsTracker from "../_common/GoogleAnalytics/GoogleAnalyticsTracker";
import ScrollToTop from "../_common/HOC/ScrollToTop";
import { isServer } from "../../utils/isServer";
import RemoveNoJsTag from '../_common/RemoveNoJsTag';

const AppWrapper = props => (
  <Fragment>
    <Helmet>
      <title>GS Diamonds</title>
    </Helmet>
    <Alert
      contentTemplate={AlertTemplate}
      stack={{ limit: 5 }}
      effect="scale"
      html
      position="top-right"
      offset={50}
    />
    {!isServer && <RemoveNoJsTag/>}
    {!isServer && <ScrollToTop location={props.location} />}
    {!isServer && <GoogleAnalyticsTracker location={props.location} />}
    {!isServer && <ResizeWatcher />}
    {props.children}
  </Fragment>
);

export default withRouter(AppWrapper);
