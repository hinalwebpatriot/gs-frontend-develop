import React from "react";
import ReactCountryFlag from "react-country-flag";

export default class ShowroomTabs extends React.Component {
  render() {
    const {
      tabs,
      selected,
      buttonTitle,
      handleChangeTab,
      className = "showroom-tab"
    } = this.props;

    const showrooms = tabs.map((item, index) => (
      <button
        className={`showroom-tab__item ${
          item.code === selected ? "active" : ""
        }`}
        key={`showroom_${item.code}`}
        onClick={() => handleChangeTab(item.code)}
      >
        {/*<img src="./dist/img/flag1.png" alt="" />*/}
        <ReactCountryFlag code={item.code || "us"} svg />
        <span>
          {
            buttonTitle && buttonTitle !== '-' ? buttonTitle :
              <> 
                {item.count > 1
                  ? `${item.title}, ${item.count} showrooms`
                  : item.title}
                </>
          }
        </span>
      </button>
    ));
        return <div className={className}>{showrooms}</div>;
  }
}
