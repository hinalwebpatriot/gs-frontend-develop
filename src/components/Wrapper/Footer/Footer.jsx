import React from "react";
import { connect } from "react-redux";
import { deviceSelector } from "../../_selectors/deviceSelector";

import FooterMainNav from "./Items/FooterMainNav";
import FooterLinksBlock from "./Items/FooterLinksBlock";
import FooterSocialBlock from "./Items/FooterSocialBlock";
import FooterSubscribeBlock from "./Items/FooterSubscribeBlock";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import FooterContactsBlock from "./Items/FooterContactsBlock";
import FooterCities from "./Items/FooterCities";
import LazyLoadWithServer from "../../_common/LazyLoadWithServer";
import loadable from '@loadable/component';

import { GReviewWidgetDesktop } from "../../_common/GoogleReviewWidget";

const FooterExtra = loadable(() => import(/* webpackChunkName: 'footer_btns'*/ './Items/FooterExtra'));

class Footer extends React.Component {
  render() {
    const { isMobile, handleScrollToShowrooms, showRoomRef} = this.props;

    return (
        <footer className="footer">
          <FooterCities />
          <div className="container">
            <div className="f-container">
              <FooterMainNav />
              <FooterLinksBlock />
              <div className="f-col">
                <FooterSocialBlock />
                <SubscribeContainer Component={FooterSubscribeBlock} />
              </div>
              <div className="f-col f-col--type2 mobile-f-line">
                <FooterContactsBlock handleScrollToShowrooms={handleScrollToShowrooms} showRoomRef={showRoomRef} />
              </div>
            </div>
          </div>

          <LazyLoadWithServer height={ isMobile ? '211px' : '138px' } once>
            <FooterExtra isMobile={isMobile}/>
          </LazyLoadWithServer>

          <div className="f-copyright">
            <div className="container">
              <div className="f-col mobile-f-line">
                <div className="copyright">
                  Copyright © 2021 <span>GS Diamond Pty Ltd.</span> All Rights
                  Reserved
                </div>
              </div>
            </div>
          </div>
          {!isMobile && <GReviewWidgetDesktop/>}
        </footer>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state)
});

export default connect(mapStateToProps)(Footer);
