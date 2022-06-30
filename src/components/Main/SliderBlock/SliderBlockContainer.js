//будет отправлять респонс и смотреть это видео или слайд, затем рендерить нужный блок
import React from "react";
import { connect } from "react-redux";
import MainSlider from "./Items/MainSlider";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { citySelector } from "../../_selectors/citySelectors";
import selectors from "../../_selectors/mainSelectors";
import { fetchMainSlider } from "../MainActions";
import { Preloader } from "../../_common/Preloader";

class SliderBlockContainer extends React.Component {
  componentDidMount() {
    const { data, status } = this.props;
    if (status !== 'success' && !data.slides) {
      this.props.fetchMainSlider();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isMobile !== this.props.isMobile) {
      // this.props.fetchMainSlider();
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { status, data, city } = this.props;
    const { is_slider, slides } = data;

    if (status !== "success")
      return (
        <div style={{ backgroundColor: "white", height: '400px'}} className="main-slide">
          <Preloader />
        </div>
      );

    if (is_slider) {
      return <MainSlider data={slides} city={city} />;
    } else {
      return <Preloader />
    }
  }
}

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
  city: citySelector(state),
  data: selectors.mainSliderData(state),
  status: selectors.mainSliderStatus(state)
});

const clearState = fetchMainSlider.fulfill;

const mapDispatchToProps = {
  fetchMainSlider,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderBlockContainer);
