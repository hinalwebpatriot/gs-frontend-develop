import React from "react";
import moveIcon from "../../../img/svg/move-icon.svg";
import { connect } from "react-redux";
import selectors from "../../_selectors/mainSelectors";
import { fetchCustomJewelry } from "../MainActions";
import { Link } from 'react-router-dom';
import NewProductImageRotate from "../../_common/ProductImageRotate/NewProductImageRotate";
import routing from '../../../config/routing';

class CustomJewelryBlock extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchData();
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

    const { images_360, title1, title2, title3 } = data;

    return (
      <section className="custom-section">
        <div className="container">
          <div className="home-custom">
            <div className="row">
              <div className="col-lg-6">
                <div className="custom-slider">
                  <div className="custom-slide">
                    <button className="move-slide">
                      <img src={moveIcon} alt="move hand" />
                      move
                    </button>
                    {/*<ProductImageRotate src={video.src} type={video.mime_type} className=" " />*/}
                    <NewProductImageRotate images={images_360} />
                    {/*<img src={customImg} alt="" />*/}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="custom-box">
                  <div className="custom-jew">
                    <p className="custom-jew__text">{title1}</p>
                    <p className="custom-jew__title">{title2}</p>
                    <p className="custom-jew__text">{title3}</p>
                    <Link to={routing().customJewellery} className="more-btn custom-jew__link">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.customJewelryStatus(state),
  data: selectors.customJewelryData(state)
});

const clearState = fetchCustomJewelry.fulfill;

const mapDispatchToProps = {
  fetchData: fetchCustomJewelry,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomJewelryBlock);
