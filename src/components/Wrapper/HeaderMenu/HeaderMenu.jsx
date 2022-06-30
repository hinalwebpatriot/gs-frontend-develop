import React from "react";
import { Link } from "react-router-dom";
import HeaderMenuNav from "./Items/HeaderMenuNav";
import routing from "../../../config/routing";
import NavFavoriteButton from "../../_common/Buttons/NavFavoriteButton";
import NavCartButton from "../../_common/Buttons/NavCartButton";
import SearchHeaderButton from "../../Search/Quick/SearchHeaderButton";
import CityDropdownContainer from "../../_common/City/CityDropdownContainer";

export default class HeaderMenu extends React.Component {
  state = {
    isOpen: false
  };

  handleMobileMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleCloseMobileMenu = ({ target }) => {
    if (
      (target.tagName === "A" || target.tagName === "BUTTON") &&
      target.classList.contains("js-header-nav")
    ) {
      this.setState({
        isOpen: false
      });
    }
  };

  render() {
    const { isOpen } = this.state;
    const { path } = this.props;
    
    return (
      <header className="header ">
        <div className={`container ${path === '/referral' ? 'container1600' : ''}`}>
          <div
            className="header-container"
            onClick={this.handleCloseMobileMenu}
          >
            <Link to={routing().root} className="theme-logo">
              <img src="/static/media/logo.svg" alt="GS Diamonds - Fine jewellery store in Australia"/>
            </Link>
            <div className="mob-city-dropdown">
              <CityDropdownContainer />
            </div>
            {/* <a href="tel:1300181294" className="header-phone header-phone--mob">
              <span>
                <PhoneSvg />
              </span>
              1300 181 294
            </a> */}

            <HeaderMenuNav
              isOpen={isOpen}
              handleMobileMenu={this.handleMobileMenu}
            />

            <div className="header-link">
              <Link to={routing().blog} className="sale">
                Blog
              </Link>
              <Link to={routing().sale} className="sale">
                Sale
              </Link>
            </div>
            <SearchHeaderButton />
            <div className="header-extra">
              <NavFavoriteButton type="header" />
              <NavCartButton />
            </div>
            <button className="nav-btn" onClick={this.handleMobileMenu}>
              <span className="nav-line nav-line--first " />
              <span className="nav-line nav-line--second" />
              <span className="nav-line nav-line--third " />
            </button>
          </div>
        </div>
      </header>
    );
  }
}
