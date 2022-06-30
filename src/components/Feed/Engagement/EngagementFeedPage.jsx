import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import ConstructorSteps from "../../_common/RingConstructor/ConstructorSteps";
import routing from "../../../config/routing";
import RingFeedWrapper from "../Shared/RingFeedWrapper";
import FilterPanelContainer from "./Filters/FilterPanelContainer";
import EngagementFeedListContainer from "./List/EngagementFeedListContainer";
import EngagementSpotlightSlider from "./Items/EngagementSpotlightSlider";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import ShapesBlockContainer from "../../_common/ShapesBlock/ShapesBlockContainer";
import OnlineHelpBlock from "../../_common/OnlineHelpBlock/OnlineHelpBlock";
import EngagementShoppingEasy from "./Items/EngagementShoppingEasy";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import CompareAndFavoriteBarContainer from "../../_common/CompareAndFavorites/CompareAndFavoriteBarContainer";
import RingConstructor from "../../_common/RingConstructor/RingConstructor";
import MetaTags from "../../_common/SEO/MetaTags";
import { fetchMetaTags } from "../../_common/SEO/SeoActions";
import SeoTextBlock from "../../_common/SEO/SeoTextBlock";
import createMetaSlug from "../../../utils/createMetaSlug";
import { metaTagsSelector, seoTextBlockSelector } from "../../_selectors/metaTagsSelectors";
import selector from '../../_selectors/engagementFeedSelectors'
import toPascalCase from '../../../utils/toPascalCase';
import QuestionsPage from "../../Static/Questions/QuestionsPage";
import { GReviewWidgetMobile } from "../../_common/GoogleReviewWidget";
import { dataLayerPush } from '../../../utils/dataLayer';

class EngagementFeedPage extends React.Component {
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
    // this.props.fetchMetaTags(this.metaSlug);
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
    const { showMobileFilters } = this.state;
    const { isMobile, match, metaSlug, data = [], pagination } = this.props;

    let marks = [
      { title: "Engagement rings", path: routing().engagementFeed },
    ];

    if (match.path === routing().engagementFeedPagination) {
      marks.push({
        title: `Engagement rings - Page ${match.params.pageNumber}`,
        path: routing(match.params.pageNumber).engagementFeedPagination,
      })
    }

    if (match.path === routing().engagementFeedWithFilter) {
      marks.push({
        title: toPascalCase(match.params.filter),
        path: routing(match.params.filter).engagementFeedWithFilter
      })
    }

    if (match.path === routing().engagementFeedWithFilterPagination) {
      marks.push({
        title: toPascalCase(match.params.filter),
        path: routing(match.params.filter).engagementFeedWithFilter
      })
      marks.push({
        title: `${toPascalCase(match.params.filter)} - Page ${match.params.pageNumber}`,
        path: routing({ filter: match.params.filter, pageNumber: match.params.pageNumber }).engagementFeedWithFilterPagination
      })
    }

    return (
      <Fragment>
        <MetaTags page={metaSlug} pagination={pagination}/>
        <Breadcrumbs marks={marks} />
        <ConstructorSteps marks={RingConstructor.generateSteps("engagement")} />
        <RingFeedWrapper>
          <FilterPanelContainer
            handleModal={this.handleMobileModal}
            showMobileFilters={showMobileFilters}
            forwardRef={this.sidebar}
          />
          <EngagementFeedListContainer
            handleModal={this.handleMobileModal}
            forwardRef={this.wrapper}
            metaSlug={metaSlug}
            history={this.props.history}
            match={this.props.match}
            shortDescription={data.short_description}
          />
        </RingFeedWrapper>

        <CompareAndFavoriteBarContainer type="engagement" />

        {!isMobile && <EngagementSpotlightSlider />}

        <ShapesBlockContainer
          title="Choose an Engagement Ring with GIA certified Diamond"
          page="feed"
          type="engagement"
        />
        <EngagementShoppingEasy />
        <OnlineHelpBlock />
        <SubscribeContainer Component={SubscribeBlock} />
        {!this.props.match.params.pageNumber && <SeoTextBlock page={metaSlug} />}
        <GReviewWidgetMobile />
        {!this.props.match.params.pageNumber && data && data.collapses && data.collapses.length > 0 &&
          <QuestionsPage data={data.collapses} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const metaSlug = createMetaSlug(
    "engagement-rings",
    props.match.params.filter
  );

  return {
    ...props,
    metaSlug: metaSlug,
    meta: metaTagsSelector(state, metaSlug),
    isMobile: deviceSelector(state),
    data: seoTextBlockSelector(state, metaSlug) || {},
    pagination: selector.pagination(state),
  };
};

export default connect(
  mapStateToProps,
  { fetchMetaTags }
)(EngagementFeedPage);
