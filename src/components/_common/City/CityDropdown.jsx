import React from "react";
import CityDropdownContent from "./CityDropdownContent";
import { getCityUrl } from './CityDropdownContainer';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import IconFA from '../IconFA';

export default class CityDropdown extends React.Component {
  render() {
    const {
      isOpen,
      city,
      options,
      selected,
      setSelected,
      handleClose,
      handleOpen,
      location
    } = this.props;
    return (
      <ul
        className="lang-drop"
        onClick={!isOpen ? handleOpen : null}
      >
        <li className="d-none">
          {/* hidden links for google bot */}
          {options.map(item => (
            <a href={getCityUrl(item.city.toLowerCase(), location)} key={item.city}>{item.city}</a>
          ))}
        </li>
        <li className={isOpen ? "active-drop" : ""}>
          <span className="rate_aud" style={{ textTransform: 'capitalize'}}>
            Select Your Location
            <span className="drop-arrow">
              <IconFA icon={faCaretDown}/>
            </span>
          </span>

          {isOpen && (
            <CityDropdownContent
              handleModal={handleClose}
              options={options}
              selected={selected}
              setSelected={setSelected}
              location={location}
            />
          )}
        </li>
      </ul>
    );
  }
}
