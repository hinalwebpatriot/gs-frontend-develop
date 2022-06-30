import React from "react";
import CustomTooltip from "../../../_common/CustomTooltip";

const ConfirmationSuccessStatus = ({ id }) => (
  <div className="order-overview order-overview--mob-indent">
    <p className="theme-subtitle theme-subtitle--medium">
      Order in processing
      <CustomTooltip path="" />
    </p>
    <div className="order-overview__phone">
      <p># {id}</p>
    </div>
    <div className="order-overview__info">
      <p className="theme-subtitle">What happens next</p>
      <p className="info-p info-p--type2 info-p--type2--grey">
        One of our experts will get in touch with you shortly
      </p>
    </div>
  </div>
);

export default ConfirmationSuccessStatus;
