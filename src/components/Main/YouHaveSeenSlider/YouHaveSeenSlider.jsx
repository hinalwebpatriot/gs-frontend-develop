import React from "react";
import RingSlider from "../RingSlider/RingSlider";
import { connect } from "react-redux";
import selectors from "../../_selectors/mainSelectors";
import { fetchYouHaveSeenSlider } from "../MainActions";

class YouHaveSeenSlider extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchYouHaveSeenSlider();
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

    return <RingSlider {...data} noButton/>;
  }
}

const mapStateToProps = state => ({
  status: selectors.youHaveSeenSliderStatus(state),
  data: selectors.youHaveSeenSliderData(state)
});

const clearState = fetchYouHaveSeenSlider.fulfill;

const mapDispatchToProps = {
  fetchYouHaveSeenSlider,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouHaveSeenSlider);
