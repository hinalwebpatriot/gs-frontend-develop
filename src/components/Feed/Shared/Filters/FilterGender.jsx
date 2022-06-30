import React from "react";
import FilterWrapper from "./FilterWrapper";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";

export default class FilterGender extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps.input, this.props.input)
  }

  render() {
    const { filterChange = () => {}, wrapper, title, input, save, video, hasForAll = false, renderAsLinks = false, links = {} } = this.props;

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isCancelable={false}
        video={video}
      >
        <div className="page-toggle">
          {renderAsLinks ? (
            <>
              <Link
                className={`page-toggle__item ${
                  (input === "female" || input === "womens" || input === "") ? "active" : ""
                }`}
                to={links.forHer}
                onClick={() => save("female")}
              >
                For Her
              </Link>
              <Link
                className={`page-toggle__item ${(input === "male" || input === 'mens') ? "active" : ""}`}
                to={links.forHim}
                onClick={() => save("male")}
              >
                For Him
              </Link>
            </>
          ) : (
            <>
              <button
                className={`page-toggle__item ${
                  (input === "female" || input === "womens" || input === "") ? "active" : ""
                }`}
                onClick={() => {
                  save("female")
                  filterChange('womens')
                }}
              >
                For Her
              </button>
              <button
                className={`page-toggle__item ${(input === "male" || input === 'mens') ? "active" : ""}`}
                onClick={() => {
                  save("male")
                  filterChange('mens')
                }}
              >
                For Him
              </button>
            </>
          )}
          {hasForAll &&
            <button
              className={`page-toggle__item ${!input ? "active" : ""}`}
              onClick={() => {
                save("empty")
                filterChange()
              }}
            >
              For all
            </button>
          }
        </div>
      </FilterWrapper>
    );
  }
}
