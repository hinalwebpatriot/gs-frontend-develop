import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import breadcrumbImg from "../../../img/svg/breadcrump.svg";
import routing from "../../../config/routing";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setBreadcrumbs } from "./BreadcrumbsActions";
import { flowRight as compose } from "lodash";
import { changeTitle } from "../SEO/SeoActions";
import { citySelector } from '../../_selectors/citySelectors';

// const marks = [
//   { title: 'Diamonds Feed', path: routing().diamondsFeed },
//   { title: 'Diamond', path: routing('blabla').diamondProduct },
//   { title: 'Diamond', path: routing('blabla').diamondProduct },
//   { title: 'Diamond', path: routing('blabla').diamondProduct },
//   { title: 'Diamond', path: routing('blabla').diamondProduct },
// ];

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    const { setBreadcrumbs, marks } = props;
    setBreadcrumbs(marks); //only for ssr
    this.updateTitle();
  }

  componentDidUpdate() {
    this.updateTitle();
  }

  updateTitle() {
    const { marks, changeTitle } = this.props;

    if (marks && marks.length > 0) {
      changeTitle(this.getTitle(marks));
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  getTitle = (marks) => {
    const lastMark = marks[marks.length - 1];
    const titleText = lastMark && lastMark.title ? lastMark.title  : 'GS Diamonds';
    return titleText;
  }

  render() {
    const { marks, city } = this.props;
    const homeItem = (
      <Link to={routing().root} className="breadcrumb__item">
        Home
      </Link>
    );

    const items = marks.map((item, index) => {
      if (index < marks.length - 1) {
        return (
          <Fragment key={`bread_${index}`}>
            <span className="breadcrumb__icon">
              <img src={breadcrumbImg} alt="breadcrumbs divider" />
            </span>
            <Link to={city !== 'sydney' && item.path.includes('/jewellery') ? `/${city}` + item.path : item.path} className="breadcrumb__item">
              {item.title}
            </Link>
          </Fragment>
        );
      } else {
        return (
          <Fragment key={`bread_${index}`}>
            <span className="breadcrumb__icon">
              <img src={breadcrumbImg} alt="breadcrumbs divider" />
            </span>
            <span className="breadcrumb__item active">{item.title}</span>
          </Fragment>
        );
      }
    });
    const container1600 = this.props.match && this.props.match.path === '/referral' ? 'container1600' : '';

    return (
      <section className="breadcrumbs-section">
        <div className={`container ${container1600}`}>
          <div className="breadcrumb">
            {homeItem}
            {items}
          </div>
        </div>
      </section>
    );
  }
}

const clearState = setBreadcrumbs.fulfill;

const mapStateToProps = (state, props) => {
  let marks = props.marks;
  marks[marks.length - 1] = {
    ...marks[marks.length - 1],
    path: props.location.pathname
  };

  return {
    marks: marks,
    city: citySelector(state)
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { setBreadcrumbs, changeTitle, clearState }
  )
)(Breadcrumbs);
