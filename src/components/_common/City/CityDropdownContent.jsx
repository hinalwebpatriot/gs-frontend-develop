import React from "react";

import { getCityUrl } from './CityDropdownContainer';
export default class CityDropdownContent extends React.Component {
  componentDidMount() {
    document.addEventListener("click", this.closeDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeDropdown);
  }

  closeDropdown = e => {
    try {
      if (!e.target.closest(".nav-drop")) {
        this.props.handleModal();
        document.removeEventListener("click", this.closeDropdown);
      }
    } catch (e) {}
  };

  render() {
    const {
      setSelected,
      options,
      selected,
      location
    } = this.props;
    return (
      <div className="nav-drop">
        <div className="nav-drop__content">
          <div className="drop-content">
            <p className="info-p info-p--type2">
              Please select your city
            </p>
            <div className="d-flex justify-content-between city-buttons">
                {options.map(item => (
                    <a href={getCityUrl(item.city.toLowerCase(), location)} key={item.city} className={selected.city === item.city ? 'active' : ''} onClick={(event) => {
                        event.preventDefault();
                        setSelected(item);
                    }}>{item.city}</a>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
