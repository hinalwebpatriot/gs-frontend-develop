import React from "react";
import { Tooltip } from "antd";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import TooltipStore from "../../config/TooltipStore";
import { isServer } from "../../utils/isServer";
import IconFA from './IconFA';

const CustomTooltipHref = ({ position = "top", trigger = "click", path }) => {
  if (isServer) {
    return null;
  }

  return (
    <Tooltip
      placement={position}
      trigger={trigger}
      title={TooltipStore.get(path)}
    >
      <span className="info-icon">
        <span>
          <IconFA icon={faInfoCircle}/>
        </span>
      </span>
    </Tooltip>
  );
};

export default CustomTooltipHref;
