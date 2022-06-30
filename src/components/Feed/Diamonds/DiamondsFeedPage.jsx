import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import ConstructorSteps from "../../_common/RingConstructor/ConstructorSteps";
import CertificateTabsBlock from "./Items/CertificateTabs/CertificateTabsBlock";
import SeoTextBlock from "../../_common/SEO/SeoTextBlock";
import OnlineHelpBlock from "../../_common/OnlineHelpBlock/OnlineHelpBlock";
import DiamondsFeed from "./DiamondsFeed";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import routing from "../../../config/routing";
import ExpertChoiceBlock from "../../_common/ExpertChoiceBlock/ExpertChoiceBlock";
import { deviceSelector, deviceWidthSelector } from '../../_selectors/deviceSelector';
import { connect } from "react-redux";
import DiamondSpotlightSlider from "./Items/DiamondSpotlightSlider";
import CompareAndFavoriteBarContainer from "../../_common/CompareAndFavorites/CompareAndFavoriteBarContainer";
import DiamondFirstRingSlider from "./Items/DiamondFirstRingSlider";
import DiamondSecondRingSlider from "./Items/DiamondSecondRingSlider";
import RingConstructor from "../../_common/RingConstructor/RingConstructor";
import { fetchMetaTags } from "../../_common/SEO/SeoActions";
import createMetaSlug from "../../../utils/createMetaSlug";
import QuestionsPage from "../../Static/Questions/QuestionsPage";
import { seoTextBlockSelector } from "../../_selectors/metaTagsSelectors";
import { GReviewWidgetMobile } from "../../_common/GoogleReviewWidget";
import { dataLayerPush } from '../../../utils/dataLayer';

class DiamondsFeedPage extends React.Component {
  constructor(props) {
    super(props);

    this.header = React.createRef();
    this.wrapper = React.createRef();
    this.list = React.createRef();

    // this._headerOffset = 107;

    // this.metaSlug = createMetaSlug('diamonds', props.match.params.shape);

    this.state = {
      showMobileFilters: false,
    };
  }

  get headerOffset() {
    const { currentWidth } = this.props;
    if (currentWidth >= 1200) {
      return 107
    }

    if (currentWidth < 1200) {
      return 117
    }

    return 107;
  }

  componentDidMount() {
    // this.props.fetchMetaTags(this.metaSlug);
    window.addEventListener("scroll", this.scrollHandler);
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'category'
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollHandler();
    // this.metaSlug = createMetaSlug('diamonds', this.props.match.params.shape);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = () => {
    const { isMobile } = this.props;
    const header = this.header.current;
    const wrapper = this.wrapper.current;

    if (isMobile) {
      header.style.position = "";
      header.style.height = "";
      header.style.top = "";
      header.style.display = "";
      wrapper.style.paddingTop = "";
      return;
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    const headerHeight = header.getBoundingClientRect().height;

    const scroll = window.pageYOffset || document.documentElement.scrollTop; //scroll height
    const topOffset = wrapperRect.top + scroll - this.headerOffset; //top offset of header (distance from top to block)

    if (scroll >= topOffset) {
      const bottomOffset = wrapperRect.bottom - this.headerOffset * 2 ;

      header.style.top = `${bottomOffset <= 0 ? this.headerOffset + bottomOffset : this.headerOffset}px`;
      header.style.position = "fixed";
      header.style.zIndex = 4;
      header.style.width = `${wrapperRect.width}px`;
      wrapper.style.paddingTop = `${headerHeight}px`;
    } else {
      wrapper.style.paddingTop = 0;
      header.style.position = "static";
    }
  };

  handleMobileModal = () => {
    this.setState(prevState => ({
      showMobileFilters: !prevState.showMobileFilters
    }));
  };

  render() {
    const { showMobileFilters, isMobile } = this.state;
    const { shape } = this.props.match.params;
    const { metaSlug, location, data = {}} = this.props;
    let marks = [{ title: "Diamonds", path: routing().diamondsFeed }];

    if (shape) {
      marks = [...marks, { title: shape[0].toUpperCase() + shape.slice(1) }];
    }
    let isSpecial = location.pathname.includes("special-diamonds")
    return (
      <Fragment>
        {/*<MetaTags page={metaSlug} />   moved to list component*/}
        <Breadcrumbs marks={marks} />
        <ConstructorSteps marks={RingConstructor.generateSteps("diamond")} />
        <CertificateTabsBlock handleModal={this.handleMobileModal} />
        <DiamondsFeed
          metaSlug={metaSlug}
          handleModal={this.handleMobileModal}
          showMobileFilters={showMobileFilters}
          headerRef={this.header}
          wrapperRef={this.wrapper}
          isSpecial={isSpecial}
        />
        <CompareAndFavoriteBarContainer type="diamond" />

        <OnlineHelpBlock />

        {!isMobile && <DiamondSpotlightSlider />}
        <DiamondFirstRingSlider />
        <ExpertChoiceBlock />
        <DiamondSecondRingSlider />
        <SubscribeContainer Component={SubscribeBlock} />
        <SeoTextBlock page={metaSlug} />
        <GReviewWidgetMobile />
        {data && data.collapses && data.collapses.length > 0 &&
          <QuestionsPage data={data.collapses} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const metaSlug = createMetaSlug("diamonds", props.match.params.shape);
  return {
    ...props,
    metaSlug: metaSlug,
    isMobile: deviceSelector(state),
    currentWidth: deviceWidthSelector(state),
    data: seoTextBlockSelector(state, metaSlug),
  };
};

export default connect(
  mapStateToProps,
  { fetchMetaTags }
)(DiamondsFeedPage);
