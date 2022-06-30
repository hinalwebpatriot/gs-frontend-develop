import React from "react";
import {
  settingsOptionsSelector,
  settingsStatusSelector
} from "../../../_selectors/settingSelector";
import { connect } from "react-redux";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";

import IconFA from '../../../_common/IconFA';

class DeliveryCountryDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { status, save, options, value } = this.props;
    if (status === "success" && options.length && !value.length) {
      save("country", options[0].name);
    }
  }

  showDropdown = e => {
    e.preventDefault();
    this.dropdown.current.classList.add("active");
    document.addEventListener("click", this.closeDropdown);
  };

  closeDropdown = e => {
    try {
      const name = e.target.dataset.name;

      if (name) {
        const { save } = this.props;
        save("country", name);
      }
      this.dropdown.current.classList.remove("active");
    } catch (e) {}
    document.removeEventListener("click", this.closeDropdown);
  };

  render() {
    const {
      children,
      options = [],
      status,
      value,
      disabled
    } = this.props;

    const items = options.map(item => (
      <li key={item.name}>
        <button className="drop-list__btn" data-name={item.name}>
          {item.name}
        </button>
      </li>
    ));

    return (
      <div className="col-lg-6 col-indent">
        <span className="field-label field-label--type2">Country</span>
        <div className="field-wrap">
          <div className="cust-drop" ref={this.dropdown}>
            <button
              className="cust-drop__btn"
              style={{textAlign: 'left'}}
              onClick={this.showDropdown}
              disabled={status === "request" || disabled}
            >
              {status === "request" ? "Loading..." : value}
              <span>
                <IconFA icon={faCaretRight}/>
              </span>
            </button>
            <div className="cust-drop__inner">
              <ul className="drop-list">{items}</ul>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  status: settingsStatusSelector(state),
  options: settingsOptionsSelector(state).location,

  value: props.value,
  error: props.error
});

export default connect(mapStateToProps)(DeliveryCountryDropdown);
