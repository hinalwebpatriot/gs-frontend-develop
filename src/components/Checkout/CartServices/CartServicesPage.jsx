import React, { Fragment, useEffect } from "react";
import CartServicesSection from "./Items/CartServicesSection";
import EngagementTopPicks from "../../Feed/Engagement/List/Items/EngagementTopPicks";
import { dataLayerPush } from '../../../utils/dataLayer';

const CartServicesPage = () => {
    useEffect(() => {
        dataLayerPush({
            'dynx_itemid': '',
            'dynx_totalvalue': '',
            'dynx_pagetype': 'other'
          });
    }, [])
    return (
        <Fragment>
            <CartServicesSection />
            <div className="container">
                <EngagementTopPicks />
            </div>
        </Fragment>
    );
}

export default CartServicesPage;