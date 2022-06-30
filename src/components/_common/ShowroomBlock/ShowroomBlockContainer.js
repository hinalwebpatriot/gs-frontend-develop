import React from "react";
import { connect } from "react-redux";
import { fetchShowroomData } from "./ShowroomBlockActions";
import ShowroomBlock from "./ShowroomBlock";
import { showroomBlockSelector } from "../../_selectors/showroomBlockSelectors";
import { citySelector } from '../../_selectors/citySelectors';
import { withRouter } from "react-router-dom";
import sydneyMapDesktopImg from '../../../img/desk_map-img.jpg';
import sydneyMapMobileImg from '../../../img/mobile_map-img.jpg';
import brisbaneMapDesktopImg from "../../../img/gs_brisbane.jpg";
import brisbaneMapMobileImg from "../../../img/gs_mob_brisbane.jpg";

class ShowroomBlockContainer extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchShowroomData();
    }
  }

  render() {
    const { status, showrooms = {}, tabs = [], showRoomRef, match, city } = this.props;
    
    if (status === "success" && tabs.length !== 0) {
      if (city === 'sydney') {
        const data = { AU: [showrooms.AU[0]]};
        return (
          <ShowroomBlock
            title="Visit GS Diamonds Sydney showroom Est 1986"
            path={match && match.path}
            showrooms={data}
            tabs={tabs}
            showRoomRef={showRoomRef}
            desktopMapImg={sydneyMapDesktopImg}
            mobileMapImg={sydneyMapMobileImg}
          />
        );
      }
      if (city === 'brisbane') {
        const data = { AU: [showrooms.AU[1]]};
        return (
          <ShowroomBlock
            title="Visit GS Diamonds Brisbane showroom Est 1986"
            path={match && match.path}
            showrooms={data}
            tabs={[tabs[1]]}
            showRoomRef={showRoomRef}
            desktopMapImg={brisbaneMapDesktopImg}
            mobileMapImg={brisbaneMapMobileImg}
          />
        );
      }
      return null;
    } else {
      return null;
    }
  }
}

export default withRouter(connect(
  state => {
    return {
      ...showroomBlockSelector(state),
      city: citySelector(state),
    }
  },
  {
    fetchShowroomData
  }
)(ShowroomBlockContainer));
