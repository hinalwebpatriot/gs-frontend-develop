import React from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { flowRight as compose } from "lodash";
import CityDropdown from "./CityDropdown";
import { citySelector } from "../../_selectors/citySelectors";

const options = [
    {
        city: 'Sydney',
    },
    {
        city: 'Brisbane'
    }
]

const cities = ['melbourne', 'perth', 'adelaide', 'canberra'];

export const getCityUrl = (city, location) => {
  const isMainPage = [...cities, 'brisbane', ''].some((c) => location.pathname === `/${c}` || location.pathname === `/${c}/`);
  const isGeoPage = [
      'engagement-rings',
      'wedding-rings',
      'diamonds',
      'jewellery',
  ].some(p => location.pathname.includes(p));

  const hasCityInUrl = [...cities, 'brisbane'].some((c) => location.pathname.includes(c));

  if (city === 'sydney') {
    return location.pathname.split('/').filter(x => ![...cities, 'brisbane'].includes(x)).join('/');
  }

  if (isGeoPage || isMainPage) {
      if (hasCityInUrl) {
          const cityFromUrl = [...cities, 'brisbane'].find((c) => location.pathname.includes(c));
          const url = location.pathname.replace(cityFromUrl, city);
          return url;
      }
      return `/${city}` + location.pathname;
  }

  return location.pathname;
}

class CityDropdownContainer extends React.Component {
  state = {
    isOpen: false,
    selected: options[0],
    cityIsSet: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.props;
    if (!this.state.cityIsSet && prevState.selected.city.toLowerCase() !== city) {
      const activeCity = options.find(x => x.city.toLowerCase() === city);

      this.setState({
          selected: activeCity || { city: ''},
          cityIsSet: true
      })
    }

    if (prevState.isOpen !== this.state.isOpen) {
      if (this.state.isOpen) {
        document.body.classList.add("country-tab-open");
      } else {
        document.body.classList.remove("country-tab-open");
      }
    }
  }

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  setSelected = (obj) => {
    this.setState({
        selected: obj
    }, this.handleSubmit)
  }

  handleSubmit = () => {
    const { selected } = this.state;
    this.handleClose();

    Cookies.set('gs_city', selected.city.toLowerCase(), { path: '/' });

    window.location.href = getCityUrl(selected.city.toLowerCase(), this.props.location);
  };

  render() {
    const { city, location } = this.props;
    const { isOpen, selected } = this.state;
    return (
      <CityDropdown
        location={location}
        isOpen={isOpen}
        city={city}
        options={options}
        selected={selected}
        setSelected={this.setSelected}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: citySelector(state),
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(CityDropdownContainer);
