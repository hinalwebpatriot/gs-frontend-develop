import React from "react";
import WeddingRingsSwitchButtons from "./Items/WeddingRingsSwitchButtons";

import RedArrow from "../../../img/svg/red_arrow.svg";
import WeddingRingsSlider from "./Items/WeddingRingsSlider";
import routing from "../../../config/routing";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import selectors from "../../_selectors/mainSelectors";
import { setWeddingRingsSlider, fetchWeddingRingsSlider } from "../MainActions";

class WeedingRingsBlock extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchData();
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  handleSelect = ({ currentTarget }) => {
    const type = currentTarget.dataset.type;
    if (type && type !== this.props.data.selected) {
      this.props.setWeddingRingsSlider(type);
    }
  };

  render() {
    const { status } = this.props;
    const { selected, data } = this.props.data;

    if (status !== "success") {
      return null;
    }

    return (
      <section className="main-section">
        <div className="container">
          <p className="section-title">Wedding and anniversary rings</p>

          {data.man.length !== 0 && data.woman.length !== 0 && (
            <WeddingRingsSwitchButtons
              handleSelect={this.handleSelect}
              selected={selected}
            />
          )}

          {data[selected].length !== 0 && (
            <WeddingRingsSlider data={data[selected]} currentTab={selected} />
          )}

          <div className="section-btn">
            <Link
              to={routing().weddingFeed}
              className="theme-btn theme-btn--auto-width"
            >
              Wedding and anniversary rings
              <span className="btn-arrow">
                <img className="red-arrow" src={RedArrow} alt="" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.weddingRingsSliderStatus(state),
  data: selectors.weddingRingsSliderData(state)
});

const clearState = fetchWeddingRingsSlider.fulfill;

const mapDispatchToProps = {
  fetchData: fetchWeddingRingsSlider,
  setWeddingRingsSlider,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeedingRingsBlock);
