import React from "react";
import FilterWrapper from "./FilterWrapper";
import shapes from "../../../../img/jsSvg/shapes/ShapesSvg";
import { isEqual } from "lodash";

export default class FilterShapes extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (!isEqual(nextProps.input, this.props.input))
  }

  handleClear = () => {
    const { type, clear } = this.props;
    clear({ type });
  };

  render() {
    const { wrapper, video, title, input, save, disabled, filterChange = () => {} } = this.props;
    const buttons = Object.keys(shapes).map(slug => (
      <button
        type="button"
        key={`shapes_filter_${slug}`}
        className={`filter-shape__item ${input.includes(slug) ? "active" : ""}`}
        onClick={!disabled ? () => { save(slug); filterChange() } : undefined}
      >
        <span className="shape-icon">{shapes[slug].image}</span>
        {shapes[slug].title}
      </button>
    ));

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isCancelable={false}
        isClearable={input.length !== 0}
        onClear={this.handleClear}
        isDisabled={disabled}
        customText={disabled && "Disabled"}
        video={video}
      >
        <div className="filter-shape">{buttons}</div>
      </FilterWrapper>
    );
  }
}
