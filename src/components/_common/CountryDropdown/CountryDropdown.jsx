import React from "react";
import CountryDropdownContent from "./CountryDropdownContent";
import ReactCountryFlag from "react-country-flag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import IconFA from '../IconFA';

export default class CountryDropdown extends React.Component {
  render() {
    const {
      status,
      options,
      isOpen,
      selected = {},
      unsaved = {},
      setSettings,
      handleSubmit
    } = this.props;
    return (
      <ul
        className="lang-drop"
        onClick={!isOpen ? this.props.handleOpen : null}
      >
        <li className={isOpen ? "active-drop" : ""}>
          <span className="rate_aud">
            <span className="flag-ico">
              <ReactCountryFlag
                code={selected.location ? selected.location.code : "au"}
                svg
              />
            </span>
            {selected.currency ? selected.currency.name : "AUD"}
            <span className="drop-arrow">
              <IconFA icon={faCaretDown}/>
            </span>
          </span>

          {isOpen && (
            <CountryDropdownContent
              selected={unsaved}
              status={status}
              options={options}
              handleModal={this.props.handleClose}
              setSettings={setSettings}
              handleSubmit={handleSubmit}
            />
          )}
        </li>
      </ul>
    );
  }
}
