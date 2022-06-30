import React from "react";

import contact3 from "../../../img/svg/contact3.svg";
import contact4 from "../../../img/svg/contact4.svg";
import contact5 from "../../../img/svg/contact5.svg";
import contact8 from "../../../img/svg/contact8.svg";
import { getContactByKey } from "../../_selectors/showroomBlockSelectors";
import { connect } from "react-redux";
import { openHubspotChat } from "../../../config/hubspot";
import socialLinks from "../../../config/socialLinks";
import { deviceSelector } from "../../_selectors/deviceSelector";

const ContactExpertBlock = ({
  phone,
  email,
  isMobile
}) => (
  <div className="benefit-row">
    <div className="row help-row justify-content-center">
      <div className="col-6 col-md-4 col-lg-3 col-xl-2">
        <a href={`tel:${phone}`}>
          <div className="help-block">
            <div className="help-block__inner">
              <div className="help-icon">
                <img src={contact3} alt="Expert block: contact 3" />
              </div>
              <p className="help-title">{phone}</p>
            </div>
          </div>
        </a>
      </div>
      <div className="col-6 col-md-4 col-lg-3 col-xl-2">
        <div
          className="help-block"
          onClick={() => openHubspotChat()}
          style={{ cursor: "pointer" }}
        >
          <div className="help-block__inner">
            <div className="help-icon">
              <img src={contact8} alt="expert block: contact 8" />
            </div>
            <p className="help-title">Expert online</p>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-4 col-lg-3 col-xl-2">
        <a href={`mailto:${email}`}>
          <div className="help-block help-block--email">
            <div className="help-block__inner">
              <div className="help-icon">
                <img src={contact4} alt="expert block: contact 4" />
              </div>
              <p className="help-title help-title--long-email">{email}</p>
            </div>
          </div>
        </a>
      </div>
      {isMobile && (
        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <div className="help-block">
              <div className="help-block__inner">
                <div className="help-icon">
                  <img src={contact5} alt="expert block: contact 5" />
                </div>
                <p className="help-title">Messenger</p>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
  phone: getContactByKey(state, "phone"),
  email: getContactByKey(state, "email"),
  whatsapp: getContactByKey(state, "whatsapp"),
  messenger: getContactByKey(state, "messenger"),
  viber: getContactByKey(state, "viber")
});

export default connect(mapStateToProps)(ContactExpertBlock);
