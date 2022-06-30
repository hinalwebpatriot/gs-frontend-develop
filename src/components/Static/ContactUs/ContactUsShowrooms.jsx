import React from "react";
import ShowroomTab from "../../_common/ShowroomBlock/Items/ShowroomTab";
import YouTubeAutoPlay from "../../_common/YouTube/YouTubeAutoPlay";
import wifiIcon from "../../../img/svg/shr1.svg";
import parkingIcon from "../../../img/svg/shr2.svg";
import coffeeIcon from "../../../img/svg/shr3.svg";
import CalendarSvg from "../../../img/jsSvg/CalendarSvg";
import ShowroomMap from "../../_common/GoogleMaps/ShowroomMap";
import { hubspotBookingLink } from "../../../config/hubspot";
import PhoneSvg from "../../../img/jsSvg/PhoneSvg";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";

// import sanitizeHtml from "sanitize-html";
import IconFA from '../../_common/IconFA';
import { removeAllTags } from '../../../utils/htmlRegex';

export default class ContactUsShowrooms extends React.Component {
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
    const { currentTab, changeTab, tabs, showroom, indexTab = 0 } = this.props;
    const {
      image,
      youtube_link,
      phone,
      schedule,
      location = {},
      title,
      address,
      description,
      button_title,
      header,
      main_title
    } = showroom;
    // const isParramatta = title === 'Parramatta';
    const { start, middle, end } = header;

