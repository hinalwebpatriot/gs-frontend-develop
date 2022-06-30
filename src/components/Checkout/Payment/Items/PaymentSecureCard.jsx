import React from "react";
import SecureLockSvg from "../../../../img/jsSvg/SecureLockSvg";

const PaymentSecureCard = () => (
  <div className="card-info">
    <div className="card-data">
      <div className="card-data__icon">
        <SecureLockSvg />
      </div>
      <div className="card-data__info">
        <p className="theme-subtitle theme-subtitle--smaller">
          Your card data is secure
        </p>
        <p className="card-data__text">
            We don’t store cardholder information on our servers. All payments are
            encrypted and securely processed by{" "}
            <a href="#">Adyen</a>
        </p>
      </div>
    </div>
  </div>
);

export default PaymentSecureCard;
