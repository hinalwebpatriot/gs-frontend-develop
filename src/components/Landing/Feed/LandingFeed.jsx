import React, { Component, Fragment, createRef } from 'react';
import ConstructorProductButton from "../../_common/RingConstructor/ConstructorProductButton";
import GoogleEE from "../../_common/GoogleEE/GoogleEE";
import RingLandItem from "./Items/RingLandItem";
import DiamondLandItem from "./Items/DiamondLandItem";
import localeStore from "../../../config/LocalesStore";

import step1 from "../../../img/landing/step1.png";
import step2 from "../../../img/landing/step2.png";
import step3 from "../../../img/landing/step3.png";
import express from "../../../img/landing/options/express.svg"
import skye from "../../../img/landing/options/skye.svg"
import paypal from "../../../img/landing/options/paypal.svg"
import transfer from "../../../img/landing/options/transfer.svg"
import visa from "../../../img/landing/options/visa.svg"
import mastercard from "../../../img/landing/options/mastercard.svg"

class LandingFeed extends Component {
  step2Ref = createRef();
  step3Ref = createRef();

  state = {
    isError: false,
    diamondId: null,
    choosen_setting: null,
    choosen_setting_size: null,
    activeRing: 0,
    activeDiamond: 0,
    diamondCarat: 0,
    ringPrice: 0,
    diamondPrice: 0,
    ringIsActive: false,
    diamondIsActive: false,
    ringName: null
  };

  handleDiamond = (diamondId, diamondCarat, diamondPrice) => {
    this.setState((state) => ({
      ...state,
      diamondId,
      activeDiamond: diamondId,
      diamondCarat,
      diamondPrice,
      ringIsActive: true
    }));
    this.scrollTo(this.step3Ref);
  };

  handleRing = (choosen_setting, choosen_setting_size, ringPrice, ringName) => {
    this.setState((state) => ({
      ...state,
      choosen_setting,
      choosen_setting_size,
      activeRing: choosen_setting,
      ringPrice,
      diamondIsActive: true,
      ringName
    }));
    this.scrollTo(this.step2Ref);
  };

