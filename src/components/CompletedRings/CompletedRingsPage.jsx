import React, { Fragment } from "react";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../config/routing";
import ConstructorSteps from "../_common/RingConstructor/ConstructorSteps";
import RingConstructor from "../_common/RingConstructor/RingConstructor";
import CompletedRingsListContainer from "./CompletedRingsListContainer";
import { dataLayerPush } from '../../utils/dataLayer';
export default class CompletedRingsPage extends React.Component {
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
        <Breadcrumbs
          marks={[{ title: "Completed rings", path: routing().completedRings }]}
        />
        <ConstructorSteps marks={RingConstructor.generateSteps("complete")} />
        <CompletedRingsListContainer />
      </Fragment>
    );
  }
}
