import React from "react";
import DiamondsListItem from "./DiamondsListItem";
import ListBanner from "../../../Shared/ListBanner";
import { Preloader } from "../../../../_common/Preloader";
import api from "../../../../../config/api";
import GoogleEE from '../../../../_common/GoogleEE/GoogleEE';

export default class DiamondsListBody extends React.Component {
  state = {
    banners: [],
    isFetched: false
  };

  componentDidMount() {
    api.diamondsFeed
      .getPromoBlocks('diamonds-feed')
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
      itemsId,
      status,
      newItemsStatus,
      data,
      filterKeys,
      isMobile
    } = this.props;
    const { isFetched, banners } = this.state;

    if (status === "request")
      return (
        <div className="list-body">
          <Preloader margin="10vh 0 30vh 0" />
        </div>
      );

    const bannerBlocks = banners.map(item => (
      <ListBanner link={item.link} picture={item.banner} text={item.text} key={`banner_${item.id}`} />
    ));

    const slice1 = itemsId.slice(0, 5);
    const slice11 = itemsId.slice(5, 10);
    const slice2 = itemsId.slice(10, 20);
    const slice3 = itemsId.slice(20, 30);
    const slice4 = itemsId.slice(30);

    const itemsSlice1 = slice1.map((id, index) => (
      <DiamondsListItem
        id={id}
        data={data}
        key={`d_${id}`}
        filterKeys={filterKeys}
        list={GoogleEE.LIST_FEED}
        position={index + 1}
      />
    ));
    const itemsSlice11 = slice11.map((id, index) => (
      <DiamondsListItem
        id={id}
        data={data}
        key={`d_${id}`}
        filterKeys={filterKeys}
        list={GoogleEE.LIST_FEED}
        position={index + 6}
      />
    ));
    const itemsSlice2 = slice2.map((id, index) => (
      <DiamondsListItem
        id={id}
        data={data}
        key={`d_${id}`}
        filterKeys={filterKeys}
        list={GoogleEE.LIST_FEED}
        position={index + 11}
      />
    ));
    const itemsSlice3 = slice3.map((id, index) => (
      <DiamondsListItem
        id={id}
        data={data}
        key={`d_${id}`}
        filterKeys={filterKeys}
        list={GoogleEE.LIST_FEED}
        position={index + 21}
      />
    ));
    const itemsSlice4 = slice4.map((id, index) => (
      <DiamondsListItem
        id={id}
        data={data}
        key={`d_${id}`}
        filterKeys={filterKeys}
        list={GoogleEE.LIST_FEED}
        position={index + 31}
      />
    ));

    return (
      <div className="list-body">
        {itemsSlice1}
        {isFetched && itemsSlice2.length ? bannerBlocks[0] : null}
        {itemsSlice11}
        {itemsSlice2}
        {isFetched && itemsSlice3.length ? bannerBlocks[1] : null}
        {itemsSlice3}
        {isFetched && itemsSlice4.length && !isMobile ? bannerBlocks[2] : null}
        {itemsSlice4}
        {newItemsStatus === "request" && <Preloader />}
      </div>
    );
  }
}
