import React from "react";
import FeaturedMenuBlock from "./FeaturedMenuBlock";
import { get } from "lodash";
import shape11 from "../../../../img/svg/shape11.svg";
import shape12 from "../../../../img/svg/shape12.svg";
import redArrow from "../../../../img/svg/red_arrow.svg";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import SvgSwitcher from "../../../_common/SvgSwitcher";
import shapes from "../../../../img/jsSvg/shapes/ShapesSvg";
import NoScript from '../../../_common/NoScript';
import { stylesSvgSlugMap } from "../../../../img/new_icons/SVG/stylesSvg";
import { StartWithSettingSvg, StartWithDiamond } from "../../../../img/new_icons/SVG/designOwn";

const marks = [
 // { title: "Best Sellers", slug: "best-sellers", className: "" },
  { title: "Style guide", slug: "how-to-choose-your-style", className: "" },
  { title: "Size guide", slug: "ring-size", className: "" },
  { title: "Sale", slug: "sale", className: "nav-sale-link" },
  { title: "New collections", slug: "new-collections", className: "" }
];

const metals = ["Platinum", "White-Gold", "Rose-Gold", "Yellow-Gold"];

export default function EngagementMenuContent({ data, active, loaded }) {
  const isShow = loaded || active;

  const metal = get(data, "metal", []);
  const style = get(data, "style", []);
  const emptyFilter = ['Tantalum'];

  const metalOptions = metal.filter((item) => emptyFilter.indexOf(item.title) === -1).map((item, index) => (
    <li key={`metal_menu_eng_${item.id}`}>
      <Link
        to={routing(metals[index] && metals[index].toLowerCase()).engagementFeedWithFilter}
        className="js-header-nav"
      >
        <span className="shape-icon shape-icon--type2">
          { isShow && <img src={item.image} alt={`Engagement rings filter ${item.title}`} className="lazy-img" />}
          <NoScript>
            <img src={item.image} alt={`Engagements ring filter ${item.title}`} />
          </NoScript>
        </span>
        {item.title}
      </Link>
    </li>
  ));
  const styleOptions = style.map((item, index) => (
    <li key={`style_menu_eng_${item.id}`}>
      <Link
        to={routing(item.title.replace(/\s/g, "-").toLowerCase()).engagementFeedWithFilter}
        className="js-header-nav"
      >
        <span className={`shape-icon style shape-icon--type2 ${item.slug}`}>
          {isShow && (
            stylesSvgSlugMap[item.slug] && stylesSvgSlugMap[item.slug](`Engagement rings filter ${item.title}`)
          )}
          <NoScript>
            <img src={item.image} alt={`Engagement rings filter ${item.title}`}/>
          </NoScript>
        </span>
        {item.title}
      </Link>
    </li>
  ));

  const shapeOptions = Object.keys(shapes).map(slug => (
    <li key={`shape_menu_eng_${slug}`} className="js-header-nav shape">
      <Link
        to={routing(shapes[slug].route).engagementFeedWithFilter}
        className="js-header-nav"
      >
        <span className="shape-icon shape-icon--type2">
          {shapes[slug].image}
        </span>
        {shapes[slug].title}
      </Link>
    </li>
  ));

  return (
    <div className="nav-drop">
      <div className="nav-drop__content">
        <FeaturedMenuBlock marks={marks} />
        <div className="drop-nav ">
          <p className="drop-nav__title sm-hide">Design own engagement ring</p>
          <div className="drop-shape drop-shape--design">
            <ul className="drop-shape__list">
              <li>
                <Link to={routing().engagementFeed} className="js-header-nav">
                  <span className="shape-icon shape-icon--type2">
                    <div className="lazy-img">
                    { isShow && <StartWithSettingSvg alt='Engagement rings filter shape11' className="lazy-img"/>}
                    </div>
                    <NoScript>
                      <StartWithSettingSvg alt='Engagement rings filter shape11' className="lazy-img"/>
                    </NoScript>
                  </span>
                  Start with a setting
                </Link>
              </li>
              <li>
                <Link to={routing().diamondsFeed} className="js-header-nav">
                  <span className="shape-icon shape-icon--type2">
                    { isShow && <StartWithDiamond alt='Engagement rings filter shape12' className="lazy-img"/>}
                    <NoScript>
                      <StartWithDiamond alt='Engagement rings filter shape12' className="lazy-img"/>
                    </NoScript>
                  </span>
                  Start with a diamond
                </Link>
              </li>
              <li className="rings-for-section">
                <Link to={routing('womens').engagementFeedWithFilter} className="js-header-nav rings-for">
                  Rings for Her
                </Link>
              </li>
              <li>
                <Link to={routing('mens').engagementFeedWithFilter} className="js-header-nav rings-for">
                  Rings for Him
                </Link>
              </li>
            </ul>
          </div>
          <div className="drop-btn  drop-btn--type2">
            <Link
              to={routing().engagementFeed}
              className="theme-btn js-header-nav"
            >
              View all rings
            </Link>
          </div>
          <div className="sm-show">
            <div className="drop-btn">
              <Link
                to={routing().engagementFeed}
                className="theme-btn theme-btn--type3 js-header-nav"
              >
                Order custom engagement ring
                <span className="btn-arrow">
                  <img className="red-arrow" src={redArrow} alt="Engagement menu Content arrow" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="drop-nav-container">
          <div className="drop-nav">
            <p className="drop-nav__title">Shop by style</p>
            <div className="drop-shape drop-shape--sm-two-col">
              <ul className="drop-shape__list">{styleOptions}</ul>
            </div>
          </div>

          <div className="drop-nav">
            <p className="drop-nav__title">Shop by shape</p>
            <div className="drop-shape drop-shape--two-column">
              <ul className="drop-shape__list">{shapeOptions.slice(0, 5)}</ul>
              <ul className="drop-shape__list">{shapeOptions.slice(5)}</ul>
            </div>
          </div>

          <div className="drop-nav drop-nav--fw">
            <p className="drop-nav__title">Shop by metal</p>
            <div className="drop-shape drop-shape--metal">
              <ul className="drop-shape__list">{metalOptions}</ul>
            </div>
          </div>
        </div>

        <FeaturedMenuBlock isMobile={true} marks={marks} />
      </div>

      <div className="nav-drop__extra sm-hide">
        <a href="https://www.gsdiamonds.com.au/booking" className="drop-link js-header-nav booking">
          Order custom Engagement ring
          <span>
            <img src={redArrow} alt="Engagement rings filter redArrow"/>
          </span>
        </a>
      </div>
    </div>
  );
}
