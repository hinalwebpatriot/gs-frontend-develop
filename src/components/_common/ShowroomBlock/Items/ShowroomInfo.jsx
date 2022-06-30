import React from "react";
import PhoneSvg from "../../../../img/jsSvg/PhoneSvg";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
// import sanitizeHtml from "sanitize-html";
import IconFA from '../../IconFA';

export default class ShowroomInfo extends React.Component {
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
    const {
      phone = {},
      schedule,
      description,
      title,
      address
    } = this.props.data;
    return (
      <div className="showroom-contact">
        <div className="contact">
          <div className="contact__title">
            <span className="contact-icon">
              <PhoneSvg />
            </span>
            <a href={`tel:${phone.number}`} className="contact-name ">
              {phone.number}
            </a>
          </div>
          <div className="contact__info">
            <span>{phone.description}</span>
          </div>
        </div>
        <div className="contact">
          <div className="contact__title">
            <span className="contact-icon">
              <IconFA icon={faClock}/>
            </span>
            <span className="contact-name ">
              Open hours
              {/*Open now <span>till 9 PM</span>*/}
            </span>
          </div>
          <div className="contact__info">
            {isClient ? (
              <p dangerouslySetInnerHTML={{ __html: schedule }} />
            ) : (
              <p>{schedule}</p>
            )}
            {/*<textarea value={schedule} readOnly disabled />*/}

            {/*<p>Thu 10AM – 8PM,</p>*/}
            {/*<p>Sat - Sun 10AM - 10PM</p>*/}
          </div>
        </div>
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
        <div className="contact">
          <div className="contact__info">
            <p>{description}</p>
            {/*<p>Our retail store is located at</p>*/}
            {/*<p className="fw400">Shop 34-36 on Level 2</p>*/}
            {/*<p>of the prestigious</p>*/}
          </div>
        </div>
      </div>
    );
  }
}
