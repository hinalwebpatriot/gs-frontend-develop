import React, { Fragment } from "react";

import { Preloader } from "../../../../_common/Preloader";
import RingPaneItem from "../../../Shared/Rings/RingPaneItem";
import RingListItem from "../../../Shared/Rings/RingListItem";
import EngagementTopPicks from "./EngagementTopPicks";
import GoogleEE from '../../../../_common/GoogleEE/GoogleEE';
import api from "../../../../../config/api";
import ListBanner from "../../../Shared/ListBanner";

export default class EngagementListBody extends React.Component {
  state = {
    banners: [],
    isFetched: false
  };

  componentDidMount() {
    api.diamondsFeed
      .getPromoBlocks('engagement-rings-feed')
      .then(res => {
        if (res.status === 200) {
          // console.log(res);
          this.setState({
            banners: res.data,
            isFetched: true
          });
        }
      })
      .catch(e => {
        console.log('fetch banners is error', e)
      });
  }

  render() {
    const {
      itemsSku,
      status,
      newItemsStatus,
      data,
      isMobile,
      view,
      currentSize,
      metaSlug,
    } = this.props;
    const { isFetched, banners } = this.state;

    if (status === "request") {
      return (
        <div className="list-body">
          <Preloader margin={"25vh 0 150vh 0"} />
        </div>
      );
    }

    const bannerBlocksMT = banners.map(item => (
      <ListBanner link={item.link} picture={item.banner} text={item.text} key={`banner_${item.id}`} classes={'mt75'} />
    ));
    const bannerBlocksNotMT = banners.map(item => (
      <ListBanner link={item.link} picture={item.banner} text={item.text} key={`banner_${item.id}`} />
    ));

    const slice1 = itemsSku.slice(0, 12);
    const slice11 = itemsSku.slice(12);
    // const slice2 = itemsSku.slice(20);

    const itemsSlice1 = slice1.map((group_sku, index) => {
      if (view === "pane") {
        return (
          <RingPaneItem
            type="engagement"
            data={data[group_sku]}
            currentSize={currentSize}
            key={group_sku}
            list={GoogleEE.LIST_FEED}
            position={index + 1}
            metaSlug={metaSlug}
          />
        );
      } else {
        return (
          <RingListItem
            type="engagement"
            data={data[group_sku]}
            currentSize={currentSize}
            key={group_sku}
            list={GoogleEE.LIST_FEED}
            position={index + 1}
            metaSlug={metaSlug}
          />
        );
      }
    });

    const itemsSlice11 = slice11.map((group_sku, index) => {
      if (view === "pane") {
        return (
          <RingPaneItem
            type="engagement"
            data={data[group_sku]}
            currentSize={currentSize}
            key={group_sku}
            list={GoogleEE.LIST_FEED}
            position={index + 13}
            metaSlug={metaSlug}
          />
        );
      } else {
        return (
          <RingListItem
            type="engagement"
            data={data[group_sku]}
            currentSize={currentSize}
            key={group_sku}
            list={GoogleEE.LIST_FEED}
            position={index + 13}
            metaSlug={metaSlug}
          />
        );
      }
    });

    // const itemsSlice2 = slice2.map((group_sku, index) => {
    //   if (view === "pane") {
    //     return (
    //       <RingPaneItem
    //         type="engagement"
    //         data={data[group_sku]}
    //         currentSize={currentSize}
    //         key={group_sku}
    //         list={GoogleEE.LIST_FEED}
    //         position={index + 20}
    //       />
    //     );
    //   } else {
    //     return (
    //       <RingListItem
    //         type="engagement"
    //         data={data[group_sku]}
    //         currentSize={currentSize}
    //         key={group_sku}
    //         list={GoogleEE.LIST_FEED}
    //         position={index + 20}
    //       />
    //     );
    //   }
    // });

    if (view === "pane") {
      return (
        <Fragment>
          <div className="row justify-content-center ring-row">
            {itemsSlice1}
            {isFetched && itemsSlice1.length ? bannerBlocksMT[0] : null}
            {itemsSlice11}
          </div>
          {/* {status === "success" && <EngagementTopPicks />} */}
          {/* <div className="row justify-content-center ring-row">
            {itemsSlice2}
          </div> */}
          {isFetched && itemsSlice11.length ? bannerBlocksMT[1] : null}
          {newItemsStatus === "request" && <Preloader />}
        </Fragment>
      );
    }

    if (view === "list") {
      return (
        <Fragment>
          {itemsSlice1}
          {isFetched && itemsSlice1.length ? bannerBlocksNotMT[0] : null}
          {itemsSlice11}
          {/* {status === "success" && <EngagementTopPicks />}
          {itemsSlice2} */}
          {newItemsStatus === "request" && <Preloader />}
          {isFetched && itemsSlice11.length ? bannerBlocksNotMT[1] : null}
        </Fragment>
      );
    }
  }
}
