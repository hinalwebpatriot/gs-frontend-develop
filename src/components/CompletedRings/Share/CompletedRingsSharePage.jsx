import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import CompletedRingsList from "../CompletedRingsList";
import api from '../../../config/api';
import { get } from 'lodash'
import { Preloader } from '../../_common/Preloader';
import { dataLayerPush } from '../../../utils/dataLayer';

export default class CompletedRingsSharePage extends React.Component {
  state = {
    isFetched: false,
    data: [],
  }

  componentDidMount() {
    api.constructor.getSharedList(get(this.props, 'match.params.id', null))
      .then(res => {
        this.setState({
          isFetched: true,
          data: res.data.data
        })
      })
      .catch(err => {
        this.props.history.push(routing().notFound)
      })
      dataLayerPush({
        'dynx_itemid': '',
        'dynx_totalvalue': '',
        'dynx_pagetype': 'other'
      });
  }

  render() {
    const sharingId = get(this.props, 'match.params.id', null);
    const { isFetched, data } = this.state;

    return (
      <Fragment>
        <Breadcrumbs
          marks={[{ title: "Completed rings", path: routing().completedRings}, { title: `Shared list #${sharingId}` }]}
        />
        {
          isFetched ? <CompletedRingsList items={data} isSharing={true} sharingId={sharingId}/> : <Preloader margin="30vh auto"/>
        }
      </Fragment>
    );
  }
}
