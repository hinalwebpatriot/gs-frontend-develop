import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { flowRight as compose } from "lodash";
import Cookies from "js-cookie";
import { getCityUrl } from '../../../_common/City/CityDropdownContainer';
import { citySelector } from '../../../_selectors/citySelectors';

const cities = ['melbourne', 'perth', 'adelaide', 'canberra'];

const FooterCities = ({ location, currentCity }) => {
    const onClick = (e, city) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            Cookies.set('gs_city', city, { path: '/' });
            window.location.href = getCityUrl(city, location);
        }
    }
    return (
        <div className="footer-cities">
            {currentCity !== 'sydney' && (
                <a href={getCityUrl('sydney', location)} onClick={(e) => onClick(e, 'sydney')}>sydney</a>
            )}
            {cities.map((city) => (
                <a key={city} href={getCityUrl(city, location)} onClick={(e) => onClick(e, city)}>{city}</a>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentCity: citySelector(state)
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps)
)(FooterCities);
