import React from "react";
import { Link, NavLink } from "react-router-dom";
import DiamondsMenuContent from "./DiamondsMenuContent";
import EngagementMenuContent from "./EngagementMenuContent";

import closeSvg from "../../../../img/svg/close.svg";
import pay1 from "../../../../img/icons/Payments/Default/ppcom@2x.svg";
import pay2 from "../../../../img/icons/Payments/Default/Skye@2x.svg";
import pay3 from "../../../../img/icons/Payments/Default/MC@2x.svg";
import pay4 from "../../../../img/icons/Payments/Default/Visa@2x.svg";
import pay5 from "../../../../img/icons/Payments/Default/Ae@2x.svg";
import pay6 from "../../../../img/icons/Payments/Default/Bt@2x.svg";

import HeaderDiamondsSvg from "../../../../img/jsSvg/HeaderDiamondSvg";
import HeaderEngagementRingSvg from "../../../../img/jsSvg/HeaderEngagementRingSvg";
import HeaderWeddingRingSvg from "../../../../img/jsSvg/HeaderWeddingRingSvg";
import HeaderJewellerySvg from "../../../../img/jsSvg/HeaderJewellerySvg";
import routing from "../../../../config/routing";
import { connect } from "react-redux";
import {
  deviceSelector,
  deviceWidthSelector
} from "../../../_selectors/deviceSelector";
import MyAccountButton from "../../MyAccountButton";
import CountryDropdownContainer from "../../../_common/CountryDropdown/CountryDropdownContainer";
import WeddingMenuContent from "./WeddingMenuContent";
import { flowRight as compose } from "lodash";
import selectors from '../../../_selectors/mainMenuSelectors';
import MenuArrowSvg from "../../../../img/jsSvg/MenuArrowSvg";

import { fetchMainMenu } from '../HeaderMenuActions';
import JewelleryMenuContent from "./JewelleryMenuContent";

