import React, { Component } from "react";
import ProductGallery from "../../Shared/ProductGallery";
import WeddingDetails from "./WeddingDetails";
import WeddingMain from "./WeddingMain";
import {getInscriptionStorage, setInscriptionStorage} from "../../Engraving/methods";

class WeddingBlock extends Component {
  state = {
    engraving: '-'
  };

  handleSave = (value, font) => {
    setInscriptionStorage(this.props.data.selected.id, value, font);
    this.setState({
      engraving: getInscriptionStorage(this.props.data.selected.id)
    })
  };

  render() {
    const { data, isMobile, size } = this.props;

    return (
      <section className="product-main-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <ProductGallery data={data.selected} />
              {!isMobile && (
                <WeddingDetails
                  data={data}
                  currentSize={size}
                  isMobile={isMobile}
                  inscription={this.state.engraving}
                />
              )}
            </div>
            <div className="col-lg-5 fix-height-video">
              <WeddingMain data={data} isMobile={isMobile} currentSize={size} handleSave={this.handleSave} />
            </div>
          </div>
        </div>
      </section>
    )
  }

};

export default WeddingBlock;
