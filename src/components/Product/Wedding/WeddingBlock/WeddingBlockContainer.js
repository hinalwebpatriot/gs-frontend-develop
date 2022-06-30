import React from "react";
import { Preloader } from "../../../_common/Preloader";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import WeddingBlock from "./WeddingBlock";
import { Redirect } from "react-router-dom";
import routing from "../../../../config/routing";
import selectors from "../../../_selectors/weddingProductSelectors";

class WeddingBlockContainer extends React.Component {
  render() {
    const { data, isFetched, isError } = this.props.data;
    const { isMobile, size } = this.props;

    if (isError) {
      return <Redirect to={routing().notFound} />;
    }

    if (!isFetched) {
      return <Preloader margin={"50vh 0"} />;
    }

    return <WeddingBlock data={data} isMobile={isMobile} size={size} />;
  }
}

const mapStateToProps = (state, props) => ({
  isMobile: deviceSelector(state),
  data: selectors.ringData(state),
  ...props
});

export default connect(mapStateToProps)(WeddingBlockContainer);
