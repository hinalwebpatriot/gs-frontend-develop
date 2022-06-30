import React, { Component } from "react";
import ProductGallery from "../../Shared/ProductGallery";
import CatalogDetails from "./CatalogDetails";
import CatalogMain from "./CatalogMain";
// import { connect } from 'react-redux';
// import { setEngraving } from '../../Engraving/EngravingActions';
import {setInscriptionStorage, getInscriptionStorage} from "../../Engraving/methods";

class CatalogBlock extends Component {
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
              <ProductGallery data={data.selected}/>
              {!isMobile && (
                <CatalogDetails
                  data={data}
                  currentSize={size}
                  isMobile={isMobile}
                  inscription={this.state.engraving}
                />
              )}
            </div>
            <div className="col-lg-5 fix-height-video">
              <CatalogMain data={data} isMobile={isMobile} currentSize={size}
                           handleSave={this.handleSave} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// const mapStateToProps = (state) => {
//   return state.engraving;
// };

export default CatalogBlock;
