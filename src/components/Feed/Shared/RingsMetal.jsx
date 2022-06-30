import React from "react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../_common/IconFA';

const metalClasses = {
  platinum: "metal--type1",
  "18ct-yellow-gold": "metal--type2",
  "18ct-white-gold": "metal metal--type3",
  "18ct-rose-gold": "metal metal--type4",

  "18ct-rose-white-gold": "metal metal--type5",
  "18ct-yellow-white-gold": "metal metal--type6",
};

export const RingsMetalDots = ({ metals, handleSelect, wrapClass = "" }) => {
  const dots = metals.map(metal => (
    <div
      className={`metal ${metalClasses[metal]}`}
      data-metal={metal}
      key={`metal_${metalClasses[metal]}`}
    />
  ));

  return (
    <div className={`ring-metals ${wrapClass}`} onClick={handleSelect}>
      {dots}
    </div>
  );
};

export class RingsMetalDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
  }

  showDropdown = e => {
    try {
      e.preventDefault();
      this.dropdown.current.classList.add("active");
      document.addEventListener("click", this.closeDropdown);
    } catch (err){ }
  };

  closeDropdown = e => {
    try {
      this.props.handleChange(e);
      this.dropdown.current.classList.remove("active");
    } catch (err){ }
    document.removeEventListener("click", this.closeDropdown);
  };

  render() {
    const { metals, currentMetal } = this.props;
    const metalsArr = Object.keys(metals);

    const buttons = metalsArr.map(metal => (
      <li key={`metal_${metalClasses[metal]}`}>
        <button className="drop-list__btn btn_metal_list" data-metal={metal}>
          <div className={`metal ${metalClasses[metal]}`} data-metal={metal} />{" "}
          {metals[metal].title}
        </button>
      </li>
    ));

    return (
      <div
        className="cust-drop "
        ref={this.dropdown}
        onClick={this.showDropdown}
      >
        <button className="cust-drop__btn">
          <span className={`metal ${metalClasses[currentMetal]}`} />
          {metals[currentMetal].title}
          <span>
            <IconFA icon={faCaretRight}/>
          </span>
        </button>
        <div className="cust-drop__inner">
          <ul className="drop-list">{buttons}</ul>
        </div>
      </div>
    );
  }
}
