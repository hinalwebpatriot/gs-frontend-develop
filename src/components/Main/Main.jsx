import React, { Fragment } from "react";
import SliderBlockContainer from "./SliderBlock/SliderBlockContainer";
import SubscribeBlock from "../_common/SubscribeBlock/SubscribeBlock";
import SubscribeContainer from "../_common/Subscribe/SubscribeContainer";
import MainStaticBanner from "./StaticBlocks/MainStaticBanner";
import ShapesBlockContainer from "../_common/ShapesBlock/ShapesBlockContainer";
import { deviceSelector } from "../_selectors/deviceSelector";
import { connect } from "react-redux";
import SuggestedRingsSlider from "./SuggestedRingsSlider/SuggestedRingsSlider";
import AlsoSuggestedRingsSlider from "./AlsoSuggestedRingsSlider/AlsoSuggestedRingsSlider";
import AllProductsCategories from "./ProductCategoriesBlock/AllProductCategories";
import MetaTags from "../_common/SEO/MetaTags";
import { GReviewWidgetMobile } from "../_common/GoogleReviewWidget";
import selectors from "../_selectors/mainSelectors";
import { dataLayerPush } from '../../utils/dataLayer';

class Main extends React.Component {
  // componentWillUnmount() {
  //   this.props.setMainPageWatchedStatus();
  // }
  //   state = {
  //       isShowDiscountModal: false,
  //   }
  //
  //   componentDidMount() {
  //       this.timer = setTimeout(() => {
  //           this.setState({isShowDiscountModal: true})
  //       }, 10000)
  //   }
  //
  //   componentWillUnmount() {
  //       clearTimeout(this.timer);
  //   }
  //
  //   handleModal = () => {
  //       this.setState({isShowDiscountModal: false});
  //   }
  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
   	  'dynx_totalvalue': '',
   	  'dynx_pagetype': 'home'
    })
  }
  render() {
    const { isPageViewed } = this.props;

    return (
      <Fragment>
          {/*{*/}
          {/*    this.state.isShowDiscountModal && <DiscountModal handleModal={this.handleModal}/>*/}
          {/*}*/}
        <MetaTags page="index" />

        <SliderBlockContainer />
        <MainStaticBanner
          head="We proudly present glorious stones of the highest quality, and jewellery pieces of incredible intricacy and exquisite artistry"
          text="Highest quality at wholesale prices!"
        />
        <ShapesBlockContainer
          title="Let your occasion be special"
          page="main"
        />

        <SuggestedRingsSlider />
        {isPageViewed && <AlsoSuggestedRingsSlider /> }
        <AllProductsCategories />

        {/*<OnlineHelpBlock/>*/}
        <SubscribeContainer Component={SubscribeBlock} isMain={true}/>
        <GReviewWidgetMobile />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state),
  isPageViewed: selectors.isPageViewed(state)
});

const mapDispatchToProps = {
  // setMainPageWatchedStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
