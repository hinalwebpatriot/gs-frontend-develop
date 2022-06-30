import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import FilterPanelContainer from "./Filters/FilterPanelContainer";
import WeddingFeedListContainer from "./List/WeddingFeedListContainer";
import { deviceSelector } from "../../_selectors/deviceSelector";
import selector from '../../_selectors/weddingFeedSelectors';
import { connect } from "react-redux";
import RingFeedWrapper from "../Shared/RingFeedWrapper";
import CompareAndFavoriteBarContainer from "../../_common/CompareAndFavorites/CompareAndFavoriteBarContainer";
import { fetchMetaTags } from "../../_common/SEO/SeoActions";
import MetaTags from "../../_common/SEO/MetaTags";
import { metaTagsSelector, seoTextBlockSelector } from "../../_selectors/metaTagsSelectors";
import toPascalCase from '../../../utils/toPascalCase';
import SeoTextBlock from "../../_common/SEO/SeoTextBlock";
import QuestionsPage from "../../Static/Questions/QuestionsPage";
import { GReviewWidgetMobile } from "../../_common/GoogleReviewWidget";
import { dataLayerPush } from '../../../utils/dataLayer';

class WeddingFeedPage extends React.Component {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollHandler();
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
    const { showMobileFilters, data = [] } = this.state;
    const {  metaSlug, pagination } = this.props;
    const { path, params } = this.props.match;

    // const page = `wedding-rings${filter ? filter : `${gender}-${style}`}`
    //
    let marks = [
      { title: "Wedding rings", path: routing().weddingFeed }
    ];

    switch (path) {
      case routing().weddingFeedPagination:
        marks = [
          ...marks,
          {
            title: `Wedding rings - Page ${params.pageNumber}`,
            path: routing(params.pageNumber).weddingFeedPagination
          }
        ];
        break;
      case routing().weddingFeedWithFilter:
        marks = [
          ...marks,
          {
            title: toPascalCase(params.filter),
            path: routing(params.filter).weddingFeedWithFilter
          }
        ];
        break;
      case routing().weddingFeedWithFilterPagination:
        marks = [
          ...marks,
          {
            title: toPascalCase(params.filter),
            path: routing(params.filter).weddingFeedWithFilter
          },
          {
            title: `${toPascalCase(params.filter)} - Page ${params.pageNumber}`,
            path: routing({ filter: params.filter, pageNumber: params.pageNumber }).engagementFeedWithFilterPagination
          }
        ];
        break;
      case routing().weddingFeedWithGenderFilter:
        marks = [
          ...marks,
          {
            title: toPascalCase(params.gender),
            path: routing(params.gender).weddingFeedWithFilter
          },
          {
            title: toPascalCase(params.style),
            path: routing({ gender: params.gender, style: params.style })
              .weddingFeedWithGenderFilter
          }
        ];
        break;
      case routing().weddingFeedWithGenderFilterPagination:
        marks = [
          ...marks,
          {
            title: toPascalCase(params.gender),
            path: routing(params.gender).weddingFeedWithFilter
          },
          {
            title: toPascalCase(params.style),
            path: routing({ gender: params.gender, style: params.style })
              .weddingFeedWithGenderFilter
          },
          {
            title: `${toPascalCase(params.style)} - Page ${params.pageNumber}`,
            path: routing({ gender: params.gender, style: params.style, pageNumber: params.pageNumber })
              .weddingFeedWithGenderFilterPagination
          }
        ];
        break;
        default:
        break;
    }

    return (
      <Fragment>
        <MetaTags page={metaSlug} pagination={pagination}/>
        <Breadcrumbs marks={marks} />
        {/*<ConstructorSteps />*/}
        <RingFeedWrapper>
          <FilterPanelContainer
            handleModal={this.handleMobileModal}
            showMobileFilters={showMobileFilters}
            forwardRef={this.sidebar}
          />
          <WeddingFeedListContainer
            handleModal={this.handleMobileModal}
            forwardRef={this.wrapper}
            metaSlug={metaSlug}
            history={this.props.history}
            match={this.props.match}
          />
        </RingFeedWrapper>

        <CompareAndFavoriteBarContainer type="wedding" />

        {/*{!isMobile && <WeddingSpotlightSlider />}*/}

        {/*<ShapesBlockContainer*/}
          {/*title="Choose an Engagement Ring with GIA certified Diamond"*/}
          {/*page="feed"*/}
        {/*/>*/}
        {/*<WeddingShoppingEasy />*/}
        {/*<OnlineHelpBlock />*/}
        {/*<SubscribeContainer Component={SubscribeBlock} />*/}
        {!params.pageNumber && <SeoTextBlock page={metaSlug} />}
        <GReviewWidgetMobile />
        {!params.pageNumber && data && data.collapses && data.collapses.length > 0 &&
          <QuestionsPage data={data.collapses} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { filter, gender, style } = props.match.params;
  const { path } = props.match;

  let metaSlug;

  switch (path) {
    case routing().weddingFeedWithFilter:
    case routing().weddingFeedWithFilterPagination:
      metaSlug = `wedding-rings-${filter}`;
      break;
    case routing().weddingFeedWithGenderFilter:
    case routing().weddingFeedWithGenderFilterPagination:
      metaSlug = `wedding-rings-${gender}-${style}`;
      break;
    default:
      metaSlug = "wedding-rings";
  }

  return {
    ...props,
    metaSlug: metaSlug,
    meta: metaTagsSelector(state, metaSlug),
    isMobile: deviceSelector(state),
    data: seoTextBlockSelector(state, metaSlug),
    pagination: selector.pagination(state),
  };
};

export default connect(
  mapStateToProps,
  { fetchMetaTags }
)(WeddingFeedPage);
