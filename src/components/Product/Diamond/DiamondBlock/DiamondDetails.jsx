import React, { Fragment } from "react";
import DetailsTableRow from "../../Shared/DetailsTableRow";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../../_common/IconFA';

export default class DiamondDetails extends React.Component {
  state = {
    isExpand: false
  };

  handleExpand = () => {
    this.setState({ isExpand: true });
  };

  render() {
    const {
      shape = {},
      color = {},
      polish = {},
      clarity = {},
      symmetry = {},
      fluorescence = {},
      cut = {},
      culet = {},
      dimensions = "",
      depth = "",
      carat = "",
      table = "",
      girdle = ""
    } = this.props.data.options;

    const { stock_number = "", certificate_number = "" } = this.props.data;
    const { isMobile } = this.props;
    const { isExpand } = this.state;

    const OtherDetails = () => (
      <>
        <DetailsTableRow
          title="Table"
          text={table ? table + "%" : "-"}
          tooltip="diamond.table"
        />
        <DetailsTableRow
          title="Depth"
          text={depth ? depth + "%" : "-"}
          tooltip="diamond.depth"
        />
        <DetailsTableRow
          title="Girdle"
          text={girdle || "-"}
          tooltip="diamond.girdle"
        />
        <DetailsTableRow
          title="Culet"
          text={culet ? culet.title : "-"}
          tooltip="diamond.culet"
        />
        <DetailsTableRow
          title="Certificate number"
          text={certificate_number || "-"}
          tooltip="diamond.certificate"
        />
        <DetailsTableRow
          title="Stock number"
          text={stock_number || "-"}
          tooltip="diamond.stockNumber"
        />
      </>
    );

    return (
      <div className="prod-info-box">
        <div className="product-table-wrap">
          <p className="theme-subtitle">DIAMOND Details</p>
          <table className="product-table">
            <tbody>
              <DetailsTableRow
                title="Shape"
                text={shape ? shape.title : "-"}
                tooltip="diamond.shape"
              />
              <DetailsTableRow
                title="Carat"
                text={carat || "-"}
                tooltip="diamond.carat"
              />
              <DetailsTableRow
                title="Color"
                text={color ? color.title : "-"}
                tooltip="diamond.color"
              />
              <DetailsTableRow
                title="Clarity"
                text={clarity ? clarity.title : "-"}
                tooltip="diamond.clarity"
              />
              {shape && shape.slug === 'round' && <DetailsTableRow
                title="Cut"
                text={cut ? cut.title : "-"}
                tooltip="diamond.cut"
              /> }
              <DetailsTableRow
                title="Polish"
                text={polish ? polish.title : "-"}
                tooltip="diamond.polish"
              />
              <DetailsTableRow
                title="Symmetry"
                text={symmetry ? symmetry.title : "-"}
                tooltip="diamond.symmetry"
              />
              <DetailsTableRow
                title="Fluorescence"
                text={fluorescence ? fluorescence.title : "-"}
                tooltip="diamond.fluorescence"
              />
              <DetailsTableRow
                title="Dimensions"
                text={dimensions || "-"}
                tooltip="diamond.dimensions"
              />

              {!isMobile && <OtherDetails />}

              {isMobile && isExpand && <OtherDetails />}
            </tbody>
          </table>

          {isMobile && !isExpand && (
            <div className="xs-full">
              <button className="full-detail-btn" onClick={this.handleExpand}>
                Full details
                <span>
                  <IconFA icon={faCaretRight}/>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