  scrollTo = (ref) => {
    console.log('current: ', ref.current);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  render() {
    const {
      activeRing,
      activeDiamond,
      ringPrice,
      diamondPrice,
      diamondId,
      choosen_setting,
      choosen_setting_size,
      diamondCarat,
      ringIsActive,
      diamondIsActive,
      ringName
    } = this.state;

    const { rings, diamonds, image } = this.props;

    const mySlug = {
      id: choosen_setting,
      slug: choosen_setting_size
    };

    const sum = parseInt(ringPrice) + parseInt(diamondPrice);

    const ringItems = rings.map((group_sku, index) => {
        return (
          <RingLandItem
            handleRing={this.handleRing}
            type="engagement"
            data={group_sku}
            key={`r_${group_sku.id}`}
            list={GoogleEE.LIST_FEED}
            position={index + 1}
            activeRing={activeRing}
          />
        )
      });

    const diamond04CaratItems = diamonds
      .filter((item) => Number(item.options.carat) < 0.6)
      .sort((a, b) => b.options.carat - a.options.carat)
      .map((item) => {
        return (
          <DiamondLandItem
            handleDiamond={this.handleDiamond}
            id={item.id}
            data={item}
            key={`d_${item.id}`}
            list={GoogleEE.LIST_FEED}
            activeDiamond={activeDiamond}
            diamondCarat={0.4}
          />
        )
    });

    const diamond06CaratItems = diamonds
      .filter((item) => Number(item.options.carat) >= 0.6 && Number(item.options.carat) < 1)
      .sort((a, b) => b.options.carat - a.options.carat)
      .map((item) => {
        return (
          <DiamondLandItem
            handleDiamond={this.handleDiamond}
            id={item.id}
            data={item}
            key={`d_${item.id}`}
            list={GoogleEE.LIST_FEED}
            activeDiamond={activeDiamond}
            diamondCarat={0.6}
          />
        )
    });

    const diamond1CaratItems = diamonds
      .filter((item) => Number(item.options.carat) >= 1)
      .sort((a, b) => b.options.carat - a.options.carat)
      .map((item) => {
        return (
          <DiamondLandItem
            handleDiamond={this.handleDiamond}
            id={item.id}
            data={item}
            key={`d_${item.id}`}
            list={GoogleEE.LIST_FEED}
            activeDiamond={activeDiamond}
            diamondCarat={1}
          />
        )
    });

    return (
      <Fragment>
        <div className="bg bg_white">
          <div className="container">
            <img src={image} alt="banner"/>
            <div className="step_container step1" id="step1">
              <div className="rectangle">
                <div className="left">
                  <img src={step1} alt="step 1"/>
                  <span className="step_number">01</span>
                </div>
                <div className="right">
                  <span className="step_text">STEP</span>
                </div>
              </div>
              <div className="description">
                <div className="top_info">
                  <img src={step1} alt="step 1"/>
                  <span>DESIGN THE PERFECT ENGAGEMENT RING. SELECT FROM THE MOST POPULAR OF STUNNING RING STYLES</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg bg_grey">
          <div className="container">
            <p className="title">Selected Engagement Rings</p>
            <div className="row rings">
              {ringItems}
            </div>
          </div>
        </div>

        <div className="bg bg_white" ref={this.step2Ref}>
          <div className="container">
            <div className="step_container step2" id="step2">
              <div className="rectangle">
                <div className="left">
                  <img src={step2} alt="step 2"/>
                  <span className="step_number">02</span>
                </div>
                <div className="right">
                  <span className="step_text">STEP</span>
                </div>
              </div>
              <div className="description">
                <div className="top_info">
                  <img src={step2} alt="step 2"/>
                  <span>Select one of perfectly selected loose diamonds and match it with a beautiful
                  ring setting of your choice</span>
                </div>
              </div>
            </div>
            {diamond04CaratItems.length > 0 && diamond04CaratItems ?
              (<Fragment>
                <p className="title">Select Loose Diamonds</p>
                <p className="title--carat">0.30 Ct. +</p>
                <div className="row">
                  {diamond04CaratItems}
                </div>
              </Fragment>) : null
            }
          </div>
        </div>

        {diamond06CaratItems.length > 0 && diamond06CaratItems ?
            (<div className="bg bg_grey">
              <div className="container">
                <p className="title--carat">0.60 Ct. +</p>
                <div className="row">
                  {diamond06CaratItems}
                </div>
              </div>
            </div>) : null
        }

        <div className="bg bg_white pt">
          {diamond1CaratItems.length > 0 && diamond1CaratItems ?
            (<div className="container">
              <p className="title--carat">1.00 Ct. +</p>
              <div className="row">
                {diamond1CaratItems}
              </div>
            </div>) : null
          }


          <div
            id="step3"
            className="container step_3_container step_container"
            ref={this.step3Ref} >
            <div className="rectangle">
              <div className="left">
                <img src={step3} alt="step 3"/>
                <span className="step_number">03</span>
              </div>
              <div className="right">
                <span className="step_text">STEP</span>
              </div>
            </div>
            <div className="right">
              <p className="status">COMPLETE</p>
              <div className="buy_info">
                <span className="price">{localeStore.formatPrice(sum) || 'A$0'}</span>
                <div className="info_items">
                  <span className="grey">{ringName || 'TRIBUTE'}</span>
                  <span className="grey">DIAMOND {diamondCarat}</span>
                </div>
              </div>
              {ringIsActive && diamondIsActive ?
                (<ConstructorProductButton
                  type="landing"
                  id={choosen_setting}
                  ringId={choosen_setting}
                  diamondId={diamondId}
                  settingId={choosen_setting_size}
                  selectedSize={mySlug}
                />) : null
              }
              <p className="payment_options">Payment options</p>
              <div className="payments_block">
                <img src={paypal} alt="paypal"/>
                <img src={skye} alt="skye"/>
                <img src={mastercard} alt="mastercard"/>
                <img src={visa} alt="visa"/>
                <img src={express} alt="express"/>
                <img src={transfer} alt="transfer"/>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default LandingFeed;
