import React, { Fragment } from "react";
import closeSvg from "../../../../img/svg/close.svg";
import FilterPanelMore from "./FilterPanelMore";
import FilterShapes from "../../Shared/Filters/FilterShapes";
import { Preloader } from "../../../_common/Preloader";
import FilterRangeStep from "../../Shared/Filters/FilterRangeStep";
import FilterRangeNumber from "../../Shared/Filters/FilterRangeNumber";
import localeStore from "../../../../config/LocalesStore";
import RingConstructor from "../../../_common/RingConstructor/RingConstructor";

export default class FilterPanel extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchFilters();
      this.handleUrlFilters();
      return
    }

    if (RingConstructor.settingId) {
      this.props.clearFilters();
      this.handleUrlFilters();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { params } = this.props.match;
    if ((params.shape !== prevProps.match.params.shape) || (params.carat !== prevProps.match.params.carat)) {
      this.handleUrlFilters();
    }
  }

  handleUrlFilters = () => {
    const { params } = this.props.match;
    const shape = params.shape;
    if (shape && !RingConstructor.settingId) {
      if (shape.slice(-6) === '-carat') {this.props.setCaratFromUrl(shape.slice(0, -6).replace('-', '.'))}
      else this.props.setDiamondsShape(shape.toLowerCase());
    }
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.props.isExpanded !== nextProps.isExpanded ||
  //     this.props.config !== nextProps.config ||
  //     this.props.input !== nextProps.input ||
  //     this.props.match.params.shape !== nextProps.match.params.shape ||
  //     this.props.showMobileFilters !== nextProps.showMobileFilters
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  componentWillUnmount() {
    // this.props.clearState();
    if (RingConstructor.settingId) {
      this.props.clearFilters();
    }
  }

  handleExpand = () => {
    this.props.expandDiamondsFilters();
    this.props.disableDiamondsFilters([
      "polish",
      "symmetry",
      "fluorescence",
      "depth",
      "table",
      "size_ratio"
    ]);
  };

  closeModalHandler = ({ target }) => {
    if (!target.closest(".modal-mob__inner")) {
      this.props.handleModal();
    }
  };

  render() {
    const {
      status,
      total,
      showMobileFilters,
      isExpanded,
      saveDiamondsFilter,
      toggleDiamondsFilter,
      saveDiamondsShape,
      handleModal,
      clearFilters
    } = this.props;
    const {
      carat = {},
      price = {},
      depth = {},
      table = {},
      size_ratio = {}
    } = this.props.config;
    const { shared, shapes } = this.props.input;
    if ((RingConstructor.min_stone_carat || RingConstructor.min_stone_carat === 0)
        && RingConstructor.max_stone_carat) {
      carat.min = +RingConstructor.min_stone_carat;
      carat.max = +RingConstructor.max_stone_carat;
    }
    return (
      <div
        className={`filter-container modal-mob ${
          showMobileFilters ? "active" : ""
        }`}
        onClick={this.closeModalHandler}
      >
        <div className=" modal-mob__inner diamonds-filter-bar">
          {status === "request" || status === "none" ? (
            <Fragment>
              <button className="close-nav sm-show" onClick={handleModal}>
                <img src={closeSvg} alt="" />
              </button>
              <div className="row">
                <Preloader withMargin />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <button className="close-nav sm-show" onClick={handleModal}>
                <img src={closeSvg} alt="" />
              </button>
              <div className="modal-header justify-content-between sm-show">
                <div className="">
                  {/*<p className="modal-header-title">*/}
                  {/*Diamond filters*/}
                  {/*</p>*/}
                  <span className="modal-subtitle">{`${total} ${
                    total > 1 ? "diamonds" : "diamond"
                  } found`}</span>
                </div>
                {/*<button className="filter-apply" onClick={handleModal}>*/}
                {/*Apply*/}
                {/*</button>*/}
              </div>

              <div className="row">
                <FilterShapes
                  wrapper="diamonds"
                  title="Shapes"
                  type="shapes"
                  input={shapes}
                  save={saveDiamondsShape}
                  toggle={toggleDiamondsFilter}
                  disabled={RingConstructor.settingId}
                  video={{
                    category: "diamonds",
                    type: "shape"
                  }}
                />
                <FilterRangeNumber
                  category="diamonds"
                  wrapper="diamonds"
                  title="Carat"
                  type="carat"
                  sign="number"
                  step={0.01}
                  accuracy={2}
                  min={carat.defaultMin ? carat.defaultMin : carat.min}
                  max={carat.defaultMax ? carat.defaultMax : carat.max}
                  input={shared.carat}
                  save={saveDiamondsFilter}
                  toggle={toggleDiamondsFilter}
                  logarithm
                  video={{
                    category: "diamonds",
                    type: "carat"
                  }}
                />
                <FilterRangeStep
                  category="diamonds"
                  wrapper="diamonds"
                  title="Cut"
                  type="cut"
                  marginLeft="-11.75%"
                  marks={["Excellent", "Very good", "Good", "Fair"]}
                  input={shared.cut}
                  save={saveDiamondsFilter}
                  toggle={toggleDiamondsFilter}
                  video={{
                    category: "diamonds",
                    type: "cut"
                  }}
                />
                <FilterRangeNumber
                  category="diamonds"
                  wrapper="diamonds"
                  title={`Price (${localeStore.taxString})`}
                  type="price"
                  sign="price"
                  step={100}
                  accuracy={0}
                  min={Math.floor(price.min)}
                  max={Math.ceil(price.max)}
                  input={shared.price}
                  save={saveDiamondsFilter}
                  toggle={toggleDiamondsFilter}
                  logarithm
                  video={{
                    category: "diamonds",
                    type: "price"
                  }}
                />
                <FilterRangeStep
                  category="diamonds"
                  wrapper="diamonds"
                  title="Clarity"
                  type="clarity"
                  marginLeft="-6.25%"
                  marks={[
                    "FL",
                    "IF",
                    "VVS1",
                    "VVS2",
                    "VS1",
                    "VS2",
                    "SI1",
                    "SI2"
                  ]}
                  input={shared.clarity}
                  save={saveDiamondsFilter}
                  toggle={toggleDiamondsFilter}
                  video={{
                    category: "diamonds",
                    type: "clarity"
                  }}
                />
                <FilterRangeStep
                  category="diamonds"
                  wrapper="diamonds"
                  title="Color"
                  type="color"
                  marginLeft="-5%"
                  marks={["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]}
                  input={shared.color}
                  save={saveDiamondsFilter}
                  toggle={toggleDiamondsFilter}
                  video={{
                    category: "diamonds",
                    type: "color"
                  }}
                />
                {isExpanded && (
                  <Fragment>
                    <FilterRangeStep
                      category="diamonds"
                      wrapper="diamonds"
                      title="Polish"
                      type="polish"
                      marginLeft="-12.5%"
                      marks={["Excellent", "Very good", "Good", "Fair"]}
                      input={shared.polish}
                      save={saveDiamondsFilter}
                      toggle={toggleDiamondsFilter}
                      video={{
                        category: "diamonds",
                        type: "polish"
                      }}
                    />
                    <FilterRangeStep
                      category="diamonds"
                      wrapper="diamonds"
                      title="Symmetry"
                      type="symmetry"
                      marginLeft="-12.5%"
                      marks={["Excellent", "Very good", "Good", "Fair"]}
                      input={shared.symmetry}
                      save={saveDiamondsFilter}
                      toggle={toggleDiamondsFilter}
                      video={{
                        category: "diamonds",
                        type: "symmetry"
                      }}
                    />
                    <FilterRangeStep
                      category="diamonds"
                      wrapper="diamonds"
                      title="Fluorescence"
                      type="fluorescence"
                      marginLeft="-10%"
                      marks={[
                        "None",
                        "Faint",
                        "Medium",
                        "Strong",
                        "Very strong"
                      ]}
                      input={shared.fluorescence}
                      save={saveDiamondsFilter}
                      toggle={toggleDiamondsFilter}
                      video={{
                        category: "diamonds",
                        type: "fluorescence"
                      }}
                    />
                    <FilterRangeNumber
                      category="diamonds"
                      wrapper="diamonds"
                      title="Depth"
                      type="depth"
                      sign="percent"
                      step={1}
                      accuracy={0}
                      min={Math.floor(depth.min)}
                      max={Math.ceil(depth.max)}
                      input={shared.depth}
                      save={saveDiamondsFilter}
                      toggle={toggleDiamondsFilter}
                      video={{
                        category: "diamonds",
                        type: "depth"
                      }}
                    />
                    <FilterRangeNumber
                      category="diamonds"
                      wrapper="diamonds"
                      title="Table"
                      type="table"
                      sign="percent"
                      step={1}
                      accuracy={0}
                      min={Math.floor(table.min)}
                      max={Math.ceil(table.max)}
                      input={shared.table}
                      save={saveDiamondsFilter}
                      toggle={toggleDiamondsFilter}
                      video={{
                        category: "diamonds",
                        type: "table"
                      }}
                    />
                    <FilterRangeNumber
                      category="diamonds"
                      wrapper="diamonds"
                      title="Length to width ratio"
                      type="size_ratio"
                      step={0.01}
                      accuracy={2}
                      sign="number"
                      min={size_ratio.min}
                      max={size_ratio.max}
                      input={shared.size_ratio}
                      save={saveDiamondsFilter}
                      toggle={toggleDiamondsFilter}
                      video={{
                        category: "diamonds",
                        type: "size_ratio"
                      }}
                    />
                  </Fragment>
                )}

                <FilterPanelMore
                  handleExpand={this.handleExpand}
                  isExpanded={isExpanded}
                  handleRefresh={() => clearFilters()}
                />
                <div className="col-12 sm-show">
                  <div className="apply">
                    <button
                      className="theme-btn theme-btn--type2  theme-btn--full-width"
                      onClick={handleModal}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
