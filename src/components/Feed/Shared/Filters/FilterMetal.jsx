import React from "react";
import FilterWrapper from "./FilterWrapper";
import allMetal from "../../../../img/svg/all_metal.svg";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";

export default class FilterMetal extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps, this.props);
  }

  toggleAllMetals = () => {
    const { toggle, input, data } = this.props;
    if (data.length === input.length) {
      toggle([]);
    } else {
      toggle(data.map(item => item.slug));
    }
  };

  render() {
    const { wrapper, title, data, gender, input, save, video, filterChange = () => {}, renderAsLinks = false, createFilterLink = () => '' } = this.props;
    
    const femaleMetals = ['Platinum', '18ct White Gold', '18ct Rose Gold', '18ct Yellow Gold'];
    let filteredData = data.filter((item) => femaleMetals.indexOf(item.title) !== -1);
    let buttons = (gender && gender === 'female' ? filteredData : data).map((item , index)=> {
      if (renderAsLinks && femaleMetals.includes(item.title)) {
        let link = '';
        if (item.slug === 'platinum') {
          link = createFilterLink('platinum');
        } else {
          const [, ...filter] = item.slug.split('-');
          link = createFilterLink(filter.join('-'))
        }
        return (
          <Link
            key={`metal_filter_${item.slug}${index}`}
            className={`filter-metal__item ${
              input.includes(item.slug) ? "active" : ""
            }`}
            to={link}
            onClick={() => {
              save(item.slug)
            }}
          >
            <span className={`metal-icon`}>
              <img src={item.image} alt={`Filter metal: ${item.title}`} />
            </span>
            <span className="metal-name">{item.title}</span>
          </Link>
        )
      }

      return (
        <button
          key={`metal_filter_${item.slug}${index}`}
          className={`filter-metal__item ${
            input.includes(item.slug) ? "active" : ""
          }`}
          onClick={() => { 
            save(item.slug)
            filterChange()
          }}
        >
          {/*<span className={`metal-icon metal-icon--type1`}>*/}
          {/*<span className="metal-extra">18</span>*/}
          {/*</span>*/}
          <span className={`metal-icon`}>
            <img src={item.image} alt={`Filter metal: ${item.title}`} />
          </span>
          <span className="metal-name">{item.title}</span>
        </button>
      )
    });

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isCancelable={false}
        video={video}
      >
        <div className="filter-metal">
          {buttons}
          <button className="filter-metal__item" onClick={this.toggleAllMetals}>
            <span className="metal-icon metal-icon--type5">
              <img src={allMetal} alt="Filter metal: all metals" />
            </span>
            <span className="metal-name">All metals</span>
          </button>
        </div>
      </FilterWrapper>
    );
  }
}
