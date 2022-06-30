import React from "react";
import ShowroomHolder from "./Items/ShowroomHolder";
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -100});

class ShowroomBlock extends React.Component {
  state = {
    selected: this.props.tabs[0].code || ""
  };
  
  handleChangeTab = tab => {
    if (tab && tab !== this.state.selected) {
      this.setState({
        selected: tab
      });
    }
  };

  render() {
    const { tabs, showrooms, showRoomRef, path, title, desktopMapImg, mobileMapImg } = this.props;
    const { selected } = this.state;
    return (
      <div ref={showRoomRef} className="contact-sections">
        <div className="container">
          <p className="section-title">
            {title}
          </p>
          <ShowroomHolder
            tabs={tabs}
            path={path}
            data={showrooms}
            selected={selected}
            desktopMapImg={desktopMapImg}
            mobileMapImg={mobileMapImg}
          />
        </div>
      </div>
    );
  }
}

export default ShowroomBlock;