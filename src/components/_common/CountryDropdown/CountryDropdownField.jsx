import React from "react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../IconFA';

export default class CountryDropdownField extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
  }

  showDropdown = e => {
    e.preventDefault();
    this.dropdown.current.classList.add("active");
    document.addEventListener("click", this.closeDropdown);
  };

  closeDropdown = () => {
    try {
      this.dropdown.current.classList.remove("active");
    } catch (e) {}
    document.removeEventListener("click", this.closeDropdown);
  };

  handleSave = data => {
    this.props.save({
      type: this.props.type,
      data: data
    });
  };

  render() {
    const { options, selected = {}, title } = this.props;

    const items = options.map(item => (
      <li key={item.name}>
        <button
          className="drop-list__btn"
          onClick={() => this.handleSave(item)}
        >
          {item.name}
        </button>
      </li>
    ));

    return (
      <div className="field">
        <span className="field-label field-label--drop">{title}:</span>
        <div className="drop-wrap">
          <div className={`cust-drop`} ref={this.dropdown}>
            <button className="cust-drop__btn" onClick={this.showDropdown}>
              {selected.name}
              <span>
                <IconFA icon={faCaretRight}/>
              </span>
            </button>
            <div className="cust-drop__inner">
              <ul className="drop-list">{items}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
