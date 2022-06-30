import React from "react";
import PhoneSvg from "../../../img/jsSvg/PhoneSvg";
// import dompurify from 'dompurify';
// import sanitizeHtml from "sanitize-html";
import messengerImg from "../../../img/svg/contact5.svg";
import chatImg from "../../../img/svg/contact2.svg";
import { openHubspotChat } from "../../../config/hubspot";
import { connect } from "react-redux";
import { getContactByKey } from "../../_selectors/showroomBlockSelectors";
import {
  contactByMessengerUrl
} from "../../../utils/sharingUtils";

import { deviceSelector } from "../../_selectors/deviceSelector";
import { removeAllTags } from "../../../utils/htmlRegex";

class ContactUsSupport extends React.Component {
  state = {
    isClient: false
  };

  componentDidMount() {
    this.setState({
      isClient: true
    });
  }

  render() {
    const { isClient } = this.state;
    const {  isMobile } = this.props;
    const { schedule, supportContacts } = this.props.data;

    const phones = supportContacts.find(item => item.service === "phone")
      .contacts;
    const email = supportContacts.find(item => item.service === "email")
      .contacts;

    const scheduleHtml = schedule.text;

    return (
      <div className="contact-support">
        <p className="theme-subtitle">Customer support</p>
        <div className="mobile-contact-btns  ">
          <a href={`mailto:${email}`} className="theme-btn theme-btn--type3">
            <span className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="13"
                height="10"
                viewBox="0 0 54.4 40.3"
              >
                <path
                  className="cls-1"
                  d="M48.2,0h-42C2.8,0,0,2.8,0,6.2v27.9c0,3.4,2.8,6.2,6.2,6.2h42c3.4,0,6.2-2.8,6.2-6.2V6.2  C54.4,2.8,51.6,0,48.2,0z"
                />
                <path
                  className="cls-2"
                  d="M47.9,9.9c-0.5-0.7-1.4-0.8-2.1-0.3L28.2,22.9c-0.5,0.4-1.3,0.4-1.8,0C21.8,19.2,12.1,11.4,8.6,8.6  C7.9,8.1,7,8.3,6.5,8.9c-0.5,0.6-0.4,1.5,0.2,2c2,1.5,6.2,4.9,10.7,8.6l-9.5,9.9c-0.6,0.6-0.6,1.5,0,2.1c0.6,0.6,1.5,0.5,2.1-0.1  l9.7-10.1l6.5,5.2l0.9,0.7l8.1-6L45,31.6c0.6,0.6,1.5,0.6,2.1,0c0.6-0.6,0.6-1.5,0-2.1l-9.5-10l10-7.5C48.3,11.5,48.4,10.6,47.9,9.9  z"
                />
              </svg>
            </span>
            Mail us
          </a>
          <a href={`tel:${phones[0]}`} className="theme-btn theme-btn--type3">
            <span className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Слой_1"
                width="11"
                height="14"
                viewBox="0 0 137.6 137.6"
              >
                <path
                  className="cls-1"
                  d="M117.8,86.5c-13.8-4.9-24.3-0.1-26.7,2.3l-15.5,11.7C68,96.5,61,91.6,54.8,85.8C47.9,79.3,42.3,71.7,37.2,62  l11.7-15.5c2.4-2.3,7.2-12.9,2.3-26.7C46.8,7.7,36.3,0,30.2,0H11C4.9,0,0,4.9,0,11c0,39,18,75.9,48.9,99.8l0.3,0.2l0.5,0.4l2.3,1.7  l0.6,0.5c0.9,0.7,1.8,1.3,2.7,1.9l0.1,0.1c21,14.3,45.8,22,71.1,21.9c6.1,0,11-4.9,11-11v-19.2C137.6,101.3,129.9,90.8,117.8,86.5z"
                />
              </svg>
            </span>
            Call us
          </a>
        </div>
        <div className="contact xs-hide">
          <div className="contact__title">
            <span className="contact-icon phone">
              <PhoneSvg />
            </span>
            {phones.map(item => (
              <a
                href={`tel:${item}`}
                className="contact-name "
                key={`phone_${item}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="contact ">
          <div className="contact__title xs-hide">
            <span className="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="13"
                height="9"
                viewBox="0 0 13 9"
              >
                <defs>
                  <path
                    id="h9kla"
                    d="M220 7031.679l-3 2.321v-5zm7 0l3-2.679v5zm-1.237.321l4.237 2.954V7036h-13v-1.046l4.237-2.954 2.263 1.821zm-8.763-5h13v1l-6.5 5-6.5-5z"
                  />
                </defs>
                <g>
                  <g transform="translate(-217 -7027)">
                    <use fill="#ac915f" xlinkHref="#h9kla" />
                  </g>
                </g>
              </svg>
            </span>
            <a href={`mailto:${email}`} className="contact-name">
              {email}
            </a>
          </div>
          <div className="contact__info">
            {isClient ? (
              <p dangerouslySetInnerHTML={{ __html: scheduleHtml }} />
            ) : (
              <p>{scheduleHtml.replace(removeAllTags, "")}</p>
            )}
          </div>
        </div>
        <div className="connect-list">
          {isMobile && (
            <a
              href={contactByMessengerUrl()}
              className="connect-way connect-list__item"
            >
              <span className="connect-way__icon">
                <img src={messengerImg} alt="messenger" />
              </span>
              <span className="connect-way__text">Messenger</span>
            </a>
          )}
          <a
            className="connect-way connect-list__item"
            onClick={() => openHubspotChat()}
          >
            <span className="connect-way__icon">
              <img src={chatImg} alt="chat" />
            </span>
            <span className="connect-way__text">Online chat</span>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state),
  skype: getContactByKey(state, "skype"),
  viber: getContactByKey(state, "viber"),
  whatsapp: getContactByKey(state, "whatsapp")
});

export default connect(mapStateToProps)(ContactUsSupport);
