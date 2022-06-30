import React from "react";
import { connect } from "react-redux";
import localeStore from "../../../../config/LocalesStore";
import { countrySelected } from "../../../_selectors/settingSelector";

const CheckoutServicesList = ({data, country}) => {
    return(
        <div className="services-list">
            {
                data.map(({id, description ,title, gst, price}) => {
                    const total = country === 'Australia' ? Number(price) + Number(gst) : Number(price); 
                    return (<div className="services-list__item" key={`${id}_${title}`}>
                        <div className="services-title">
                            <p className="theme-subtitle theme-subtitle--smaller">{title}</p>
                        </div>
                        <div className="services-description">
                            <p>{description}</p>
                        </div>
                        <div className="services-total">
                            <p className="services-total__title">Total:</p>
                            <p className="table-price table-price--type3 ">
                                {localeStore.formatPrice(total)}
                                <span>{country === 'Australia' ? 'INC. GST' : 'EXCL. GST'}</span>
                            </p>
                        </div>
                    </div>
                )})
            }
        </div>
    )
}

const mapStateToProps = (state, props) => ({
    country: countrySelected(state)
});

export default connect(mapStateToProps)(CheckoutServicesList);