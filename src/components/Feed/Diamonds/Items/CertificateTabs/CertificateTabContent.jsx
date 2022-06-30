import React from "react";

const CertificateTabContent = ({ link }) => (
  <div className="nav-drop">
    <div className="nav-drop__content">
      <div className="sertificate-hint">
        <img src={link} alt="" />
      </div>
    </div>
  </div>
);

export default CertificateTabContent;
