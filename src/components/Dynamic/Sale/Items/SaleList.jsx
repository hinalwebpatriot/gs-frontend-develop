import React, { Fragment } from "react";
import { Preloader } from "../../../_common/Preloader";
import RingPaneItem from "../../../Feed/Shared/Rings/RingPaneItem";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

export default function SaleList({ itemsSku, newItemsStatus, status, data, currentSize }) {
  if (status === "request") {
    return (

        <Preloader margin={"25vh auto"} />

    );
  }


  const list = itemsSku.map((group_sku, index) => (
    <RingPaneItem
      type="engagement"
      position={index + 1}
      list={GoogleEE.LIST_FEED}
      data={data[group_sku]}
      currentSize={currentSize}
      key={group_sku}
      wrapperClassname="col-6 col-lg-4 col-xl-3"
    />
  ));

  return (
    <Fragment>
      {list}
      {newItemsStatus === "request" && <Preloader />}
    </Fragment>
  )
}
