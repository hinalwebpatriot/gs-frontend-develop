import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import { dataLayerPush } from '../../../utils/dataLayer';

import earring from "../../../img/jewellery/111.jpg";
import pendant from "../../../img/jewellery/222.jpg";
import bracelets from "../../../img/jewellery/333.jpg";
import MetaTags from "../../_common/SEO/MetaTags";

function JewelleryPage() {
  const description = `GSDiamonds give opportunity for selection of pendants, earrings, bracelets.`;
  const h1 = 'DIAMOND STUD EARRINGS';

  useEffect(() => {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }, [])
  return (
    <>
      <MetaTags page="jewellery" h1={h1} description={description} />
      <Breadcrumbs marks={[{ title: 'Jewellery', path: routing().jewelleryFeed }]} />
      <h1 class="block__jewellery__text h1">Jewellery</h1>
      <div className="catalog-block container block__jewellery">
        {/*<img src={banner} alt=""/>*/}
        <div className="row justify-content-center">

          <div className="col-sm-12 col-md-5 block__jewellery__height-imgcontrol">
            <Link to={routing().earringFeed}>
          <img src={earring} alt="Earrings with diamonds and rubies"/>
        </Link>
          </div>

          <div className="col-sm-12 col-md-6 block__jewellery__text">
            <h3>{h1}</h3>
            <p> Neat but noticeable, diamond stud earrings are always a 
              good choice. The discreet shape and shimmer are 
              perfect for daywear while the sophisticated sparkle 
              ideal for evening occasions. Share your design ideas with 
              us or shop our twinkling collections of pre-set studs
            </p>
          <Link to={routing().earringFeed}>
          <div className="block__jewellery_button theme-btn">
            View all earrings
          </div>
        </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 block__jewellery__text">
            <h3>DIAMOND PENDANTS</h3>
            
            <p> The diamond pendant is an elegant accessory with
              versatile appeal. It looks striking worn on its own or
              layered with other necklaces to create a fresh and
              modern look. Our diamond pendants and necklaces
              are available in white gold or yellow gold - polished
              and perfectly finished to suit your style
            </p>
          <Link to={routing().pendantFeed}>
          <div className="block__jewellery_button theme-btn">
            View all pendants
          </div>
        </Link>
          </div>
          <div className="col-md-5 block__jewellery__height-imgcontrol">
          <Link to={routing().pendantFeed}>
          <img src={pendant} alt="Round pendant with diamonds"/>
        </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-5 block__jewellery__height-imgcontrol">
          <Link to={routing().braceletsFeed}>
          <img src={bracelets} alt="White and yellow gold diamond bracelets"/>
        </Link>
          </div>
          <div className="col-md-6 block__jewellery__text">
            <h3>DIAMOND BRACELETS</h3>
            <p>Delicate and stylish, diamond bracelets are appropriate
              in any look and give you confidence and charm in every
              situation. A really beautiful piece of jewellery, with its
              flawless form, embodies the infinity of life and is always
              relevant even through generations. Select your dream
              design from our gorgeous collection in platinum, white,
              yellow or rose gold.
            </p>
          <Link to={routing().braceletsFeed}>
          <div className="block__jewellery_button theme-btn">
            View all bracelets
          </div>
        </Link>
          </div>
        </div>
      </div>
      <SubscribeContainer Component={SubscribeBlock} />
    </>
  );
}

export default JewelleryPage;