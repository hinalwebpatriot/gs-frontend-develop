import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";

const ContactUsLabels = ({ data }) => (
  <div className="contact-labels">
    {data.map(item => {
      return (
        <Link
          to={routing(item.link).staticPage}
          className="contact-label"
          key={`tag_${item.id}`}
        >
          {item.title}
        </Link>)
      }
    )}
  </div>
);

export default ContactUsLabels;
