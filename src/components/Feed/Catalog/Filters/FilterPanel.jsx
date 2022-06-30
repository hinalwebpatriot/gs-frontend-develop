import React, { Fragment } from "react";
import closeSvg from "../../../../img/svg/close.svg";
import FilterRangeNumber from "../../Shared/Filters/FilterRangeNumber";
import FilterMetal from "../../Shared/Filters/FilterMetal";
import RingConstructor from "../../../_common/RingConstructor/RingConstructor";
import { findEngagementFilterByName } from "../../../../utils/findFilterByName";
import { isEqual } from "lodash";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import IconFA from '../../../_common/IconFA';
import FilterCategory from "../../Shared/Filters/FilterCategory";
import FilterGender from "../../Shared/Filters/FilterGender";
import FilterSizes from "../../Shared/Filters/FilterSizes";
import FilterShapes from "../../Shared/Filters/FilterShapes";
import routing from "../../../../config/routing";

export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { match } = this.props;

    let catalog = match.params.catalog || 'earrings';
    if (catalog === 'cluster-rings') catalog = 'rings';
    if (this.props.status !== "success") {
      this.props.fetchFilters(catalog);
      this.handleUrlFilters();
      return;
    }

    if (RingConstructor.diamondId) {
      this.props.clearFilters();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { params } = this.props.match;
    if (!isEqual(params, prevProps.match.params)) {
      // this.props.clearFilters();
      this.handleUrlFilters();
    }
  }

  handleUrlFilters = () => {
    const { params } = this.props.match;

    // this.props.clearFilters();

    if (params.filter) {
      const { type, slug } = findEngagementFilterByName(params.filter);

      const {
        setCatalogShape,
        setCatalogStyle,
        setCatalogMetal
      } = this.props;

      switch (type) {
        case "style":
          setCatalogStyle(slug);
          break;
        case "metal":
          setCatalogMetal(slug);
          break;
        case "shape":
          if (!RingConstructor.diamondId) {
            setCatalogShape(slug);
          }
          break;
        default:
          return;
      }
    }
  };

  closeModalHandler = ({ target }) => {
    if (!target.closest(".modal-mob__inner")) {
      this.props.handleModal();
    }
  };

  componentWillUnmount() {
    if (RingConstructor.diamondId) {
      this.props.clearFilters();
    }
  }

  render() {
    const {
      forwardRef,
      status,
      input,
      clear,
      toggle,
      showMobileFilters,
      clearFilters,
      toggleAllMetals,
      saveCatalogPrice,
      saveCatalogMetal,
      saveCatalogShape,
      saveCatalogSize,
      handleModal,
      isMobile,
      catalogType,
      filterCategories,
      filterChange,
      changeGenderTab,
      changeSizeTab,
      history,
        match
    } = this.props;
    const {
      metal = [],
      price = {},
      size = [],
      style = []
    } = this.props.config;

    const jewelleryCatalog = match.path.split('/')[1];

    const showGenderFilter = match.params.catalog === 'eternity-rings' || match.params.catalog === 'earrings';
    const showSizeFilter = match.params.catalog === 'eternity-rings';
    const showShapeFilter = match.params.catalog === 'earrings';
    const renderMetalFiltersAsLinks = match.params.catalog === 'eternity-rings' || match.params.catalog === 'earrings' || match.params.catalog === 'bracelets';

    return (
      <div className="col-lg-4 col-xl-3">
        <div
          className={`filter-container modal-mob ${
            showMobileFilters ? "active" : ""
          }`}
          onClick={this.closeModalHandler}
        >
          <div className="modal-mob__inner filter-pc-bar" ref={forwardRef}>
            <FilterCategory
              catalogType={catalogType}
              filterCategories={filterCategories}
              onChange={clearFilters}
            />
            {status === "request" || status === "none" ? (
              <Fragment>
                <button className="close-nav sm-show" onClick={handleModal}>
                  <img src={closeSvg} alt="" />
                </button>
                <div className="row">{/*<Preloader withMargin />*/}</div>
              </Fragment>
            ) : (
              <Fragment>
                <button className="close-nav sm-show" onClick={handleModal}>
                  <img src={closeSvg} alt="" />
                </button>
                {/*<div className="modal-header justify-content-between sm-show">*/}
                {/*<div className="">*/}
                {/*/!*<p className="modal-header-title">*!/*/}
                {/*/!*Diamond filters*!/*/}
                {/*/!*</p>*!/*/}
                {/*/!*<span className="modal-subtitle">{`${total} ${total > 1 ? 'diamonds' : 'diamond'} found`}</span>*!/*/}
                {/*</div>*/}
                {/*<button className="filter-apply" onClick={handleModal}>*/}
                {/*Apply*/}
                {/*</button>*/}
                {/*</div>*/}

                <div className="row">
                  {showGenderFilter && (
                    <FilterGender
                      wrapper="product"
                      title="I want to choose"
                      type="gender"
                      input={input.gender}
                      save={changeGenderTab}
                      // filterChange={(gender) => filterChange({history, catalog: match.params.catalog, filter: gender })}
                      video={{
                        category: "wedding-rings",
                        type: "gender",
                        title: "Gender"
                      }}
                      renderAsLinks
                      links={{
                        forHer: routing({ catalog: match.params.catalog, filter: 'womens' }).catalogFeedWithFilter,
                        forHim: routing({ catalog: match.params.catalog, filter: 'mens' }).catalogFeedWithFilter,
                      }}
                    />
                  )}
                  <FilterMetal
                    wrapper="product"
                    title="Metal"
                    type="metal"
                    data={metal}
                    input={input.metal}
                    gender={input.gender}
                    save={saveCatalogMetal}
                    // filterChange={(metal) => filterChange({history, catalog: match.params.catalog, filter: metal })}
                    toggle={toggleAllMetals}
                    video={{
                      category: "product",
                      type: "metal"
                    }}
                    renderAsLinks={renderMetalFiltersAsLinks}
                    createFilterLink={(metal) => routing({ catalog: match.params.catalog, filter: metal }).catalogFeedWithFilter}
                  />
                  <FilterRangeNumber
                    wrapper="product"
                    title="Price"
                    type="price"
                    sign="price"
                    step={100}
                    accuracy={0}
                    min={Math.floor(price.min)}
                    max={Math.ceil(price.max)}
                    input={input.price}
                    save={saveCatalogPrice}
                    filterChange={() => filterChange({history, catalog: match.params.catalog})}
                    toggle={toggle}
                    logarithm
                    video={{
                      category: "product",
                      type: "price"
                    }}
                  />
                  {showSizeFilter && (
                    <FilterSizes
                      wrapper="sizes"
                      title="Size"
                      type="size"
                      data={size}
                      input={input.size}
                      select={saveCatalogSize}
                      filterChange={() => filterChange({history, catalog: match.params.catalog})}
                      changeTab={changeSizeTab}
                      clear={clear}
                      video={{
                        category: "product",
                        type: "size"
                      }}
                    />
                  )}

                  {showShapeFilter && (
                    <FilterShapes
                      wrapper="product"
                      title="Diamond Shapes"
                      type="shape"
                      input={input.shape}
                      save={saveCatalogShape}
                      clear={clear}
                      disabled={RingConstructor.diamondId}
                      video={{
                        category: "product",
                        type: "shape"
                      }}
                    />
                  )}
                  {/*{offers.length &&*/}
                    {/*(<FilterCheckbox*/}
                        {/*wrapper="product"*/}
                        {/*title="Offers"*/}
                        {/*type="offers"*/}
                        {/*data={offers}*/}
                        {/*input={input.offers}*/}
                        {/*save={saveCatalogOffers}*/}
                        {/*clear={clear}*/}
                        {/*video={{*/}
                          {/*category: "product",*/}
                          {/*type: "offer"*/}
                        {/*}}*/}
                      {/*/>)*/}
                  {/*}*/}
                  {/*<FilterCheckbox*/}
                    {/*wrapper="product"*/}
                    {/*title="Brands"*/}
                    {/*type="brands"*/}
                    {/*data={brands}*/}
                    {/*input={input.brands}*/}
                    {/*save={saveCatalogBrands}*/}
                    {/*clear={clear}*/}
                    {/*video={{*/}
                      {/*category: "product",*/}
                      {/*type: "brand"*/}
                    {/*}}*/}
                  {/*/>*/}
                </div>
                <div className="col-12 filter-full-btn">
                  <div className="more-filter">
                    <button
                      className="more-filter__btn more-filter__btn--type2"
                      onClick={() => clearFilters()}
                    >
                      <span>
                        <IconFA icon={faSyncAlt}/>
                      </span>
                      Clear all
                    </button>
                  </div>
                </div>
                <div className="col-12 sm-show filter-full-btn">
                  <div className="apply">
                    <button
                      className="theme-btn theme-btn--type2  theme-btn--full-width"
                      onClick={handleModal}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
