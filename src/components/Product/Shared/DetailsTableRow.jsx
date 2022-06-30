import React from "react";
import CustomTooltip from "../../_common/CustomTooltip";

const DetailsTableRow = ({ title, text = "", tooltip, }) => {

    let trueText = text === null ? " " : text

    return(
  <tr>
    <td className="prod-opt-td">
      <span>{title}</span>
    </td>
    <td>
      <span>
        {trueText}
        {trueText.length !== 0 && tooltip && <CustomTooltip path={tooltip} />}
      </span>
    </td>
  </tr>
)};

export default DetailsTableRow;
