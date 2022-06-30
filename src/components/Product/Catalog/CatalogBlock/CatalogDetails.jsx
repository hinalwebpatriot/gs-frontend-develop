import React, { Fragment } from "react";
import DetailsTableRow from "../../Shared/DetailsTableRow";
import DiamondSuggestion from "../../Shared/DiamondSuggestion";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../../_common/IconFA';

export default class CatalogDetails extends React.Component {
  state = {
    isExpand: false
  };

  handleExpand = () => {
    this.setState({ isExpand: true });
  };

  render() {
    const { isExpand } = this.state;
    const { data, isMobile, currentSize } = this.props;
    const {
      metal = {},
      band_width = {},
      min_size = {},
      max_size = {},
      brand = {},
      stone_shape = {},
      stone_size = {},
      side_setting_type = "",
      setting_type = "",
      carat_weight = '',
      average_ss_colour = '',
      average_ss_clarity = '',
      approx_stones = ''
    } = data.selected.options;
    const { slug } = this.props.data.selected.category;
    const { sku } = this.props.data.selected; 
    const custom_fields = this.props.data.selected.custom_fields;
    //TODO: render this list of parts through an array
    const hide = (slug === 'pendant' || slug === 'earrings')
      && ['GSP20163457', 'GSP20072599', 'GSD600WG', 'GSD600RG',
      'GSD600YG', 'GSD500WG']
      .indexOf(sku) === -1 && ['GSD601', 'GSD602', 'GSD501', 'GSD502', 'GSD603', 'GSD500', 'GSD603'].indexOf(sku.slice(0, -2)) === -1;

    const allowedSKU = ['GSD20217495', 'GSD20217075', 'GSD20217068', 'GSD20217105', 'GSD20216559', 'GSD20216542', 'GSD20216504'];

    const OtherDetails = () => (
      <Fragment>
          {
              stone_shape.title ? <DetailsTableRow
                  title="Stone shape"
                  text={stone_shape.title}
                  tooltip={`${slug}.stoneShape`}
                  isShow={false}
              /> : null
          }
          {
              +stone_size.count !== 0 && !hide 
                && ['GSD601', 'GSD602', 'GSD501', 'GSD502', 'GSD603', 'GSD500', 'GSD603'].indexOf(sku.slice(0, -2)) === -1 
                ? <DetailsTableRow
                    title="Stone size"
                    text={`${stone_size.count} ${stone_size.dimension}`}
                    tooltip={`${slug}.stoneSize`}
                  /> : null
          }
          {
              +stone_size.count !== 0 && ['GSD20216542', 'GSD20216559', 'GSD20216504'].includes(sku) 
                  ? <DetailsTableRow
                    title="Stone size"
                    text={`${stone_size.count} ${stone_size.dimension}`}
                    tooltip={`${slug}.stoneSize`}
                  /> : null
          }
          {
              !!side_setting_type && !hide ? <DetailsTableRow
                  title="Side settings type"
                  text={side_setting_type}
                  tooltip={`${slug}.sideSettingType`}
              /> : null
          }
          {
              !!setting_type ? <DetailsTableRow
                  title="Setting type"
                  text={setting_type}
                  tooltip={`${slug}.settingType`}
              /> : null
          }
          {
              !!brand.title && !hide ? <DetailsTableRow
                  title="Brand"
                  text={brand.title}
                  tooltip={`${slug}.brand`}
              /> : null
          }
          {
              !!carat_weight && (!hide || allowedSKU.includes(sku)) ? <DetailsTableRow
                  title={(slug == "earrings") ? "Total approx carat weight" : "Approx Carat Weight"}
                  text={carat_weight}
                  tooltip={`${slug}.approxCarat`}
              /> : null
          }
          {
              !!average_ss_colour && (!hide || allowedSKU.includes(sku)) ? <DetailsTableRow
                  title="Average Side Stone Colour"
                  text={average_ss_colour}
                  tooltip={`${slug}.avgStoneColor`}
              /> : null
          }

          {
              !!average_ss_clarity && (!hide || allowedSKU.includes(sku)) ? <DetailsTableRow
                  title="Average Side Stone Clarity"
                  text={average_ss_clarity}
                  tooltip={`${slug}.avgStoneClarity`}
              /> : null
          }

          {
              !!approx_stones && !hide && sku !== 'GSD500WG' ? <DetailsTableRow
                  title="Approx No. of Stones"
                  text={approx_stones}
                  tooltip={`${slug}.approxStoneCount`}
              /> : null
          }

        {/*<DetailsTableRow*/}
        {/*  title="Engraving inscription"*/}
        {/*  text={inscription || "-"}*/}
        {/*  tooltip="engraving.inscription"*/}
        {/*/>*/}
      </Fragment>
    );
    const custom_fields_rows = custom_fields && custom_fields.map(({label, value}) => (
      !!value && (!hide || ['GSD20217105', 'GSD20217495', 'GSD20216542', 'GSD20216559', 'GSD20216504'].includes(sku))
      ? <DetailsTableRow
          title={label}
          text={value}
          tooltip={''}
        /> : null
    ));

    let sizeText = '';

    if (min_size && max_size) {
      if (typeof min_size.title === "string") {
        sizeText = `${min_size.title}-${max_size.title}`;
      } else {
        sizeText = `${min_size.title[currentSize]}-${max_size.title[currentSize]}`
      }
    }

    return (
      <div className="prod-info-box">
        <div className="product-table-wrap">
          <p className="theme-subtitle">Product details</p>
          <table className="product-table">
            <tbody>
            {
                !!metal.title ? <DetailsTableRow
                    title="Metal"
                    text={metal.title}
                    tooltip={`${slug}.metal`}
                /> : null
            }
            {
                +band_width.count !== 0 && !hide ? <DetailsTableRow
                    title="Band width"
                    text={`${band_width.count} ${band_width.dimension}`}
                    tooltip={`${slug}.bandWidth`}
                /> : null
            }

            {
                (sizeText && !hide) ? <DetailsTableRow
                    title="Available ring sizes"
                    text={sizeText}
                    tooltip={`${slug}.ringSizes`}
                /> : null
            }

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
