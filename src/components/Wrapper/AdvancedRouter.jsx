import React from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import {
  settingsSelectedSelector,
  settingsStatusSelector
} from "../_selectors/settingSelector";
import { connect } from "react-redux";
import { Preloader } from "../_common/Preloader";

const AdvancedRouter = ({
  isServer,
  context,
  basename,
  location,
  children,
  settings,
  settingsStatus
}) => {
  if (isServer) {
    return (
      <StaticRouter location={location} basename={basename} context={context}>
        {children}
      </StaticRouter>
    );
  }

  if (settingsStatus === "request" || settingsStatus === "none") {
    return <Preloader margin="40vh auto" />;
  }

  const { lang } = settings;

  const isGoogleCache = document.location.host === 'webcache.googleusercontent.com';

  if (isGoogleCache) {
    let canonical = '/';

    try {
      const canonicalMeta = document.querySelector("link[rel='canonical']").getAttribute('href');
      const canonicalUrl = new URL(canonicalMeta);
      canonical = canonicalUrl.pathname;
    } catch (err) {}

    console.log('Parsed google cache url:', canonical);
    return (
      <StaticRouter location={canonical}>
        {children}
      </StaticRouter>
    )
  }

  return (
    <BrowserRouter basename={"/" || lang.code === "en" ? "/" : `/${lang.code}`}>
      {children}
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  settings: settingsSelectedSelector(state),
  settingsStatus: settingsStatusSelector(state)
});

export default connect(mapStateToProps)(AdvancedRouter);
