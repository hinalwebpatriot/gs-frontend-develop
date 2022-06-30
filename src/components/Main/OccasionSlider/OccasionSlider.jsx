import React from "react";
import RingSlider from "../RingSlider/RingSlider";
import { connect } from "react-redux";
import selectors from "../../_selectors/mainSelectors";
import { fetchOccasionSlider } from "../MainActions";

class OccasionSlider extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchOccasionSlider();
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { status, data } = this.props;
    if (status !== "success") {
      return null;
    }

    if (!data.data.length) {
      return null;
    }

    return <RingSlider {...data} />;
  }
}

const mapStateToProps = state => ({
  status: selectors.occasionSliderStatus(state),
  data: selectors.occasionSliderData(state)
});

const clearState = fetchOccasionSlider.fulfill;

const mapDispatchToProps = {
  fetchOccasionSlider,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccasionSlider);
