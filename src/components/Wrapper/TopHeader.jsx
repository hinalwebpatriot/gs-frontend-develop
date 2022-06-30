import React from "react";
import MyAccountButton from "./MyAccountButton";
import CountryDropdownContainer from "../_common/CountryDropdown/CountryDropdownContainer";
import CityDropdownContainer from "../_common/City/CityDropdownContainer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { openHubspotChat } from "../../config/hubspot";
import { deviceWidthSelector } from "../_selectors/deviceSelector";
import routing from "../../config/routing";
import { getContactByKey } from "../_selectors/showroomBlockSelectors";
import PhoneSvg from "../../img/jsSvg/PhoneSvg";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons/faCommentAlt";
import IconFA from '../_common/IconFA';

// noinspection HtmlUnknownAnchorTarget
const TopHeader = ({ currentWidth, phone, handleScrollToShowrooms, showRoomRef, path }) => (
  <div className="top-header">
    <div className={`container ${path === '/referral' ? 'container1600' : ''}`}>
      <div className="top-header-container">
        <div className="top-header-text">
          <Link to={routing().moneyBack}>
            30 Day Money Back Guarantee and Free Shipping
          </Link>
          {/* <Link to={routing().preDeliveryShowroom} className="sm-hide test">
            Pick up in store
          </Link>
          <Link to={routing().highestQuality} className="lg-hide">
            Highest quality at wholesale prices!
          </Link> */}
        </div>
        <div className="top-header-text">
          <a href={`tel:${phone}`} className="header-phone">
            <span>
              <PhoneSvg />
            </span>
            {phone}
          </a>
          <a onClick={() => openHubspotChat()} className="expert-online">
            <span><IconFA icon={faCommentAlt}/></span>
            Expert online
          </a>
        </div>
        <div className="top-header-panel">
          {/* <span onClick={() => handleScrollToShowrooms(showRoomRef)} className="header-map sm-hide">
            <img src={mapMarkerSvg} alt="showrooms" />
          </span> */}
          <div className="top-header-panel__country-dropdown top-header-panel--city-dropdown">
            <CityDropdownContainer />
          </div>
          <div className="top-header-panel__country-dropdown">
            <CountryDropdownContainer />
          </div>
          <MyAccountButton className="profile-link sm-hide" />
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentWidth: deviceWidthSelector(state),
  phone: getContactByKey(state, "phone")
});

export default connect(mapStateToProps)(TopHeader);
