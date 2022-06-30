import React from "react";
import DiamondBlock from "./DiamondBlock";
import { Preloader } from "../../../_common/Preloader";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import { Redirect } from "react-router-dom";
import routing from "../../../../config/routing";

class DiamondsBlockContainer extends React.Component {
  render() {
    const { data, isFetched, isError, isMobile } = this.props;
    if (isError) {
      return <Redirect to={routing().notFound} />;
    }

    if (!isFetched) {
      return <Preloader margin={"50vh 0"} />;
    }

    return <DiamondBlock data={data} isMobile={isMobile} />;
  }
}

const mapStateToProps = (state, props) => ({
  isMobile: deviceSelector(state),
  ...props
});

export default connect(mapStateToProps)(DiamondsBlockContainer);
