import React, { Fragment } from "react";
import FeaturedMenuBlock from "./FeaturedMenuBlock";
import { get } from "lodash";
import redArrow from "../../../../img/svg/red_arrow.svg";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import SvgSwitcher from "../../../_common/SvgSwitcher";
import NoScript from '../../../_common/NoScript';
import { WomenDiamond } from "../../../../img/new_icons/SVG/womenWeddingRings";

const marks = [
 // { title: "Best Sellers", slug: "best-sellers", className: "" },
  { title: "Style guide", slug: "metals-made-easy", className: "" },
  { title: "Size guide", slug: "ring-size", className: "" },
  { title: "Sale", slug: "sale", className: "nav-sale-link" },
  { title: "New collections", slug: "new-collections", className: "" }
];

let metals = ["Platinum", "White-Gold", "Rose-Gold", "Yellow-Gold", "Yellow-White-Gold", "Rose-White-Gold"];

export default function WeddingMenuContent({ data, active, loaded }) {
  const isShow = loaded || active;
  const images = [
    get(data, "images[0].image_url", ''),
    get(data, "images[1].image_url", '')
  ];

  const metal = get(data, "metal", []);
  const showMetals = ['platinum', '18ct-white-gold', '18ct-rose-gold', '18ct-yellow-gold'];
  
  const metalOptions = metal.filter((item) => showMetals.indexOf(item.slug) !== -1).map((item, index) => (
    <li key={`metal_menu_eng_${item.id}`}>
      <Link
        to={routing(metals[index] && metals[index].toLowerCase()).weddingFeedWithFilter}
        className="js-header-nav"
      >
        <span className="shape-icon shape-icon--type2">
          { isShow && <img src={item.image} alt={`Wedding rings filter ${item.title}`} className="lazy-img" />}
          <NoScript>
            <img src={item.image} alt={`Wedding ring filter ${item.title}`} />
          </NoScript> 
        </span>
        {item.title}
      </Link>
    </li>
  ));
  const femaleStyle = get(data, "style.female", []);
  const maleStyle = get(data, "style.male", []);

  const femaleStyleOptions = femaleStyle.map(item => (
    <li key={`wed_menu_style_${item.slug}`}>
      <Link
        to={routing(item.title.replace(/\s/g, "-").toLowerCase()).weddingFeedWithFilter}
        className="js-header-nav"
      >
        <span className="shape-icon shape-icon--wed-ring ">
          { isShow && <WomenDiamond alt={`Wedding rings filter ${item.title}`} />}
          <NoScript>
            <WomenDiamond alt={`Wedding rings filter ${item.title}`} />
          </NoScript>
        </span>
        {item.title}
      </Link>
    </li>
  ));

  const maleStyleOptions = maleStyle.map(item => (
    <li key={`wed_menu_style_${item.slug}`}>
      <Link
        to={routing('mens').weddingFeedWithFilter}
        // to={routing(item.title.replace(/\s/g, "-")).weddingFeedWithFilter}
        className="js-header-nav"
      >
        <span className="shape-icon shape-icon--wed-ring ">
          { isShow && <SvgSwitcher link={item.image} hoverLink={item.image_hover} alt={`Wedding rings filter ${item.title}`} />}
          <NoScript>
            <img src={item.image} alt={`Wedding rings filter  ${item.title}`}/>
          </NoScript>
        </span>
        {item.title}
      </Link>
    </li>
  ));
  
  return (
    <div className="nav-drop">
      <div className="nav-drop__content">
        <FeaturedMenuBlock marks={marks} />
        <div className="drop-nav">
          {femaleStyleOptions.length !== 0 && (
            <Fragment>
              <p className=" drop-nav__title drop-nav__title--sm-move-up">
                Women's
              </p>
              <div className="drop-shape">
                <ul className="drop-shape__list">{femaleStyleOptions}</ul>
              </div>
            </Fragment>
          )}

          {maleStyleOptions.length !== 0 && (
            <Fragment>
              <p className=" drop-nav__title drop-nav__title--sm-move-up">
                Men's
              </p>
              <div className="drop-shape">
                <ul className="drop-shape__list">{maleStyleOptions}</ul>
              </div>
            </Fragment>
          )}
          <div className="sm-hide">
            <div className="drop-btn  drop-btn--type2">
              <Link
                to={routing().weddingFeed}
                className="theme-btn js-header-nav"
              >
                View all rings
              </Link>
            </div>
          </div>
        </div>

        <div className="drop-gallery drop-gallery--type2 ">
          <div className="gallery-row sm-hide">
            <div className="col-6 ">
              <Link
                to={routing("womens").weddingFeedWithFilter}
                className="js-header-nav"
              >
                <div className="gallery-item gallery-item--fh">
                  { isShow && <img src={images[0]} alt="Wedding rings filter for her" className="lazy-img"/> }
                  <NoScript>
                    <img src={images[0]} alt="wedding rings for women" />
                  </NoScript>
                  <span
                    className="gallery-item__text"
                    style={{ display: "block" }}
                  >
                    For her
                  </span>
                </div>
              </Link>
            </div>
            <div className="col-6 ">
              <Link
                to={routing("mens").weddingFeedWithFilter}
                className="js-header-nav"
              >
                <div className="gallery-item gallery-item--fh">
                  { isShow && <img src={images[1]} alt="mens wedding rings" className="lazy-img" /> }
                  <NoScript>
                    <img src={images[1]} alt="mens wedding rings" />
                  </NoScript>
                  <span
                    className="gallery-item__text"
                    style={{ display: "block" }}
                  >
                    For him
                  </span>
                </div>
              </Link>

            </div>
            <div className="drop-nav drop-nav--fw">
              <p className="drop-nav__title">Shop by metal</p>
              <div className="drop-shape drop-shape--metal">
                <ul className="drop-shape__list">{metalOptions}</ul>
              </div>
            </div>
          </div>
        </div>

        <div className="sm-show">
        <div className="head_menu_wedding_metal">
  {/* mobile */} 
      <div className="drop-nav drop-nav--fw">
        <p className="drop-nav__title">Shop by metal</p>
        <div className="drop-shape drop-shape--metal">
          <ul className="drop-shape__list">{metalOptions}</ul>
        </div>
      </div>
      </div>
          <div className="drop-btn  drop-btn--type2">
            <Link
              to={routing().weddingFeed}
              className="theme-btn js-header-nav"
            >
              View all rings
            </Link>
          </div>
        </div>

        <div className="sm-show">
          <div className="drop-btn">
            <Link
              to={routing().weddingFeed}
              className="theme-btn theme-btn--type3 js-header-nav"
            >
              Order custom Wedding ring
              <span className="btn-arrow">
                <img className="red-arrow" src={redArrow} alt="Wedding Menu Button Arrow" />
              </span>
            </Link>
          </div>
        </div>
        <FeaturedMenuBlock isMobile={true} marks={marks} />
      </div>

      <div className="nav-drop__extra sm-hide">
        <a href="https://www.gsdiamonds.com.au/booking" className="drop-link js-header-nav booking">
          Order custom Wedding ring
          <span>
            <img src={redArrow} alt="Order custom Wedding ring" />
          </span>
        </a>
      </div>
    </div>
  );
}
