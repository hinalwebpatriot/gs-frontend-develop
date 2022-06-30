import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import IconFA from '../_common/IconFA';

const AlertTemplate = ({
  classNames,
  condition,
  id,
  styles,
  customFields,
  handleClose
}) => (
  <div
    className={`${classNames} notification ${
      condition === "error" ? "red2" : "green2"
    }`}
    id={id}
    style={styles}
  >
    <i className="s-alert-close " id="close_btn" onClick={handleClose} />
    <p className="notification_title">
      {condition === "error" && (
        <span className="fa_wrap">
          <IconFA icon={faExclamationTriangle}/>
        </span>
      )}
      {condition === "success" && (
        <span className="fa_wrap">
          <IconFA icon={faCheckCircle}/>
        </span>
      )}
      {customFields.title}
    </p>
    <p className="notification_desc">
      {customFields.message}
      {/* {customFields.linkText && <Link to={customFields.link}>{customFields.linkText}</Link>} */}
      <br />
      {customFields.linkText && (
        <a href={customFields.link}>{customFields.linkText}</a>
      )}
    </p>
  </div>
);

export default AlertTemplate;
