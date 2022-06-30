import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { flowRight as compose } from "lodash";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import ProductFeedWrapper from "../Shared/ProductFeedWrapper";
import FilterPanelContainer from "./Filters/FilterPanelContainer";
import CatalogFeedListContainer from "./List/CatalogFeedListContainer";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import OnlineHelpBlock from "../../_common/OnlineHelpBlock/OnlineHelpBlock";
import EngagementShoppingEasy from "./Items/CatalogShoppingEasy";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import CompareAndFavoriteBarContainer from "../../_common/CompareAndFavorites/CompareAndFavoriteBarContainer";
import MetaTags from "../../_common/SEO/MetaTags";
import { fetchMetaTags } from "../../_common/SEO/SeoActions";
import SeoTextBlock from "../../_common/SEO/SeoTextBlock";
import createMetaSlug from "../../../utils/createMetaSlug";
import { metaTagsSelector, seoTextBlockSelector } from "../../_selectors/metaTagsSelectors";
import { fetchCatalogFeed } from "./CatalogFeedActions";
import selectors, { filterCategories } from "../../_selectors/catalogFeedSelectors";
import QuestionsPage from "../../Static/Questions/QuestionsPage";
import { GReviewWidgetMobile } from "../../_common/GoogleReviewWidget";
import { dataLayerPush } from '../../../utils/dataLayer';
import toPascalCase from '../../../utils/toPascalCase';

class CatalogFeedPage extends React.Component {
  constructor(props) {
    super(props);

    this.sidebar = React.createRef();
    this.wrapper = React.createRef();
    this.headerOffset = 107;

    this.state = {
      showMobileFilters: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler);
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'category'
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = () => {
    const { isMobile } = this.props;
    const sidebar = this.sidebar.current;
    const wrapper = this.wrapper.current;

    if (isMobile) {
      sidebar.style.position = "";
      sidebar.style.height = "";
      sidebar.style.top = "";
      sidebar.style.display = "";
      return;
    }

    wrapper.style.minHeight = `${window.innerHeight}px`;

    const wrapperRect = wrapper.getBoundingClientRect();
    const viewport = window.innerHeight; //viewport height
    const scroll = window.pageYOffset || document.documentElement.scrollTop; //scroll height
    const topOffset = wrapperRect.top + scroll - this.headerOffset; //top offset of wrapper (distance from top to block)

    if (scroll > topOffset) {
      //if top position of the sidebar less than top viewport position
      sidebar.style.position = "fixed";
      sidebar.style.top = `${this.headerOffset}px`;

      if (viewport > wrapperRect.bottom) {
        //if viewport bottom position greater than wrapper bottom position
        if (wrapperRect.bottom > 0) {
          //if value less than null
          sidebar.style.height = `${wrapperRect.bottom - this.headerOffset}px`;
          sidebar.style.display = "block";
        } else {
          sidebar.style.height = `0px`;
          sidebar.style.display = "none";
        }
      } else {
        //if viewport bottom position is less than wrapper bottom position
        sidebar.style.height = `${viewport - this.headerOffset}px`;
      }
    } else {
      //if top position of the sidebar is greater than top viewport position
      sidebar.style.position = "static";
      sidebar.style.height = `${viewport - (topOffset - scroll) - this.headerOffset}px`;
    }
  };

  handleMobileModal = () => {
    this.setState(prevState => ({
      showMobileFilters: !prevState.showMobileFilters
    }));
  };

  render() {
    const { showMobileFilters } = this.state;
    const { match, metaSlug, filterCategories, data, pagination } = this.props;

    let catalogType = match.params.catalog || '';
    if (catalogType === 'cluster-rings') catalogType = 'rings';
    const to = catalogType.length;
    const typeJewellery = (['earrings', 'bracelets', 'rings', 'eternity-rings'].indexOf(catalogType) !== -1) ? catalogType.substring(0, to-1) : catalogType;
    const catType = catalogType.charAt(0).toUpperCase() + catalogType.slice(1);
    let marks = [
      { title: 'Jewellery', path: '/jewellery' },
      { title: catType.replace('-', ' '), path: routing(catalogType).catalogFeed }
      ];
    let page = createMetaSlug('jewellery', catalogType);
    if (match.path === routing().catalogFeedPagination) {
      marks = [
        ...marks,
        {
          title: `${catType} - Page ${match.params.pageNumber}`,
          path: routing({ catalog: match.params.catalog, pageNumber: match.params.pageNumber}).catalogFeedPagination
        }
      ];
    }
    if (match.path === routing().catalogFeedWithFilter) {
      page = `jewellery-${catalogType}-${match.params.filter}`;
      marks = [
        ...marks,
        {
          title: toPascalCase(match.params.filter),
          path: routing({ catalog: match.params.catalog, filter: match.params.filter}).catalogFeedWithFilter
        }
      ];
    }
    if (match.path === routing().catalogFeedWithFilterPagination) {
      page = `jewellery-${catalogType}-${match.params.filter}`;
      marks = [
        ...marks,
        {
          title: toPascalCase(match.params.filter),
          path: routing({ catalog: match.params.catalog, filter: match.params.filter}).catalogFeedWithFilter
        },
        {
          title: `${toPascalCase(match.params.filter)} - Page ${match.params.pageNumber}`,
          path: routing({ catalog: match.params.catalog, filter: match.params.filter, pageNumber: match.params.pageNumber }).catalogFeedWithFilterPagination
        }
      ];
    }

    const description = 'GSDiamonds jewellery pieces crafted to make your special & your best days even more memorable. Read about our collection of jewellery gifts';

    return (
      <>
        <MetaTags page={page} description={description} pagination={pagination}/>
        <Breadcrumbs marks={marks} />
        {/*<ConstructorSteps marks={RingConstructor.generateSteps("engagement")} />*/}
        <ProductFeedWrapper>
          <FilterPanelContainer
            handleModal={this.handleMobileModal}
            showMobileFilters={showMobileFilters}
            forwardRef={this.sidebar}
            catalogType={catalogType}
            filterCategories={filterCategories}
          />
          <CatalogFeedListContainer
            handleModal={this.handleMobileModal}
            forwardRef={this.wrapper}
            metaSlug={metaSlug}
            catalogType={catalogType}
            history={this.props.history}
            match={this.props.match}
          />
        </ProductFeedWrapper>

        <CompareAndFavoriteBarContainer type={`${typeJewellery}`} />

        {/*{!isMobile && <EngagementSpotlightSlider />}*/}

        <EngagementShoppingEasy />
        <OnlineHelpBlock />
        <SubscribeContainer Component={SubscribeBlock} />
        {!match.params.pageNumber && <SeoTextBlock page={page} />}
        <GReviewWidgetMobile />
        {!match.params.pageNumber && data && data.collapses && data.collapses.length > 0 &&
          <QuestionsPage data={data.collapses} />
        }
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const catalogType = props.match.params.catalog === 'cluster-rings' ? 'rings' : props.match.params.catalog;
  let metaSlug = `jewellery-${catalogType}`;

  if (props.match.params.filter) {
    metaSlug = `jewellery-${catalogType}-${props.match.params.filter}`;
  }

  return {
    ...props,
    metaSlug: metaSlug,
    meta: metaTagsSelector(state, metaSlug),
    isMobile: deviceSelector(state),
    filterCategories: filterCategories(state),
    data: seoTextBlockSelector(state, metaSlug),
    pagination: selectors.pagination(state),
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { fetchMetaTags, fetchCatalogFeed }
  )
)(CatalogFeedPage);
