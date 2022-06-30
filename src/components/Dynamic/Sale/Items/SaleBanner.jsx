import React, { Fragment } from 'react';
// import saleBannerImg from '../../../../img/sales_banner_update.jpeg'

export default function SaleBanner({ data: { image, title, text } }) {
  return (
    <Fragment>
      <div className="sale-banner ">
        <img src={image} alt={title}/>
        <span className="banner-description" dangerouslySetInnerHTML={{ __html: text }}/>
      </div>
      {/*<p className="sale-wrap__title">*/}
        {/*No sale offers available at the moment*/}
        {/**Сonditions apply*/}
      {/*</p>*/}
      {/*<div className="row justify-content-center">*/}
        {/*<div className="col-lg-8">*/}
          {/*<div className="info-s-text">*/}
            {/*<p>*/}
              {/*July campaign conditions:*/}
            {/*</p>*/}
            {/*<p>- buy any of our diamonds in store or online in the month of July;</p>*/}
            {/*<p>- get 40% OFF our Tribute Solitaire Mounts ring settings;</p>*/}
            {/*<p>- Solitaire Tribute Mounts settings are available in all metals;</p>*/}
            {/*<p>- online and in-store;</p>*/}
            {/*<p>- no side diamonds are included in this promotion or other designs;</p>*/}
            {/*<p>- the offer runs from 1st July to 31st July 2019 only;</p>*/}
            {/*<p>- discount vouchers cannot be used for this promotion.</p>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</div>*/}
    </Fragment>
  )
}
