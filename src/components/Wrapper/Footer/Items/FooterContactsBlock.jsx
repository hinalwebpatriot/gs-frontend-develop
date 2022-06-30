import React from "react";
import EnvelopeSvg from "../../../../img/jsSvg/EnvelopeSvg";
import { connect } from "react-redux";
import { getContactByKey } from "../../../_selectors/showroomBlockSelectors";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import PhoneSvg from "../../../../img/jsSvg/PhoneSvg";
import IconFA from '../../../_common/IconFA';

// noinspection HtmlUnknownAnchorTarget
// noinspection HtmlUnknownAnchorTarget
const FooterContactsBlock = ({ phone, email, handleScrollToShowrooms, showRoomRef }) => (
  <div className="f-contact">
    <span onClick={() => handleScrollToShowrooms(showRoomRef)} style={{cursor: 'pointer'}} className="f-contact__item">
      <span>
        <IconFA icon={faMapMarkerAlt}/>
      </span>
      Showroom
    </span>
    <a href={`tel:${phone}`} className="f-contact__item phone">
      <span>
        <PhoneSvg />
      </span>
      {phone}
    </a>
    <a href={`mailto:${email}`} className="f-contact__item">
      <span>
        <EnvelopeSvg />
      </span>
      {email}
    </a>
  </div>
);

const mapStateToProps = state => ({
  phone: getContactByKey(state, "phone"),
  email: getContactByKey(state, "email")
});

export default connect(mapStateToProps)(FooterContactsBlock);
