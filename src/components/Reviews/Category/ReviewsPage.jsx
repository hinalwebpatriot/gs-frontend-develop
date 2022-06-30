import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import ReviewCategoryContainer from "./ReviewCategoryContainer";
import MetaTags from '../../_common/SEO/MetaTags';
import { dataLayerPush } from '../../../utils/dataLayer';

export default class ReviewsPage extends React.Component {
  state = {
    tab: "engagement"
  };

  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  handleChangeTab = tab => {
    if (tab !== this.state.tab) {
      this.setState({
        tab
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.tab !== this.state.tab;
  }

  render() {
    const { tab } = this.state;
    const description = 'We love hearing what you have to say about our diamonds and customer service. We might design the jewellery but you’re the one who makes it meaningful. It is an honour to be a part of your story, whether it is an engagement, a gift or a self-purchase. If you could spare 30 seconds to write a review, it would be much appreciated. It also helps others discover our jewellery. Simply click the link to leave a review and star rating. Thank you!';
    return (
      <Fragment>
        <Breadcrumbs marks={[{ title: "Reviews" }]} />
        <MetaTags page="reviews" h1="Reviews" description={description}/>
        <div className="reviews-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <h1 className="section-title section-title--type2">
                  GS Diamonds Reviews
                </h1>
                <p className="section-subtitle">
                  We love hearing what you have to say about our diamonds and customer service. We might design the jewellery but you’re the one who makes it meaningful. It is an honour to be a part of your story, whether it is an engagement, a gift or a self-purchase. If you could spare 30 seconds to write a review, it would be much appreciated. It also helps others discover our jewellery. Simply click the link to leave a review and star rating. Thank you!
                </p>
              </div>
            </div>
            <div className="category-tab category-tab--type2">
              <div
                className={`category-tab__item ${
                  tab === "engagement" ? "active" : ""
                }`}
                onClick={() => this.handleChangeTab("engagement")}
              >
                Engagement rings
              </div>

              <div
                className={`category-tab__item ${
                  tab === "wedding" ? "active" : ""
                }`}
                onClick={() => this.handleChangeTab("wedding")}
              >
                Wedding rings
              </div>
            </div>
            <ReviewCategoryContainer type={tab} />
          </div>
        </div>
      </Fragment>
    );
  }
}
