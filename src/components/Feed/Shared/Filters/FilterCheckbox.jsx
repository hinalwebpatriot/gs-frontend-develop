import React from "react";
import FilterWrapper from "./FilterWrapper";
import { isEqual } from "lodash";

export default class FilterCheckbox extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps.input, this.props.input)
  }

  handleClear = () => {
    const { type, clear } = this.props;
    clear({ type });
  };

  render() {
    const { wrapper, title, input, data, save, video, filterChange = () => {} } = this.props;
    const checkboxes = data.sort((a, b) => {
      if (!a.title || !b.title) return -1;
      return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
    }).map(item => (
        <div key={`collection_filter_${item.slug}`} className="filter-check">
          <input
            type="checkbox"
            className="checkbox checkbox--type2"
            id={`collection_filter_${item.slug}`}
            onChange={() => {
              save(item.slug)
              filterChange()
            }}
            checked={input.includes(item.slug)}
          />
          <label htmlFor={`collection_filter_${item.slug}`}>
            <span>{item.title}</span>
          </label>
        </div>
      ));

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isCancelable={false}
        isClearable={input.length !== 0}
        onClear={this.handleClear}
        video={video}
      >
        <div className="filter-form">{checkboxes}</div>
      </FilterWrapper>
    );
  }
}
