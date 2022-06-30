import React from "react";
import { openHubspotChat } from "../../../config/hubspot";
import ImageLoader from '../../_common/ImageLoader';
import contact2 from "../../../img/svg/contact2.svg";
import contact3 from "../../../img/svg/contact3.svg";
import contact4 from "../../../img/svg/contact4.svg";
import { connect } from "react-redux";
import { getContactByKey } from "../../_selectors/showroomBlockSelectors";

const OnlineHelpBlock = ({ skype, email, phone }) => (
  <section className="main-section">
    <div className="container">
      <div className="online-help-wrap">
        <div className="row align-items-center">
          <div className="col-xl-3">
            <div className="help-info">
              We are online to help choose what you need
            </div>
          </div>
          <div className="col-xl-9">
            <div className="row justify-content-md-center help-row">
              {/* <div className="col-lg-1 sm-hide">
                <a
                  href={skypeActionUrl({ profile: skype, action: "videocall" })}
                  target="_blank"
                >
                  <div className="help-block">
                    <div className="help-block__inner">
                      <div className="help-icon">
                        <ImageLoader src={contact1} alt="Online help block: Contact 1" />
                      </div>
                      <p className="help-title">Video Chat</p>
                    </div>
                  </div>
                </a>
              </div> */}
              <div className="col-4 col-lg-3">
                <div
                  className="help-block"
                  onClick={() => openHubspotChat()}
                  style={{ cursor: "pointer" }}
                >
                  <div className="help-block__inner">
                    <div className="help-icon">
                      <ImageLoader src={contact2} alt="Contact 2" />
                    </div>
                    <p className="help-title">Chat</p>
                  </div>
                </div>
              </div>
              <div className="col-4 col-lg-3">
                <a href={`tel:${phone}`}>
                  <div className="help-block">
                    <div className="help-block__inner">
                      <div className="help-icon">
                        <ImageLoader src={contact3} alt="Contact 3" />
                      </div>
                      <p className="help-title">Call us</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-4 col-lg-3">
                <a href={`mailto:${email}`}>
                  <div className="help-block">
                    <div className="help-block__inner">
                      <div className="help-icon">
                        <ImageLoader src={contact4} alt="Contact 4" />
                      </div>
                      <p className="help-title">Mail us</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const mapStateToProps = state => ({
  email: getContactByKey(state, "email"),
  phone: getContactByKey(state, "phone"),
  skype: getContactByKey(state, "skype")
});

export default connect(mapStateToProps)(OnlineHelpBlock);
