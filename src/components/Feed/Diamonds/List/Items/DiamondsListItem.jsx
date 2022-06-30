import React from "react";
import { Link } from "react-router-dom";
import { FeedListViewButton } from "../../../../_common/Buttons/FeedListItemButtons";
import routing from "../../../../../config/routing";
import localeStore from "../../../../../config/LocalesStore";
import FavoriteButton from "../../../../_common/Buttons/FavoriteButton";
import CompareButton from "../../../../_common/Buttons/CompareButton";
import GoogleEE from "../../../../_common/GoogleEE/GoogleEE";
import ImageLoader from "../../../../_common/ImageLoader";
import { addDays, format } from 'date-fns'

class DiamondsListItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.id !== this.props.id;
  }

  handleLogClick = () => {
    const { list, position, data, id } = this.props;

    GoogleEE.productClick({
      product: data[id],
      list: list || GoogleEE.LIST_FEED,
      position: position
    });
  };

  render() {
    const { data, id, filterKeys, list, position } = this.props;
    const {
      shape = {},
      color = {},
      polish = {},
      clarity = {},
      symmetry = {},
      fluorescence = {},
      cut = {},
      manufacturer = {},
      dimensions = "",
      depth = "",
      carat = "",
      table = ""
    } = data[id].options;

    const { price = {}, preview_image, sku, in_store ,delivery_period } = data[id];

    const shipmentDate = format(addDays(new Date(), 21), 'MMMM d');

    const inStore = in_store === 1 ? true : false;
    
    return (
      <div className="list-row" onClick={this.handleLogClick}>
        <Link aria-label="link" rel="nofollow" to={routing({ slug: data[id].slug.toLowerCase(), id }).diamondProduct}>
          <div className="list-img">
            <ImageLoader
              product={data[id]}
              list={list || GoogleEE.LIST_FEED}
              position={position}
              preloadStyles={{
                height: "40px",
                margin: "12px auto"
              }}
              height={64}
              src={preview_image ? preview_image.path.feed : null}
              alt={`${shape ? shape.title : ""} Diamond ${sku}`}
            />
          </div>
           <p className="list-val__in-store-flag xs-show">{inStore && "In-store"}</p>
        </Link>
        <div className="list-left-group">
          <span className="prod-shipment diamonds-list-shipment sm-hide">
            {
              delivery_period ? delivery_period : <>Shipment: by {shipmentDate}</>
            }
          </span>
          <span className="prod-shipment diamonds-list-sku sm-hide">
            SKU {sku}
          </span>
          <p className="list-col list-col--bold sm-show" data-label="SKU">
            <span className="list-val list-val--bold">{sku}</span>
          </p>
          <div className="list-col" data-label="Shape">
             <p className="list-val__in-store-flag">
               {inStore &&  "In-store" }
            </p>
            <span className="list-val">{shape ? shape.title : "-"}</span>
          </div>
          <p className="list-col list-col--center" data-label="Carat">
            <span className="list-val" style={{color: '#000000', letterSpacing: '0px', fontSize: '13px'}}>{carat}</span>
          </p>
          <p className="list-col list-col--center" data-label="Color">
            <span className="list-val">{color ? color.title : "-"}</span>
          </p>
          <p className="list-col list-col--center" data-label="Clarity">
            <span className="list-val">{clarity ? clarity.title : "-"}</span>
          </p>
          <p className="list-col list-col--center" data-label="Cut">
            <span className="list-val">{cut ? cut.title : "-"}</span>
          </p>

          {filterKeys.includes("polish") && (
            <p className="list-col list-col--center" data-label="Polish">
              <span className="list-val ">{polish ? polish.title : "-"}</span>
            </p>
          )}
          {filterKeys.includes("symmetry") && (
            <p className="list-col list-col--center" data-label="Symmetry">
              <span className="list-val ">
                {symmetry ? symmetry.title : "-"}
              </span>
            </p>
          )}
          {filterKeys.includes("fluorescence") && (
            <p className="list-col list-col--center" data-label="Fluorescence">
              <span className="list-val ">
                {fluorescence ? fluorescence.title : "-"}
              </span>
            </p>
          )}
          {filterKeys.includes("table") && (
            <p className="list-col list-col--center" data-label="Table">
              <span className="list-val ">{table || "-"}</span>
            </p>
          )}
          {filterKeys.includes("depth") && (
            <p className="list-col list-col--center" data-label="Depth">
              <span className="list-val ">{depth || "-"}</span>
            </p>
          )}
          {filterKeys.includes("size_ratio") && (
            <p
              className="list-col list-col--wider list-col--center"
              data-label="Dimensions"
            >
              <span className="list-val ">{dimensions || "-"}</span>
            </p>
          )}
          <p className="list-col list-col--center" data-label="Certificate">
            <span className="list-val ">GIA</span>
          </p>
        </div>
        <div className="list-right-group">
          <div className="list-col list-col--center">
            <FavoriteButton
              type="diamond"
              data={data[id]}
              className="prod-action "
            />
          </div>
          <div className="list-col list-col--center ">
            <CompareButton
              type="diamond"
              data={data[id]}
              className="prod-action prod-action--type2"
            />
          </div>
          <div className="list-col list-col--price list-col--center">
            <div className="table-price-container">
              <span className="table-price">
                {price ? localeStore.formatPrice(price.count) : ""}
              </span>
              <span className="table-price-old">
                {price && price.old_count ? localeStore.formatPrice(price.old_count) : ""}
              </span>
            </div>
          </div>
          <FeedListViewButton
            path={routing({ slug: data[id].slug.toLowerCase(), id }).diamondProduct}
          />
        </div>
      </div>
    );
  }
}

export default DiamondsListItem;

