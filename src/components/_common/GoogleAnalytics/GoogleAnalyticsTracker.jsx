import React from "react";
import ReactGA from "react-ga";
import clientConfig from "../../../config/client.config";

export default class GoogleAnalyticsTracker extends React.Component {
  constructor(props) {
    super(props);
    console.log('clientConfig.googleAnalytics.key.length', clientConfig.googleAnalytics.key && clientConfig.googleAnalytics.key.length);
    ReactGA.initialize(clientConfig.googleAnalytics.key);
    this.trackPage(props.location); // initial load;
    ReactGA.plugin.require('ec'); // enable enhanced ecommerce;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.location.search !== prevProps.location.search
    ) {
      this.trackPage(this.props.location);
    }
  }

  trackPage = location => {
    const page = location.pathname + location.search;
    ReactGA.pageview(page);
  };

  render() {
    return null;
  }
}