class HeaderMenuNav extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
    this.timerId = null;
    this.delay = 250;

    this.state = {
      // menu: "engagement"
      loaded: [],
      menu: null
    };
  }

  componentDidMount() {
    this.wrapper.current.addEventListener("click", this.closeModalHandler);

    if (this.props.status !== 'success') {
      this.props.fetchMainMenu();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("menu-drop-open");
    this.wrapper.current.removeEventListener("click", this.closeModalHandler);
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  handleMobileTouch = ({ currentTarget }) => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    const menu = currentTarget.dataset.menu;
    const { loaded } = this.state;

    this.setState(
      {
        loaded: loaded.includes(menu) ? loaded : [...loaded, menu],
        menu: this.state.menu !== menu ? menu : null
      }
      // }, () => this.props.handleMobileMenu()
    );
  };

  handleClose = ({ target }) => {
    if (
      target.tagName === "A" ||
      target.tagName === "svg" ||
      target.tagName === "IMG"
    ) {
      this.setState(
        {
          menu: null
        },
        () => document.body.classList.remove("menu-drop-open")
      );
    }
  };

  handleMouseEnter = ({ currentTarget }) => {
    if (this.props.currentWidth > 991) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        const { loaded } = this.state;
        const menu = currentTarget.dataset.menu;
        this.setState(
          {
            loaded: loaded.includes(menu) ? loaded : [...loaded, menu],
            menu: menu
          },
          () => document.body.classList.add("menu-drop-open")
        );
      }, this.delay);
    }
  };

  handleMouseLeave = () => {
    if (this.props.currentWidth > 991) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        this.setState(
          {
            menu: null
          },
          () => document.body.classList.remove("menu-drop-open")
        );
      }, 100);
    }
  };

  closeModalHandler = ({ target }) => {
    if (!target.closest(".nav-box__inner")) {
      this.props.handleMobileMenu();
    }
  };

  render() {
    const { menu, loaded } = this.state;
    const {
      isOpen,
      handleMobileMenu,
      currentWidth,
      diamonds,
      engagement,
      wedding,
      isMobile
    } = this.props;
    return (
      <div
        className={`nav-box ${isOpen ? "active" : ""}`}
        ref={this.wrapper}
        onClick={this.handleClose}
      >
        <div className="nav-box__inner">
          <button className="close-nav" onClick={handleMobileMenu}>
            <img src={closeSvg} alt="" />
          </button>
          <div className="nav-box__panel">
            <MyAccountButton className="profile-link" />
            {/*<a href="#" className="profile-link">*/}
            {/*My account*/}
            {/*</a>*/}

            {currentWidth !== null && currentWidth < 991 && (
              <CountryDropdownContainer />
            )}
          </div>
          <ul className="theme-nav" onMouseLeave={this.handleMouseLeave}>
            <li
              className={menu === "diamonds" ? "active-drop" : ""}
              onMouseEnter={this.handleMouseEnter}
              onClick={isMobile ? this.handleMobileTouch : undefined}
              data-menu="diamonds"
            >
              <NavLink to={routing().diamondsFeed} disabled={isMobile}>
                <span className="nav-ico">
                  <HeaderDiamondsSvg />
                </span>
                Diamonds
                <span className="mob-nav-arrow">
                  <MenuArrowSvg />
                </span>
              </NavLink>
              {/*Dropdown 1*/}
              <DiamondsMenuContent data={diamonds} active={menu === "diamonds"} loaded={loaded.includes('diamonds')}/>
            </li>
            <li
              className={menu === "engagement" ? "active-drop" : ""}
              // className="active-drop"
              onMouseEnter={this.handleMouseEnter}
              onClick={isMobile ? this.handleMobileTouch : undefined}
              data-menu="engagement"
            >
              <NavLink to={routing().engagementFeed} disabled={isMobile}>
                <span className="nav-ico">
                  <HeaderEngagementRingSvg />
                </span>
                Engagement Rings
                <span className="mob-nav-arrow">
                  <MenuArrowSvg />
                </span>
              </NavLink>
              {/*Dropdown 2*/}
              <EngagementMenuContent data={engagement} active={menu === "engagement"} loaded={loaded.includes('engagement')}/>
            </li>

            <li
              className={menu === "wedding" ? "active-drop" : ""}
              // className="active-drop"
              onMouseEnter={this.handleMouseEnter}
              onClick={isMobile ? this.handleMobileTouch : undefined}
              data-menu="wedding"
            >
              <NavLink to={routing().weddingFeed} disabled={isMobile}>
                <span className="nav-ico">
                  <HeaderWeddingRingSvg />
                </span>
                Wedding Rings
                <span className="mob-nav-arrow">
                  <MenuArrowSvg />
                </span>
              </NavLink>
              {/*Dropdown 3*/}
              <WeddingMenuContent data={wedding} dataEngagement={engagement} active={menu === "wedding"} loaded={loaded.includes('wedding')}/>
            </li>
            <li
              className={menu === "jewellery" ? "active-drop" : ""}
              onMouseEnter={this.handleMouseEnter}
              onClick={isMobile ? this.handleMobileTouch : undefined}
              data-menu="jewellery"
            >
              <NavLink to={routing().jewelleryFeed} className="js-header-nav" disabled={isMobile}>
                <span className="nav-ico">
                  <HeaderJewellerySvg />
                </span>
                Jewellery
                <span className="mob-nav-arrow">
                  <MenuArrowSvg />
                </span>
              </NavLink>
              {/*Dropdown 4*/}
              <JewelleryMenuContent isMobile={isMobile}/>
            </li>
          </ul>
          <div className="sub-nav ">
            <ul className="sub-nav__list">
              <li>
                <Link to={routing().guide} className="js-header-nav">
                  Guide
                </Link>
              </li>
              <li>
                <Link to={routing().giftIdeas} className="js-header-nav">
                  Gift ideas
                </Link>
              </li>
              <li>
                <Link to={routing().blog} className="js-header-nav">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={routing().sale} className="js-header-nav">
                  Sale
                </Link>
              </li>
              <li>
                <Link to={routing().reviews} className="js-header-nav">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  to={routing().privacyPolicy}
                  className="reg-link js-header-nav"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
            <ul className="sub-nav__list">
              <li>
                <Link to={routing().customerCare} className="js-header-nav">
                  Customer care
                </Link>
              </li>
              <li>
                <Link to={routing().about} className="js-header-nav">
                  About
                </Link>
              </li>
              <li>
                <Link to={routing().contactUs} className="js-header-nav">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to={routing().ourGuarantees} className="js-header-nav">
                  Our guarantees
                </Link>
              </li>
              <li>
                <Link to={routing().faq} className="js-header-nav">
                  Questions and Answers
                </Link>
              </li>
              <li>
                <Link to={routing().terms} className="reg-link js-header-nav">
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>
          { isMobile && isOpen && (
            <div className="nav-payment">
              <div className="nav-payment__row">
                <div className="pay-logo">
                  <img src={pay1} alt="Header menu pay 1" />
                </div>
                <div className="pay-logo">
                  <img src={pay2} alt="Header menu pay 2" />
                </div>
              </div>
              <div className="nav-payment__row">
                <div className="pay-logo">
                  <img src={pay3} alt="Header menu pay 3" />
                </div>
                <div className="pay-logo">
                  <img src={pay4} alt="Header menu pay 4" />
                </div>
                <div className="pay-logo">
                  <img src={pay5} alt="Header menu pay 5" />
                </div>
                <div className="pay-logo">
                  <img src={pay6} alt="Header menu pay 6" />
                </div>
              </div>
            </div>
          )}
          {/*<div className="nav-extra">*/}
          {/*<a href="#">English</a>*/}
          {/*<a href="#">漢語</a>*/}
          {/*<a href="#">简化字</a>*/}
          {/*<a href="#">Cookies</a>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  status: selectors.status(state),
  diamonds: selectors.menu(state, 'diamonds'),
  engagement: selectors.menu(state, 'engagement-rings'),
  wedding: selectors.menu(state, 'wedding-rings'),
  currentWidth: deviceWidthSelector(state),
  isMobile: deviceSelector(state),

});

export default compose(
  connect(mapStateToProps, { fetchMainMenu })
)(HeaderMenuNav);
