import React from "react";
import CompletedRingsList from "./CompletedRingsList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { flowRight as compose } from "lodash";
import selectors from "../_selectors/completedRingsSelectors";
import {
  fetchCompletedRings,
  deleteCompletedRing
} from "./CompletedRingsActions";
import { Preloader } from "../_common/Preloader";
import routing from "../../config/routing";
import RingConstructor from "../_common/RingConstructor/RingConstructor";

class CompletedRingsListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCompletedRings();
  }

  handleUpdate = ({ type, id, optionId, ringSize }) => {
    RingConstructor.startUpdate({ type, optionId, id, ringSize });
    this.props.history.push(
      type === "diamond" ? routing().diamondsFeed : routing().engagementFeed
    );
  };

  render() {
    const { status, keys, items, deleteCompletedRing, history } = this.props;

    if (status === "request") {
      return <Preloader margin="40vh auto" />;
    }

    return (
      <CompletedRingsList
        keys={keys}
        items={items}
        history={history}
        handleDelete={deleteCompletedRing}
        handleUpdate={this.handleUpdate}
      />
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.status(state),
  items: selectors.items(state),
  keys: selectors.keys(state)
});

const mapDispatchToProps = {
  fetchCompletedRings,
  deleteCompletedRing
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CompletedRingsListContainer);
