import React, { Fragment } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import IconFA from '../../../_common/IconFA';

const ErrorTemplate = ({ text }) => (
  <Fragment>
    <span className="valid-line" />
    <span className="valid-icon">
      <IconFA icon={faTimes}/>
    </span>
    {/*<span className="error-text">{text}</span>*/}
  </Fragment>
);

const SuccessTemplate = () => (
  <Fragment>
    <span className="valid-line" />
    <span className="valid-icon">
      <IconFA icon={faCheck}/>
    </span>
  </Fragment>
);

const DeliveryInputField = ({
  forwardRef,
  label,
  error = "",
  isValid,
  textArea,
  children,
  indent = true,
  ...rest
}) => {
  const warning = error.length !== 0;
  const isChecked = isValid !== "none";

  return (
    <div
      className={`${textArea ? "col-12" : "col-lg-6"} ${
        indent ? "col-indent" : ""
      }`}
    >
      <span className="field-label field-label--type2">{label}</span>
      <div
        className={`field-wrap ${isChecked &&
          (warning ? "not-valid" : "valid")}`}
      >
        {textArea ? (
          <textarea
            className="form-item form-item--area"
            maxLength="1000"
            ref={forwardRef}
            {...rest}
          />
        ) : (
          <input
            className="form-item"
            maxLength="255"
            ref={forwardRef}
            {...rest}
          />
        )}
        {isChecked &&
          (warning ? <ErrorTemplate text={error} /> : <SuccessTemplate />)}
      </div>
      {children}
    </div>
  );
};

export default DeliveryInputField;