    return (
      <div className="contact-showrooms">
        <p className="theme-subtitle">{main_title ? main_title : 'Visit our Showroom'}</p>
        <ShowroomTab
          tab={tabs[indexTab]}
          className="showroom-tab showroom-tab--type2"
        />
        <div className="showroom-header">
          <span className="showroom-header__brand">{start} </span>
          <span className="showroom-header__title">
            {middle} <span>{ end }</span>
          </span>
        </div>
        {(image.includes('.jpg') || image.includes('.png') || youtube_link) && (
          <div className="showroom-img showroom-img--type2">
            {youtube_link ? (
              <YouTubeAutoPlay
                videoId={youtube_link}
                containerClassName="col"
                videoSettings="SHOWROOM_VIDEO" />
            ) : (
              <img src={image} alt="Contact us showroom " />
            )}
          </div>
        )}
        <div className="mobile-contact-btns  ">
          <a href={`tel:${phone.number}`} className="theme-btn theme-btn--type3">
            <span className="btn-icon">
              <PhoneSvg />
            </span>
            Call us
          </a>
          <a
            href={hubspotBookingLink}
            target="_blank"
            className="theme-btn theme-btn--book"
          >
            <span className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="14"
                height="14"
                viewBox="0 0 14 14"
              >
                <defs>
                  <path
                    id="r1eja"
                    d="M712.951 969.707a.317.317 0 0 0-.317-.317h-1.107a.317.317 0 0 0-.317.317v1.107c0 .175.142.317.317.317h1.107a.317.317 0 0 0 .317-.317v-1.107z"
                  />
                  <path
                    id="r1ejb"
                    d="M715.711 969.707a.317.317 0 0 0-.317-.317h-1.107a.317.317 0 0 0-.317.317v1.107c0 .175.142.317.317.317h1.107a.317.317 0 0 0 .317-.317z"
                  />
                  <path
                    id="r1ejc"
                    d="M718.481 969.707a.317.317 0 0 0-.317-.317h-1.107a.317.317 0 0 0-.317.317v1.107c0 .175.142.317.317.317h1.107a.317.317 0 0 0 .317-.317z"
                  />
                  <path
                    id="r1ejd"
                    d="M712.951 972.477a.317.317 0 0 0-.317-.317h-1.107a.317.317 0 0 0-.317.317v1.107c0 .175.142.317.317.317h1.107a.317.317 0 0 0 .317-.317v-1.107z"
                  />
                  <path
                    id="r1eje"
                    d="M715.711 972.477a.317.317 0 0 0-.317-.317h-1.107a.317.317 0 0 0-.317.317v1.107c0 .175.142.317.317.317h1.107a.317.317 0 0 0 .317-.317z"
                  />
                  <path
                    id="r1ejf"
                    d="M718.481 972.477a.317.317 0 0 0-.317-.317h-1.107a.317.317 0 0 0-.317.317v1.107c0 .175.142.317.317.317h1.107a.317.317 0 0 0 .317-.317v-1.107z"
                  />
                  <path
                    id="r1ejg"
                    d="M720.044 974.099a.541.541 0 0 1-.541.541h-9.354a.541.541 0 0 1-.541-.541v-5.118c0-.3.242-.542.541-.542h9.354c.299 0 .541.243.541.542v5.118zm.415-10.543v1.69c0 .765-.62 1.38-1.383 1.38h-.873a1.388 1.388 0 0 1-1.393-1.38v-1.696h-3.935v1.697c0 .764-.628 1.38-1.392 1.38h-.873a1.38 1.38 0 0 1-1.384-1.38v-1.69a1.258 1.258 0 0 0-1.216 1.25v9.909c0 .691.56 1.26 1.253 1.26h11.16c.691 0 1.253-.57 1.253-1.26v-9.908c0-.68-.549-1.232-1.217-1.252z"
                  />
                  <path
                    id="r1ejh"
                    d="M710.605 965.72h.863a.474.474 0 0 0 .475-.474v-2.772a.475.475 0 0 0-.475-.474h-.863a.474.474 0 0 0-.475.474v2.772c0 .262.212.474.475.474z"
                  />
                  <path
                    id="r1eji"
                    d="M718.195 965.72h.863a.474.474 0 0 0 .475-.474v-2.772a.474.474 0 0 0-.475-.474h-.863a.475.475 0 0 0-.475.474v2.772c0 .262.213.474.475.474z"
                  />
                </defs>
                <g>
                  <g transform="translate(-708 -962)">
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1eja" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1ejb" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1ejc" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1ejd" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1eje" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1ejf" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1ejg" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1ejh" />
                    </g>
                    <g>
                      <use fill="#ef4056" xlinkHref="#r1eji" />
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            Book appointment
          </a>
        </div>
        <div className="showroom-contact showroom-contact--type2 ">
          <div className="room-contact xs-hide">
            <div className="contact">
              <div className="contact__title">
                <span className="contact-icon phone">
                  <PhoneSvg />
                </span>
                <a href={`tel:${phone.number}`} className="contact-name ">
                  {phone.number}
                </a>
              </div>
            </div>
            <div className="contact-book">
              <a
                href={hubspotBookingLink}
                target="_blank"
                className="theme-btn"
              >
                <span className="btn-icon">
                  <CalendarSvg />
                </span>
                Book appointment
              </a>
            </div>
          </div>
          <div className="room-contact">
            <div className="contact">
              <div className="contact__title">
                <span className="contact-icon">
                  <IconFA icon={faClock}/>
                </span>
                <span className="contact-name ">
                  Open hours{/*Open now <span>till 9 PM</span>*/}
                </span>
              </div>
              <div className="contact__info">
                {isClient ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: schedule }}
                  />
                ) : (
                  <p>{schedule.replace(removeAllTags, '')}</p>
                )}
                {/*<p>{schedule}</p>*/}
                {/*<p>Thu 10AM – 8PM,</p>*/}
                {/*<p>Sat - Sun 10AM - 10PM</p>*/}
              </div>
            </div>
          </div>
          <div className="room-contact xs-hide">
            <div className="showroom-icons">
              <div className="showroom-icons__item">
                <img src={wifiIcon} alt="wifi" />
              </div>
              <div className="showroom-icons__item">
                <img src={parkingIcon} alt="parking" />
              </div>
              <div className="showroom-icons__item">
                <img src={coffeeIcon} alt="coffee" />
              </div>
            </div>
          </div>
        </div>
        <div className="showroom-map showroom-map--contact xs-hide">
          <ShowroomMap location={location} initialZoom={14} />
        </div>
        <div className="showroom-contact showroom-contact--type3 ">
          <div className="room-contact ">
            <div className="contact">
              <div className="contact__title">
                <span className="contact-icon">
                  <IconFA icon={faMapMarkerAlt}/>
                </span>
                <span className="contact-name ">{title}</span>
              </div>
              <div className="contact__info contact__info--type2">
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="room-contact">
            <div className="contact">
              <div className="contact__info">
                <p>{description}</p>
                {/*<p>Our retail store is located at</p>*/}
                {/*<p>*/}
                {/*<span className="fw400">Shop 34-36 on Level 2</span> of the prestigious*/}
                {/*</p>*/}
                {/*<p>QVB Shopping Centre</p>*/}
              </div>
            </div>
          </div>
        </div>
        <div className="showroom-map showroom-map--contact xs-show ">
          <ShowroomMap location={location} initialZoom={13} />
        </div>
        <div className="room-contact xs-show">
          <div className="showroom-icons">
            <div className="showroom-icons__item">
              <img src={wifiIcon} alt="wifi" />
            </div>
            <div className="showroom-icons__item">
              <img src={parkingIcon} alt="parking" />
            </div>
            <div className="showroom-icons__item">
              <img src={coffeeIcon} alt="coffee" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
