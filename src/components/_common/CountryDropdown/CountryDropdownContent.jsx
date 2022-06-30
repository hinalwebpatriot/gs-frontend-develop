import React, { Fragment } from "react";
import CountryDropdownField from "./CountryDropdownField";
import { Preloader } from "../Preloader";

export default class CountryDropdownContent extends React.Component {
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
      status,
      options,
      setSettings,
      selected = {},
      handleSubmit
    } = this.props;
    return (
      <div className="nav-drop">
        <div className="nav-drop__content">
          <div className="drop-content">
            <p className="info-p info-p--type2">
              Please select your shipping destination & currency
            </p>

            {status === "request" && <Preloader />}
            {status === "success" && (
              <Fragment>
                <CountryDropdownField
                  title="Shipping To"
                  type="location"
                  options={options.location}
                  save={setSettings}
                  selected={selected.location}
                />
                {/*<CountryDropdownField*/}
                {/*title="Language"*/}
                {/*type="lang"*/}
                {/*options={options.lang}*/}
                {/*save={setSettings}*/}
                {/*selected={selected.lang}*/}
                {/*/>*/}
                <CountryDropdownField
                  title="Currency"
                  type="currency"
                  options={options.currency}
                  save={setSettings}
                  selected={selected.currency}
                />
                <div className="lang-submit">
                  <button
                    className="theme-btn theme-btn--type2 theme-btn--full-width"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
