import React, { Fragment } from "react";
import ShowroomMapBox from "../Items/ShowroomMapBox";
import ShowroomMapBoxMobile from "../Items/ShowroomMapBoxMobile";
import ShowroomInfo from "../Items/ShowroomInfo";
import ShowroomTab from "./ShowroomTab";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";

const ShowroomHolder = ({ data, selected, path, tabs, isMobile, desktopMapImg, mobileMapImg }) => {
  const showrooms = data[selected].map((item, index) => {
    return <Fragment key={selected + index}>
      <ShowroomTab tab={tabs && tabs[index]} first={index === 0}/>
      <ShowroomMapBox data={item} desktopMapImg={desktopMapImg} />
      <ShowroomInfo data={item} />
      <ShowroomMapBoxMobile data={item} mobileMapImg={mobileMapImg} />
    </Fragment>
  });
  return showrooms;
};

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
});

export default connect(mapStateToProps)(ShowroomHolder);
