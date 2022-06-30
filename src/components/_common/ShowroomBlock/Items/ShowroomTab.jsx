import React from "react";
import ReactCountryFlag from "react-country-flag";

export default class ShowroomTab extends React.Component {
  render() {
    const {
      tab,
      className = "showroom-tab",
      first = false
    } = this.props;
    
    const showroom = (
      <button
        className={`showroom-tab__item active`}
        key={`showroom_${tab && tab.code}`}
      >
        <ReactCountryFlag code={tab && tab.code || "us"} svg />
        <span>
          {tab && tab.title}
        </span>
      </button>
    );
    return <div className={`${className} ${first ? 'first' : ''}`}>{showroom}</div>;
  }
}
