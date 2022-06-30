import React, { useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import TooltipStore from "../../config/TooltipStore";
import { isServer } from "../../utils/isServer";
import IconFA from './IconFA';
import { Link } from "react-router-dom";

const CustomTooltip = ({ position = "top", trigger = "click", path, href = null}) => {
  const [showToolTip, setShowToolTip] = useState(false);

  if (isServer) {
    return null;
  }

  return (
  <div className="info-container">
    <div className="info-icon" onClick={() => setShowToolTip(!showToolTip)}>
      {
        <span>
          <IconFA icon={faInfoCircle}/>
        </span>
      }
    </div>
    {
      showToolTip &&
      <div className="info-href-tooltip">
        <span>{TooltipStore.get(path)}</span>
        <Link to={href}>
          Learn  more.
        </Link>
      </div>
    }
  </div>);
};

export default CustomTooltip;
