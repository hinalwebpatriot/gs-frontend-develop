import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import ReviewFullProductPageContainer from "./ReviewFullProductPageContainer";
import { dataLayerPush } from '../../../utils/dataLayer';

export default class EngagementReviewsPage extends React.Component {
  constructor(props) {
    super(props);

    this.id = null;
    this.slug = null;

    const { match, history } = props;

    const { slug, id } = match.params;

    if (!isNaN(parseInt(id)) && slug) {
      this.slug = slug;
      this.id = parseInt(id);
    } else {
      history.push(routing().root);
    }
  }

  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return false;
  // }

  render() {
    const link = routing({ id: this.id, slug: this.slug }).engagementProduct;
    return (
      <Fragment>
        <Breadcrumbs
          marks={[
            { title: "Engagement rings", path: routing().engagementFeed },
            { title: "Ring", path: link },
            { title: "Reviews" }
          ]}
        />
        <div className="reviews-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <h1 className="section-title section-title--type2">
                  Engagement Ring Product Reviews
                </h1>
              </div>
            </div>
            <ReviewFullProductPageContainer
              id={this.id}
              slug={this.slug}
              type="engagement"
              history={this.props.history}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
