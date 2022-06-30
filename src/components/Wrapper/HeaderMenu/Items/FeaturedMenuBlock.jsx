import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";

export default class FeaturedMenuBlock extends React.Component {
  render() {
    const { isMobile, marks = [] } = this.props;

    const content = (
      <Fragment>
        <p className="drop-nav__title">Featured</p>
        <ul className="drop-nav__list">
          {
            marks.map(item => {
              const link = item.link ? item.link : '/' + item.slug;
              return <li key={item.slug + '_menu'}>
                <Link to={link} className={`${item.className} js-header-nav`}>
                  {item.title}
                </Link>
              </li>
            })
          }
        </ul>
      </Fragment>
    );

    if (isMobile) {
      return (
        <div className="sm-show">
          <div className="drop-nav drop-nav--featured">{content}</div>
        </div>
      );
    }

    return <div className="drop-nav sm-hide">{content}</div>;
  }
}
