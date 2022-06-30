import React from "react";
import { Redirect } from "react-router-dom";
import { Preloader } from "../../../_common/Preloader";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import selectors from "../../../_selectors/engagementProductSelectors";
import EngagementBlock from "./EngagementBlock";
import routing from "../../../../config/routing";

class EngagementBlockContainer extends React.Component {
  render() {
    const { data, isFetched, isError } = this.props.data;
    const { isMobile, size } = this.props;

    if (isError) {
      return <Redirect to={routing().notFound} />;
    }

    if (!isFetched) {
      return <Preloader margin={"50vh 0"} />;
    }

    return <EngagementBlock data={data} isMobile={isMobile} size={size} />;
  }
}

const mapStateToProps = (state, props) => ({
  isMobile: deviceSelector(state),
  data: selectors.ringData(state),
  ...props
});

export default connect(mapStateToProps)(EngagementBlockContainer);
