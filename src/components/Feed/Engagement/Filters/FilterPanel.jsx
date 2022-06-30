import React, { Fragment } from "react";
import FilterShapes from "../../Shared/Filters/FilterShapes";
import closeSvg from "../../../../img/svg/close.svg";
import FilterRangeNumber from "../../Shared/Filters/FilterRangeNumber";
import FilterMetal from "../../Shared/Filters/FilterMetal";
import FilterStyle from "../../Shared/Filters/FilterStyle";
import FilterSizes from "../../Shared/Filters/FilterSizes";
import FilterCheckbox from "../../Shared/Filters/FilterCheckbox";
import localeStore from "../../../../config/LocalesStore";
import RingConstructor from "../../../_common/RingConstructor/RingConstructor";
import { findEngagementFilterByName } from "../../../../utils/findFilterByName";
import { isEqual } from "lodash";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import IconFA from '../../../_common/IconFA';
import FilterGender from "../../Shared/Filters/FilterGender";

export default class FilterPanel extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchFilters();
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
        setEngagementShape,
        setEngagementStyle,
        setEngagementMetal,
        setEngagementOffers,
        setEngagementGender
      } = this.props;
      switch (type) {
        case "style":
          setEngagementStyle(slug);
          break;
        case "metal":
          setEngagementMetal(slug);
          break;
        case "shape":
          if (!RingConstructor.diamondId) {
            setEngagementShape(slug);
          }
          break;
        case 'offers':
          setEngagementOffers(slug);
        case 'gender':
          setEngagementGender(slug);
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
      changeSizeTab,
      clearFilters,
      toggleAllMetals,
      changeGenderTab,
      saveEngagementShape,
      saveEngagementPrice,
      saveEngagementMetal,
      saveEngagementStyle,
      saveEngagementSize,
      saveEngagementCollection,
      saveEngagementOffers,
      filterChange,
      handleModal,
      isMobile,
      history
    } = this.props;
    let {
      price = {},
      metal = [],
      style = [],
      size = [],
      collection = [],
      offers = []
    } = this.props.config;
    collection = collection.filter((item) => item.id !== 16);
    return (
      <div className="col-lg-4 col-xl-3">
        <div
          className={`filter-container modal-mob ${
            showMobileFilters ? "active" : ""
          }`}
          onClick={this.closeModalHandler}
        >
          <div className="modal-mob__inner filter-pc-bar" ref={forwardRef}>
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
                <FilterGender
                    wrapper="engagement-default"
                    title="I want to choose"
                    type="gender"
                    input={input.gender}
                    filterChange={() => filterChange({history})}
                    save={changeGenderTab}
                    video={{
                      category: "engagement-rings",
                      type: "gender",
                      title: "Gender"
                    }}
                  />
                  <FilterMetal
                    wrapper="engagement-default"
                    title="Metal"
                    type="metal"
                    data={metal}
                    input={input.metal}
                    filterChange={() => filterChange({history})}
                    save={saveEngagementMetal}
                    toggle={toggleAllMetals}
                    video={{
                      category: "engagement-rings",
                      type: "metal"
                    }}
                  />
                  <FilterRangeNumber
                    wrapper="engagement-default"
                    title={`Price (${localeStore.taxString})`}
                    type="price"
                    sign="price"
                    step={100}
                    accuracy={0}
                    min={Math.floor(price.min)}
                    max={Math.ceil(price.max)}
                    input={input.price}
                    filterChange={() => filterChange({history})}
                    save={saveEngagementPrice}
                    toggle={toggle}
                    logarithm
                    video={{
                      category: "engagement-rings",
                      type: "price"
                    }}
                  />
                  <FilterStyle
                    wrapper="engagement-default"
                    title="Style"
                    type="style"
                    data={style}
                    input={input.style}
                    filterChange={() => filterChange({history})}
                    save={saveEngagementStyle}
                    clear={clear}
                    video={{
                      category: "engagement-rings",
                      type: "style"
                    }}
                    isMobile={isMobile}
                    showMobile={showMobileFilters}
                  />
                  <FilterShapes
                    wrapper="engagement-default"
                    title="Diamond Shapes"
                    type="shape"
                    input={input.shape}
                    save={saveEngagementShape}
                    filterChange={() => filterChange({history})}
                    clear={clear}
                    disabled={RingConstructor.diamondId}
                    video={{
                      category: "engagement-rings",
                      type: "shape"
                    }}
                  />
                  <FilterSizes
                    wrapper="sizes"
                    title="Size"
                    type="size"
                    data={size}
                    input={input.size}
                    filterChange={() => filterChange({history})}
                    select={saveEngagementSize}
                    changeTab={changeSizeTab}
                    clear={clear}
                    video={{
                      category: "engagement-rings",
                      type: "size"
                    }}
                  />
                  <FilterCheckbox
                    wrapper="engagement-default"
                    title="Offers"
                    type="offers"
                    data={offers}
                    input={input.offers}
                    filterChange={() => filterChange({history})}
                    save={saveEngagementOffers}
                    clear={clear}
                    video={{
                      category: "engagement-rings",
                      type: "offer"
                    }}
                  />
                  <FilterCheckbox
                    wrapper="engagement-default"
                    title="Collections"
                    type="collection"
                    data={collection}
                    input={input.collection}
                    filterChange={() => filterChange({history})}
                    save={saveEngagementCollection}
                    clear={clear}
                    video={{
                      category: "engagement-rings",
                      type: "collection"
                    }}
                  />
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
