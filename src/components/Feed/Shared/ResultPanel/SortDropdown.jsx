import React, { Fragment } from "react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { withRouter } from "react-router-dom";
import routing from "../../../../config/routing";

import IconFA from '../../../_common/IconFA';

class SortDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.isDiamondsPage = props.match.path === routing().diamondsFeed || props.match.path === routing().diamondsFeedWithShape;
    this.marks = this.isDiamondsPage ? ["price"] : ["new", "price"];
    // this.marks = ["price", "carat", "clarity", "cut", "color"];

    this.dropdown = React.createRef();
    this.input = React.createRef();

    this.state = {
      selected: this.isDiamondsPage ? "Price" : "Best sellers"
    };
  }

  showDropdown = e => {
    e.preventDefault();
    this.dropdown.current.classList.add("active");
    document.addEventListener("click", this.closeDropdown);
  };

  closeDropdown = e => {
    try {
      const field = e.target.dataset.field;
      const order = e.target.dataset.order;
      const title = e.target.dataset.title;

      if (field && order && title) {
        this.setState(
          {
            selected: title
          },
          () =>
            this.props.save({
              field,
              order
            })
        );
      }

      this.dropdown.current.classList.remove("active");
    } catch (e) {}
    document.removeEventListener("click", this.closeDropdown);
  };

  render() {
    const { selected } = this.state;
    const items = this.marks.map(item => {
      const title = item[0].toUpperCase() + item.slice(1);
      if (item === 'new') {
        return (
          <Fragment key={`sort_drop_${item}`}>
            <button
              className="sort-inner-btn new"
              data-field={item}
              data-order="asc"
              data-title={'Best sellers'}
            >
              <span
                data-field={item}
                data-order="asc"
                data-title={'Best sellers'}>
                  Best sellers
              </span>
              <span className="icon">
                {/* <IconFA icon={faArrowUp}/> */}
              </span>
            </button>
          </Fragment>
        ); 
      }
      return (
        <Fragment key={`sort_drop_${item}`}>
          <button
            className="sort-inner-btn"
            data-field={item}
            data-order="asc"
            data-title={title}
          >
            {title} Low to High
            <span className="icon">
              <IconFA icon={faArrowUp}/>
            </span>
          </button>
          <button
            className="sort-inner-btn"
            data-field={item}
            data-order="desc"
            data-title={title}
          >
            {title} High to Low
            <span className="icon">
              <IconFA icon={faArrowDown}/>
            </span>
          </button>
        </Fragment>
      );
    });

    return (
      <div className="sort" ref={this.dropdown} onClick={this.showDropdown}>
        <p className="sort__text">Sort: </p>
        <div className="sort-drop">
          <button className="sort-drop__btn">
            {selected}
            <span className="icon">
              <IconFA icon={faCaretDown}/>
            </span>
          </button>
          <div className="sort-drop__inner">{items}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(SortDropdown);
