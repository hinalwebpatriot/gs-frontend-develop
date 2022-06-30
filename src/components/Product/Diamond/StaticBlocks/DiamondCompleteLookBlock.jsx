import React from "react";

import api from "../../../../config/api";
import RingPaneItem from "../../../Feed/Shared/Rings/RingPaneItem";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

class DiamondCompleteLookBlock extends React.Component {
  state = {
    status: "request",
    data: {}
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      this.handleFetch();
    }
  }

  handleFetch = () => {
    const { id } = this.props;

    this.setState({ status: "request", data: {} });

    const fetchData = api.diamond.getCompleteLook();
    const fetchProducts = api.constructor.getRingsWithDiamond(
      { page: 1, perPage: 4 },
      id
    );

    Promise.all([fetchData, fetchProducts]).then(
      results => {
        this.setState({
          status: "success",
          data: {
            ...results[0].data.data,
            products: results[1].data.data
          }
        });
      },
      () => {
        this.setState({
          status: "failure",
          data: {}
        });
      }
    );
  };

  render() {
    const { status, data } = this.state;

    if (status !== "success") return null;

    //TODO: Slider mobile and desktop

    // const items = [1, 2, 3, 4].map(item => (
    //   <div className="col-md-6" key={`complete_item_${item}`}>
    //     <div className="slide slide--full">
    //       <div className="slide__img">
    //         <img src={home1} alt="" />
    //       </div>
    //       <p className="slide__title">rene 4</p>
    //       <p className="slide__name">Cathedral Knife edge Round</p>
    //       <p className="slide__price">{localeStore.formatPrice(7421)}</p>
    //     </div>
    //   </div>
    // ));

    const items = data.products.map((item, index) => (
      <RingPaneItem
        data={item}
        type="engagement"
        list={GoogleEE.LIST_SLIDER}
        key={`complete_item_${item.group_sku}`}
        wrapperClassname="col-6"
        position={index + 1}
      />
    ));

    return (
      <div className="about-prod-section about-prod-section--type2">
        <div className="prod-about-img prod-about-img--type2 sm-hide">
          <img src={data.image} alt="" />
        </div>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-6">
              <div className="complete-look-wrap">
                <p className="section-title">{data.title}</p>
                <div className="complete-look">
                  <div className="row">{items}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiamondCompleteLookBlock;
