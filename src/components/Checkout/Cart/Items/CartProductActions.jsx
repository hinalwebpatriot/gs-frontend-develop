import React from "react";
import FavoriteButton from "../../../_common/Buttons/FavoriteButton";
import favoriteSelectors from "../../../_selectors/favoriteSelectors";
import { connect } from "react-redux";
import { removeFromCart } from "../CartActions";
import EditSvg from "../../../../img/jsSvg/EditSvg";
import TrashSvg from "../../../../img/jsSvg/TrashSvg";
import { get } from "lodash";
import routing from "../../../../config/routing";
import { flowRight as compose } from "lodash";
import { withRouter } from "react-router-dom";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

class CartProductActions extends React.Component {
  handleDelete = () => {
    const { type, data, removeFromCart } = this.props;

    removeFromCart({
      type,
      id: data.id,
      ringSize: get(data, "selected_size.slug", undefined)
    });

    GoogleEE.removeFromCart({
      products: [data],
      quantity: 1
    })
  };

  handleChange = () => {
    const { type, data, removeFromCart, history } = this.props;
    let link;

    switch (type) {
      case "diamond":
        link = routing().diamondsFeed;
        break;
      case "engagement":
        link = routing().engagementFeed;
        break;
      case "wedding":
        link = routing().weddingFeed;
        break;
      case "product":
        link = routing(data.category.slug).catalogFeed;
        break;
    }

    removeFromCart({
      type,
      id: data.id,
      ringSize: get(data, "selected_size.slug", undefined),
      noMessage: true
    });

    GoogleEE.removeFromCart({
      products: [data],
      quantity: 1
    });

    history.push(link);
  };

  render() {
    const { type, data, inFavorite } = this.props;
    return (
      <div className="cart-prod-actions">
        <button className="cart-prod-action" onClick={this.handleChange}>
          <span className="extra-icon cart-prod-action__icon">
            <EditSvg />
          </span>
          <span className="cart-prod-action__text">Change</span>
        </button>
        <button className="cart-prod-action" onClick={this.handleDelete}>
          <span className="extra-icon cart-prod-action__icon">
            <TrashSvg />
          </span>
          <span className="cart-prod-action__text">Delete</span>
        </button>

        <FavoriteButton
          className="cart-prod-action"
          iconClassName="extra-icon cart-prod-action__icon"
          height="14px"
          width="17px"
          type={type}
          data={data}
        >
          <span className="cart-prod-action__text">
            {inFavorite ? "Remove from favourites" : "Add to favourites"}
          </span>
        </FavoriteButton>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let type;

  switch (props.data.product_type) {
    case "diamonds":
      type = "diamond";
      break;
    case "engagement-rings":
      type = "engagement";
      break;
    case "wedding-rings":
      type = "wedding";
      break;
    case "product":
    case "pendant":
    case  "earrings":
    case "bracelets":
    case "products":
      type = "product";
      // type = state.feed.catalogFeed.catalogCategory;
      break;
    default: return "error Switch CartProductActions"
  }


  return {
    type: type,
    data: props.data,
    inFavorite: favoriteSelectors.tabKeys(state, type).includes(props.data.id)
  };
};

const mapDispatchToProps = {
  removeFromCart
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CartProductActions);
