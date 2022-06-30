import React, { Fragment } from "react";
import routing from "../../config/routing";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
import SubscribeBlock from "../_common/SubscribeBlock/SubscribeBlock";
import SubscribeContainer from "../_common/Subscribe/SubscribeContainer";
import CompareBlock from "./CompareBlock";
import OnlineHelpBlock from "../_common/OnlineHelpBlock/OnlineHelpBlock";
import ExpertChoiceBlock from "../_common/ExpertChoiceBlock/ExpertChoiceBlock";
import { dataLayerPush } from '../../utils/dataLayer';

class ComparePage extends React.Component {
  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }
  render() {
    return (
      <Fragment>
        <Breadcrumbs marks={[{ title: "Compare", path: routing().compare }]} />
        <CompareBlock
          matchParams={this.props.match.params}
          history={this.props.history}
        />
        <OnlineHelpBlock />
        <ExpertChoiceBlock />
        <SubscribeContainer Component={SubscribeBlock} />
      </Fragment>
    );
  }
}

export default ComparePage;
