import React from "react";
import { withRouter } from "react-router-dom";
import routing from "../../../config/routing";
import VideoHintSvg from "../../../img/jsSvg/VideoHintSvg";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../_common/IconFA';

class RingMetalDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();

    this.state = {
      list: this.getList()
    };
  }

  showDropdown = e => {
    e.preventDefault();
    this.dropdown.current.classList.add("active");
    document.addEventListener("click", this.closeDropdown);
  };

  closeDropdown = e => {
    try {
      const slug = e.target.dataset.slug;

      if (slug) {
        this.handleChange(slug);
      }
      this.dropdown.current.classList.remove("active");
    } catch (e) {}
    document.removeEventListener("click", this.closeDropdown);
  };

  getList = () => {
    const { selected, similar } = this.props.data;
    let list = {
      [selected.options.metal.slug]: {
        title: selected.options.metal.title,
        ring_id: selected.id,
        ring_h1: selected.h1
      }
    };

    similar.forEach(ring => {
      list[ring.options.metal.slug] = {
        title: ring.options.metal.title,
        ring_id: ring.id,
        ring_h1: ring.h1
      };
    });

    return list;
  };

  handleChange = value => {
    const { list } = this.state;
    const { type, history } = this.props;
    const urlSize = this.props.location.search.split("=").pop();
    const linkParams = {
      id: list[value].ring_id,
      slug: list[value].ring_h1.toLowerCase(),
      size: urlSize
    };

    let link;

    switch (type) {
      case "engagement":
      {
        link = routing(linkParams).engagementProduct
        break;
      }
      case "wedding":
      {
        link = routing(linkParams).weddingProduct
        break;
      }
      // "catalog" === "jewellery"
      case "catalog":
      {
        link = routing(linkParams).catalogProduct
        break;
      }
      default: link = "/";
    }
    history.push(link);
  };

  render() {
    const { selected } = this.props.data;
    const { list } = this.state;

    const options = Object.keys(list).map(item => (
      <li key={`${item}_drop_metal`}>
        <button className="drop-list__btn" data-slug={item}>
          {list[item].title}
        </button>
      </li>
    ));

    return (
      <div className="product-choice__item">
        <div className="prod-select">
          <div className="cust-drop" ref={this.dropdown}>
            <button className="cust-drop__btn" onClick={this.showDropdown}>
              {selected.options.metal.title}
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
          <span>Metal guide</span>
        </div> */}
      </div>
    );
  }
}

export default withRouter(RingMetalDropdown);
