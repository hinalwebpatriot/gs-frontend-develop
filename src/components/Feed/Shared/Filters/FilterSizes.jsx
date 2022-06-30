import React from "react";
import FilterWrapper from "./FilterWrapper";
import { Link } from "react-router-dom";
import { isEqual } from "lodash";
import routing from "../../../../config/routing";
import PhoneSvg from "../../../../img/jsSvg/PhoneSvg";

export default class FilterSizes extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps.input, this.props.input);
  }

  handleClear = () => {
    const { type, clear } = this.props;
    clear({ type });
  };

  render() {
    const {
      wrapper,
      title,
      data,
      input,
      changeTab,
      select,
      video,
      filterChange = () => {}
    } = this.props;
    const buttons = data.map(item => (
      <div className="size-col" key={`size_${item.slug}`}>
        <button
          className={`size ${input.sizes.includes(item.slug) ? "active" : ""}`}
          onClick={() => {
            select(item.slug)
            filterChange()
          }}
        >
          {item.title[input.currentTab]}
        </button>
      </div>
    ));

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isCancelable={false}
        currentTab={input.currentTab}
        changeTab={changeTab}
        isClearable={input.sizes.length !== 0}
        onClear={this.handleClear}
        video={video}
      >
        <div className="sizes">{buttons}</div>
        <Link to={routing().contactUs} className="size-contact">
          <span className="size-contact__icon">
            <PhoneSvg />
          </span>
          Did not find the size of interest? Contact us
        </Link>
      </FilterWrapper>
    );
  }
}
