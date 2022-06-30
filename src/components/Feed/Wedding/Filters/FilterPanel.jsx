import React, { Fragment } from "react";
import closeSvg from "../../../../img/svg/close.svg";
import FilterRangeNumber from "../../Shared/Filters/FilterRangeNumber";
import FilterMetal from "../../Shared/Filters/FilterMetal";
import FilterStyle from "../../Shared/Filters/FilterStyle";
import FilterSizes from "../../Shared/Filters/FilterSizes";
import FilterCheckbox from "../../Shared/Filters/FilterCheckbox";
import FilterGender from "../../Shared/Filters/FilterGender";
import localeStore from "../../../../config/LocalesStore";
import {
  findWeddingFilterByName
} from "../../../../utils/findFilterByName";
import routing from "../../../../config/routing";
import { isEqual } from "lodash";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import IconFA from '../../../_common/IconFA';

export default class FilterPanel extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchFilters();
      this.handleUrlFilters();
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    if (!isEqual(params, prevProps.match.params)) {
      this.handleUrlFilters();
    }
  }

  // componentWillUnmount() {
  //   this.props.clearState();
  // }

  handleUrlFilters = () => {
    const { params, path } = this.props.match;
    
    // this.props.clearFilters();

    switch (path) {
      case routing().weddingFeedWithFilter:
        this.handleOneFilter(params.filter);
        break;
      case routing().weddingFeedWithGenderFilter:
        this.handleTwoFilters({ gender: params.gender, style: params.style });
        break;
        default:
          break;
    }
  };

  handleOneFilter = filter => {
    const { type, slug } = findWeddingFilterByName(filter);

    const { changeGenderTab, setWeddingStyle, setWeddingMetal } = this.props;

    switch (type) {
      case "metal":
        setWeddingMetal(slug);
        break;
      case "style":
        setWeddingStyle(slug);
        break;
      case "gender":
        changeGenderTab(slug);
        break;
      default:
        return;
    }
  };

  handleTwoFilters = ({ gender, style }) => {
    const { changeGenderTab, setWeddingStyle } = this.props;

    const genderFilter = findWeddingFilterByName(gender);

    if (genderFilter.type === "gender") {
      changeGenderTab(genderFilter.slug);
    }
    setWeddingStyle(style.toLowerCase());
  };

  closeModalHandler = ({ target }) => {
    if (!target.closest(".modal-mob__inner")) {
      this.props.handleModal();
    }
  };

  render() {
    const {
      status,
      input,
      clear,
      clearFilters,
      toggle,
      showMobileFilters,
      changeSizeTab,
      changeGenderTab,
      toggleAllMetals,
      saveWeddingPrice,
      saveWeddingMetal,
      saveWeddingStyle,
      saveWeddingSize,
      saveWeddingOffers,
      filterChange,
      handleModal,
      forwardRef,
      isMobile,
      history
    } = this.props;
    const {
      price = {},
      metal = [],
      style = [],
      size = [],
      offers = []
    } = this.props.config;

    const styleByGender = style.filter(
      item => item.gender === input.gender || item.gender === null
    );
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
                    save={changeGenderTab}
                    filterChange={() => filterChange({history})}
                    video={{
                      category: "wedding-rings",
                      type: "gender",
                      title: "Gender"
                    }}
                  />
                  <FilterStyle
                    wrapper="engagement-default"
                    title="Style"
                    type="style"
                    data={styleByGender}
                    input={input.style}
                    save={saveWeddingStyle}
                    filterChange={() => filterChange({history})}
                    clear={clear}
                    video={{
                      category: "wedding-rings",
                      type: "style"
                    }}
                    showMobile={showMobileFilters}
                    isMobile={isMobile}
                  />
                  <FilterMetal
                    wrapper="engagement-default"
                    title="Metal"
                    type="metal"
                    data={metal}
                    gender={input.gender}
                    input={input.metal}
                    save={saveWeddingMetal}
                    filterChange={() => filterChange({history})}
                    toggle={toggleAllMetals}
                    video={{
                      category: "wedding-rings",
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
                    save={saveWeddingPrice}
                    filterChange={() => filterChange({history})}
                    toggle={toggle}
                    logarithm
                    video={{
                      category: "wedding-rings",
                      type: "price"
                    }}
                  />
                  <FilterSizes
                    wrapper="sizes"
                    title="Size"
                    type="size"
                    data={size}
                    input={input.size}
                    select={saveWeddingSize}
                    filterChange={() => filterChange({history})}
                    changeTab={changeSizeTab}
                    clear={clear}
                    video={{
                      category: "wedding-rings",
                      type: "size"
                    }}
                  />
                  <FilterCheckbox
                    wrapper="engagement-default"
                    title="Offers"
                    type="offers"
                    data={offers}
                    input={input.offers}
                    save={saveWeddingOffers}
                    filterChange={() => filterChange({history})}
                    clear={clear}
                    video={{
                      category: "wedding-rings",
                      type: "offer"
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
                <div className="col-12 filter-full-btn sm-show">
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
