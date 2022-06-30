import React, { Fragment } from "react";
import CartSection from "./Items/CartSection";
import EngagementTopPicks from "../../Feed/Engagement/List/Items/EngagementTopPicks";

export default class CartPage extends React.Component {
  render() {
    return (
      <Fragment>
        <CartSection />
        <div className="container">
          <EngagementTopPicks />
        </div>
      </Fragment>
    );
  }
}
