import React, { Fragment } from "react";
import DetailsTableRow from "../../Shared/DetailsTableRow";
import WeddingStoryForCollection from "../../Shared/WeddingStoryForCollection";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import capitalizeString from "../../../../utils/capitalizeString";
import IconFA from '../../../_common/IconFA';
import { get } from "lodash";
import { StartWithDiamond, StartWithSettingSvg } from "../../../../img/new_icons/SVG/designOwn";
// import DiamondSuggestion from '../../Shared/DiamondSuggestion';


export default class WeddingDetails extends React.Component {
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
      carat_weight,
      approx_stones,
      thickness
    } = data.selected.options;
    const { sku } = this.props.data.selected;
    const custom_fields = this.props.data.selected.custom_fields;
    const metalSlug = metal.slug;

    const gender = get(data, 'selected.options.gender', '-');

    const hideApproxStones = ['GSD20205652', 'GSD20164102', 'GSD20163723', 'GSD20163730', 'GSD20163747'].includes(sku);

    const OtherDetails = () => (
      <Fragment>
        <DetailsTableRow title="Gender" text={capitalizeString(gender)} />
        {/*<DetailsTableRow title="Stone size" text={stone_size ? `${stone_size.count} ${stone_size.dimension}` : ''} />*/}
        {/*<DetailsTableRow title="Side settings type" text={side_setting_type || ''} />*/}
        {/*<DetailsTableRow title="Setting type" text={setting_type || ''} />*/}
        <DetailsTableRow
          title="Collection"
          text={ring_collection ? ring_collection.title : "-"}
          tooltip="weddingRing.collection"
        />
        <DetailsTableRow
          title="Approx Carat Weight"
          text={carat_weight || "-"}
          tooltip="weddingRing.approxCarat"
        />
        {!hideApproxStones && (
          <DetailsTableRow
            title="Approx No. of Stones"
            text={approx_stones || "-"}
            tooltip="weddingRing.approxStoneCount"
          />
        )}
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
                tooltip="weddingRing.metal"
              />
              <DetailsTableRow
                title="Band width"
                text={
                  band_width
                    ? `${band_width.count} ${band_width.dimension}`
                    : "-"
                }
                tooltip="weddingRing.bandWidth"
              />

              {
                ['18ct-white-gold', '18ct-yellow-gold', '18ct-rose-gold', 
                '9ct-white-gold', '9ct-yellow-gold', '9ct-rose-gold'].indexOf(metalSlug) !== -1 
                && gender === 'male' && <DetailsTableRow
                    title="Thickness"
                    text={
                        thickness
                            ? `${thickness.count} ${thickness.dimension}`
                            : "-"
                    }
                    tooltip="weddingRing.thickness"
                />
              }
              <DetailsTableRow
                title="Available ring sizes"
                text={
                  min_ring_size && max_ring_size
                    ? `${min_ring_size.title[currentSize]}-${
                        max_ring_size.title[currentSize]
                      }`
                    : ""
                }
                tooltip="weddingRing.ringSizes"
              />
              {/*<DetailsTableRow title="Certification" text={'GIA'} />*/}

              {!isMobile && <OtherDetails />}
              {!isMobile && custom_fields_rows}
              {isMobile && isExpand && <OtherDetails />}
              {isMobile && isExpand && custom_fields_rows}

              <DetailsTableRow
                title="Engraving inscription"
                text={inscription || "-"}
                tooltip="weddingRing.ringSizes"
              />

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
        <WeddingStoryForCollection data={ring_collection} />
      </div>
    );
  }
}
