import React from "react";
import { Redirect } from "react-router-dom";
import { Preloader } from "../../../_common/Preloader";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import selectors from "../../../_selectors/catalogProductSelectors";
import CatalogBlock from "./CatalogBlock";
import routing from "../../../../config/routing";

class CatalogBlockContainer extends React.Component {
  render() {
    const { data, isFetched, isError } = this.props.data;
    const { isMobile, size } = this.props;

    if (isError) {
      return <Redirect to={routing().notFound} />;
    }

    if (!isFetched) {
      return <Preloader margin={"50vh 0"} />;
    }

    return <CatalogBlock data={data} isMobile={isMobile} size={size} />;
  }
}

const mapStateToProps = (state, props) => ({
  isMobile: deviceSelector(state),
  data: selectors.catalogData(state),
  ...props
});

export default connect(mapStateToProps)(CatalogBlockContainer);
