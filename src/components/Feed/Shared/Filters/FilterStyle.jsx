import React from "react";
import FilterWrapper from "./FilterWrapper";
import { isEqual } from "lodash";

import ImageToggler from "../../../_common/ImageToggler";

export default class FilterStyle extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !isEqual(nextProps.input, this.props.input) ||
      !isEqual(nextProps.data, this.props.data) ||
      nextProps.isMobile !== this.props.isMobile ||
      nextProps.showMobile !== this.props.showMobile
    );
  }

  handleSelect = value => {
    const { save, filterChange } = this.props;
    save(value);
    filterChange && filterChange()
  };

  handleClear = () => {
    const { type, clear } = this.props;
    clear({ type });
  };

  render() {
    const {
      wrapper,
      data,
      title,
      input,
      video,
      showMobile,
      isMobile
    } = this.props;
    const buttons = data.map(item => {
      const isActive = input.includes(item.slug);

      return (
        <button
          key={`style_filter_${item.slug}`}
          className={`filter-shape__item filter-shape__item--style ${
            isActive ? "active" : ""
          }`}
          onClick={() => this.handleSelect(item.slug)}
        >
          <span className="shape-icon shape-icon--engagement">
            {isMobile && showMobile && (
              <ImageToggler
                src={item.image}
                activeSrc={item.image_hover}
                isActive={isActive}
                alt={`Filter Style: ${item.title}`}
              />
            )}

            {!isMobile && (
              <ImageToggler
                src={item.image}
                activeSrc={item.image_hover}
                isActive={isActive}
                alt={`Filter Style: ${item.title}`}
              />
            )}

            {/*<ImageToggler*/}
            {/*src={item.image}*/}
            {/*activeSrc={item.image_hover}*/}
            {/*isActive={isActive}*/}
            {/*/>*/}
          </span>
          {item.title}
        </button>
      );
    });

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isCancelable={false}
        isClearable={input.length !== 0}
        onClear={this.handleClear}
        video={video}
      >
        <div className="filter-shape">{buttons}</div>
      </FilterWrapper>
    );
  }
}
