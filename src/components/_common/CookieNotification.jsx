import React from "react";
import { Link } from "react-router-dom";
import CloseSvg from "../../img/jsSvg/CloseSvg";
import { isCookieAcceptedSelector } from "../_selectors/settingSelector";
import { setAcceptCookie } from "../Main/MainActions";
import api from "../../config/api";
import routing from "../../config/routing";
import { connect } from "react-redux";
import { deviceSelector } from '../_selectors/deviceSelector';
import { isServer } from '../../utils/isServer';

class CookieNotification extends React.Component {
  handleClose = () => {
    api.config.acceptCookie();
    this.props.setAcceptCookie();
  };

  render() {
    const { isCookieAccepted, isMobile } = this.props;

    if (isCookieAccepted || isMobile || isServer) {
      return null;
    }

    return (
      <div className="cookie-window">
        <div className="container">
          <div className="cookie">
            <div className="cookie__text cookie-text">
              <p className="cookie-text__line">
                We use cookies to ensure that we give you the best experience on
                our website.
              </p>
              <p className="cookie-text__line">
                By using the website you agree to our use of cookies. More
                information <Link to={routing().cookies}>&nbsp;here</Link>.
              </p>
            </div>
            <button aria-label="cookie" 
              className="cookie__btn"
              onClick={this.handleClose}
              style={{ right: "10%" }}
            >
              <CloseSvg />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCookieAccepted: isCookieAcceptedSelector(state),
  isMobile: deviceSelector(state)
});

const mapDispatchToProps = {
  setAcceptCookie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CookieNotification);
