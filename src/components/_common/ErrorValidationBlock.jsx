import React from "react";

const ErrorValidationBlock = ({ errors, backendErrors, verifyText, handleResendEmail, resendMessage, isResendEmail }) => {
  const clientErrors = Object.values(errors);
  const serverErrors = [];

  const parseServerErrors = () => {
    if (backendErrors) {
      for (let key in backendErrors) {
        if (key !== 'resend_label' && key !== 'step') {
          serverErrors.push(backendErrors[key])
        }
      }
    }
  };
  if (backendErrors) parseServerErrors();
  
  if (!clientErrors.length && !serverErrors.length) {
    return null;
  }
  
  if (resendMessage) {
    return <p className={isResendEmail ? 'green--text' : ''}>{resendMessage}</p>
  }

  return (
    <div className="error-block">
      {clientErrors.length
        ? clientErrors.map(item => <p key={`err_${item}`}>{item}</p>)
        : null}
      {serverErrors.length
        ? serverErrors.map(item => <p key={`err_${item}`}>{item}</p>)
        : null}
      {verifyText ? <p className="resend-email" onClick={handleResendEmail}>{verifyText}</p> : null}
    </div>
  );
};

export default ErrorValidationBlock;
