import React from "react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../_common/IconFA';

export default class RingSizeDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
    this.sizeN = 17.125;
  }

  showDropdown = e => {
    e.preventDefault();
    this.dropdown.current.classList.add("active");
    document.addEventListener("click", this.closeDropdown);
  };

  closeDropdown = () => {
    this.dropdown.current.classList.remove("active");
    document.removeEventListener("click", this.closeDropdown);
  };

  render() {
    const { data, currentSize, selectedSize, handleChange } = this.props;
    const isWeddingInfinityMen = data.selected.options.gender === 'male' && data.selected.options.ring_collection.slug === 'infinity' && data.selected.product_type === 'wedding-rings';

    const options = data.size_list.map(item => (
      <li key={`${item.slug}_drop_metal`}>
        <button className="drop-list__btn drop-list__btn--ring-size" onClick={() => handleChange(item)}>
          <span class="ring-size">{item.title[currentSize]}</span>
          {!isWeddingInfinityMen && item.slug > this.sizeN && (
            <span class="extra">Charges applicable</span>
          )}
        </button>
      </li>
    ));

    return (
      <div className="product-choice__item">
        <div className="prod-select">
          <div className="cust-drop" ref={this.dropdown}>
            <button className="cust-drop__btn" onClick={this.showDropdown}>
              {selectedSize.title[currentSize]}
              <span>
                <IconFA icon={faCaretRight}/>
              </span>
            </button>
            <div className="cust-drop__inner">
              <ul className="drop-list">{options}</ul>
            </div>
          </div>
        </div>
        {/* <div className="select-guide d-flex">
          <button className="filter-play">
            <span>
              <VideoHintSvg />
            </span>
          </button>
          <span>Size guide</span>
        </div> */}
      </div>
    );
  }
}
