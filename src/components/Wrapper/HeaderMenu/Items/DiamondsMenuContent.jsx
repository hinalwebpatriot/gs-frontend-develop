import React from "react";
import FeaturedMenuBlock from "./FeaturedMenuBlock";
import { Link } from "react-router-dom";
import { get } from "lodash";
import NoScript from '../../../_common/NoScript';

import redArrow from "../../../../img/svg/red_arrow.svg";
import routing from "../../../../config/routing";
import shapes from "../../../../img/jsSvg/shapes/ShapesSvg";

const marks = [
 // {title: 'Best Sellers', slug: 'best-sellers', className: ''},
  {title: 'Guide', slug: '6-things-to-look-for-in-buying-a-diamond', link: '/blog/6-things-to-look-for-in-buying-a-diamond', className: ''},
  {title: 'Sale', slug: 'sale', className: 'nav-sale-link'},
  {title: 'New collections', slug: 'new-collections', className: ''},
]

export default function DiamondsMenuContent({ data, active, loaded }) {
    const isShow = (loaded || active);

    const images = [
      get(data, "images[0].image_url", ''),
      get(data, "images[1].image_url", ''),
      get(data, "images[2].image_url", ''),
      get(data, "images[3].image_url", ''),
    ]

    const shapeOptions = Object.keys(shapes).map(slug => (
      <li key={`shape_menu_eng_${slug}`} className="shape">
        <Link
          to={routing(shapes[slug].route).diamondsFeedWithShape}
          className="js-header-nav"
        >
          <span className="shape-icon shape-icon--type2">
            {shapes[slug].image}
          </span>
          {shapes[slug].title}
        </Link>
      </li>
    ));

const diamondCarateParser = (link) => {
  return  link.replace('.0', '').replace('ct', '-carat').replace('.', '-');
}

const diamondsCarate = ['0.2ct', '0.3ct', '0.5ct', '1.0ct', '1.5ct', '1.8ct', '2.0ct', '3.0ct', '4.0ct', '5.0ct', 
'6.0ct', '6.6ct', '7.0ct', '7.25ct', '7.5ct', '8.0ct', '9.0ct', '10.0ct', '11.0ct'].map(item => (
  <li key={`shape_menu_eng_${item}`} className="shape">
    <Link
      to={routing(diamondCarateParser(item)).diamondsFeedWithShape}
      className="js-header-nav"
    >
        {item}
    </Link>
  </li>
));

    return (
      <div className="nav-drop">
        <div className="nav-drop__content">
          <FeaturedMenuBlock marks={marks} />
          <div className="drop-nav">
            <p className="drop-nav__title drop-nav__title--sm-move-up">
              Diamond shape
            </p>
            <div className="drop-shape drop-shape--two-column">
              <ul className="drop-shape__list">{shapeOptions.slice(0, 5)}</ul>
              <ul className="drop-shape__list">{shapeOptions.slice(5)}</ul>
            </div>

            <div className="drop-btn">
              <Link
                to={routing().diamondsFeed}
                className="theme-btn js-header-nav"
              >
                Shop diamonds
              </Link>
            </div>
          </div>

          <div className="drop-nav carat">
            <p className="drop-nav__title carat drop-nav__title--sm-move-up">
              Diamond carat
            </p>
            <div className="drop-shape drop-shape--two-column">
              <ul className="drop-shape__list">{diamondsCarate.slice(0, 6)}</ul>
              <ul className="drop-shape__list">{diamondsCarate.slice(6, 12)}</ul>
              <ul className="drop-shape__list">{diamondsCarate.slice(12)}</ul>
            </div>
          </div>

          <div className="drop-gallery sm-hide">
            {/*
            <div className="gallery-row">
              <div className="col-5 ">
                <div className="gallery-item gallery-item--fh">
                  { isShow && <img src={images[0]} alt="Diamonds Menu Content 0" className="lazy-img"/>}
                  <NoScript>
                    <img src={images[0]} alt="Diamonds Menu Content 0" />
                  </NoScript>
                </div>
              </div>
              <div className="col-7">
                <div className="gallery-row">
                  <div className="col-6 ">
                    <div className="gallery-item gallery-item--hh">
                      { isShow && <img src={images[1]} alt="Diamonds Menu Content 1" className="lazy-img"/>}
                      <NoScript>
                        <img src={images[1]} alt="Diamonds Menu Content 1" />
                      </NoScript>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="gallery-item gallery-item--hh">
                      { isShow && <img src={images[2]} alt="Diamonds Menu Content 2" className="lazy-img"/>}
                      <NoScript>
                        <img src={images[2]} alt="Diamonds Menu Content 2" />
                      </NoScript>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="gallery-item gallery-item--hh">
                      { isShow && <img src={images[3]} alt="Diamond menu content" className="lazy-img"/>}
                      <NoScript>
                        <img src={images[3]} alt="Diamonds Menu Content 3" />
                      </NoScript>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          */}</div>

          <FeaturedMenuBlock isMobile={true} marks={marks} />
        </div>

        <div className="nav-drop__extra sm-hide">
          <Link to={routing().diamondsFeed} className="drop-link js-header-nav">
            Browse all diamonds
            <span>
              <img className="red-arrow" src={redArrow} alt="Diamonds Menu C arrow" />
            </span>
          </Link>
        </div>
      </div>
    );
}
