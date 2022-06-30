import React, { Fragment } from "react";
import DetailsTableRow from "../../Shared/DetailsTableRow";
import DiamondSuggestion from "../../Shared/DiamondSuggestion";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../../_common/IconFA';

export default class EngagementDetails extends React.Component {
  state = {
    isExpand: false
  };

  handleExpand = () => {
    this.setState({ isExpand: true });
  };

  render() {
    const { isExpand } = this.state;
    const { currentSize, data, isMobile, inscription } = this.props;
    const {
      metal = {},
      band_width = {},
      min_ring_size = {},
      max_ring_size = {},
      ring_collection = {},
      stone_shape = {},
      stone_size = {},
      side_setting_type = "",
      setting_type = "",
      carat_weight = '',
      average_ss_colour = '',
      average_ss_clarity = '',
      approx_stones = '',
    } = data.selected.options;
    const custom_fields = this.props.data.selected.custom_fields;

    const OtherDetails = () => (
      <Fragment>
        <DetailsTableRow
          title="Stone shape"
          text={stone_shape ? stone_shape.title : "-"}
          tooltip="engagementRing.stoneShape"
        />
        <DetailsTableRow
          title="Stone size"
          text={
            stone_size ? `${stone_size.count} ${stone_size.dimension}` : "-"
          }
          tooltip="engagementRing.stoneSize"
        />
        <DetailsTableRow
          title="Side settings type"
          text={side_setting_type || "-"}
          tooltip="engagementRing.sideSettingType"
        />
        <DetailsTableRow
          title="Setting type"
          text={setting_type || "-"}
          tooltip="engagementRing.settingType"
        />
        <DetailsTableRow
          title="Collection"
          text={ring_collection ? ring_collection.title : "-"}
          tooltip="engagementRing.collection"
        />
        <DetailsTableRow
          title="Approx Carat Weight"
          text={carat_weight || "-"}
          tooltip="engagementRing.approxCarat"
        />
        <DetailsTableRow
          title="Average Side Stone Colour"
          text={average_ss_colour || "-"}
          tooltip="engagementRing.avgStoneColor"
        />
        <DetailsTableRow
          title="Average Side Stone Clarity"
          text={average_ss_clarity || "-"}
          tooltip="engagementRing.avgStoneClarity"
        />
        <DetailsTableRow
          title="Approx No. of Stones"
          text={approx_stones || "-"}
          tooltip="engagementRing.approxStoneCount"
        />
        <DetailsTableRow
          title="Engraving inscription"
          text={inscription || "-"}
          tooltip="engraving.inscription"
        />
      </Fragment>
    );

    const custom_fields_rows = custom_fields && custom_fields.map(({label, value}) => (
      !!value ? <DetailsTableRow
                  title={label}
                  text={value}
                  tooltip={''}
              /> : null
    ));

    return (
      <div className="prod-info-box">
        <div className="product-table-wrap">
          <p className="theme-subtitle">Product details</p>
          <table className="product-table">
            <tbody>
              <DetailsTableRow
                title="Metal"
                text={metal ? metal.title : "-"}
                tooltip="engagementRing.metal"
              />
              <DetailsTableRow
                title="Band width"
                text={
                  band_width
                    ? `${band_width.count} ${band_width.dimension}`
                    : "-"
                }
                tooltip="engagementRing.bandWidth"
              />
              <DetailsTableRow
                title="Available ring sizes"
                text={
                  min_ring_size && max_ring_size
                    ? `${min_ring_size.title[currentSize]}-${
                        max_ring_size.title[currentSize]
                      }`
                    : ""
                }
                tooltip="engagementRing.ringSizes"
              />
              {/*<DetailsTableRow title="Certification" text={'GIA'} />*/}

              {!isMobile && <OtherDetails />}
              {!isMobile && custom_fields_rows}
              {isMobile && isExpand && <OtherDetails />}
              {isMobile && isExpand && custom_fields_rows}
              
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
        <DiamondSuggestion data={data} />
      </div>
    );
  }
}
