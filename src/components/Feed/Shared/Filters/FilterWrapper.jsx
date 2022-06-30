import React from "react";

import VideoHint from "../../../_common/VideoHint/VideoHint";

const DiamondsFilterWrapper = ({
  children,
  title = "",
  video = {},
  isCancelable = true,
  onCancel,
  isDisabled,
  customText
}) => (
  <div className="col-lg-4 filter-col">
    <div className={`filter ${isDisabled ? "disabled" : ""}`}>
      <div className="filter-panel">
        {/* <VideoHint
          title={video.title || title}
          type={video.type}
          category={video.category}
        /> */}
        <p className="filter-title">{title}</p>

        {isCancelable &&
          (isDisabled ? (
            <button
              className="filter-cancel filter-cancel--select"
              onClick={onCancel}
            >
              Select
            </button>
          ) : (
            <button
              className="filter-cancel filter-cancel--deselect"
              onClick={onCancel}
            >
              {/*<span>*/}
                {/*<img src={closeImg} alt="" />*/}
              {/*</span>*/}
              Deselect
            </button>
          ))}
        {customText && <button type="button" className="filter-cancel filter-cancel--disabled">{customText}</button>}
      </div>
      <div className="filter__body">{children}</div>
    </div>
  </div>
);

const EngagementFilterWrapper = ({
  children,
  title = "",
  video = {},
  isCancelable = true,
  onCancel,
  isClearable = false,
  onClear,
  isDisabled,
  customText
}) => (
  <div className="col-lg-12">
    <div className={`filter ${isDisabled ? "disabled" : ""}`}>
      <div className="filter-panel ">
        <VideoHint
          title={video.title || title}
          type={video.type}
          category={video.category}
        />
        <p className="filter-title">{title}</p>
        {isClearable && (
          <button className="filter-cancel filter-cancel--clear" onClick={onClear}>
            {/*<span>*/}
              {/*<img src={closeImg} alt="" />*/}
            {/*</span>*/}
            Clear
          </button>
        )}

        {isCancelable && ( isDisabled ? (
            <button className="filter-cancel filter-cancel--select" onClick={onCancel}>
              Select
            </button>
          ) : (
            <button className="filter-cancel filter-cancel--deselect" onClick={onCancel}>
              {/*<span>*/}
                  {/*<img src={closeImg} alt="" />*/}
                {/*</span>*/}
              Deselect
            </button>
          )
        )}

        {customText && <button type="button" className="filter-cancel filter-cancel--disabled">{customText}</button>}
      </div>
      <div className="filter__body">{children}</div>
    </div>
  </div>
);

const SizesFilterWrapper = ({
  children,
  title = "",
  video = {},
  isCancelable = true,
  isClearable = false,
  onClear,
  onCancel,
  isDisabled,
  currentTab,
  changeTab
}) => (
  <div className="col-lg-12">
    <div className={`filter ${isDisabled ? "disabled" : ""}`}>
      <div className="filter-panel ">
        <VideoHint
          title={video.title || title}
          type={video.type}
          category={video.category}
        />
        <p className="filter-title">{title}</p>
        <div className="size-toggle">
          <button
            onClick={() => changeTab("au")}
            className={`size-toggle__item ${
              currentTab === "au" ? "active" : ""
            }`}
          >
            AUS
          </button>
          <button
            onClick={() => changeTab("us")}
            className={`size-toggle__item ${
              currentTab === "us" ? "active" : ""
            }`}
          >
            U.S.
          </button>
        </div>

        {isClearable && (
          <button className="filter-cancel filter-cancel--clear" onClick={onClear}>
            {/*<span>*/}
              {/*<img src={closeImg} alt="" />*/}
            {/*</span>*/}
            Clear
          </button>
        )}

        {isCancelable && ( isDisabled ? (
            <button className="filter-cancel filter-cancel--select" onClick={onCancel}>
              Select
            </button>
          ) : (
            <button className="filter-cancel filter-cancel--deselect" onClick={onCancel}>
              {/*<span>*/}
                  {/*<img src={closeImg} alt="" />*/}
                {/*</span>*/}
              Deselect
            </button>
          )
        )}
      </div>
      <div className="filter__body">{children}</div>
    </div>
  </div>
);

const FilterWrapper = props => {
  switch (props.wrapper) {
    case "diamonds":
      return <DiamondsFilterWrapper {...props} />;
    case "product":
    case "engagement-default":
      return <EngagementFilterWrapper {...props} />;
    case "sizes":
      return <SizesFilterWrapper {...props} />;
    default:
      return <div>{props.children}</div>;
  }
};

export default FilterWrapper;
