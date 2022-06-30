import React, { Fragment } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import IconFA from './IconFA';

const ErrorTemplate = ({ text }) => (
  <Fragment>
    <span className="valid-line" />
    <span className="valid-icon">
      <IconFA icon={faTimes}/>
    </span>
    <span className="error-text">{text}</span>
  </Fragment>
);

const SuccessTemplate = ({successText}) => (
  <Fragment>
    <span className="valid-line" />
    <span className="valid-icon">
      <IconFA icon={faCheck}/>
    </span>
    { successText && <span className="success-text">{successText}</span> }
  </Fragment>
);

const TextInputField = ({
  forwardRef,
  label,
  error = "",
  isValid,
  textArea,
  children,
  labelClassName = "field-label",
  placeholder,
  isDiscountModalInput,
  successText = '',
  ...rest
}) => {
  const warning = error.length !== 0;
  const isChecked = isValid !== "none";

  return (
    <div className="field">
      {label && <span className={labelClassName}>{label}</span>}
      <div
        className={`field-wrap ${isChecked &&
          (warning ? "not-valid" : "valid")}`}
      >
        {textArea ? (
          <Fragment>
            <textarea
              className="form-item form-item--area"
              ref={forwardRef}
              {...rest}
            />
            {children}
          </Fragment>
        ) : (
          <Fragment>
            <input className={ isDiscountModalInput ? "form-item discount-modal" : "form-item"} ref={forwardRef} {...rest} placeholder={placeholder}/>
            {children}
          </Fragment>
        )}
        {isChecked &&
          (warning ? <ErrorTemplate text={error} /> : <SuccessTemplate successText={successText}/>)}
      </div>
    </div>
  );
};

export default TextInputField;
