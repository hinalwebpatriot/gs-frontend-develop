import React from "react";
import ShapesBlock from "./ShapesBlock";
import routing from "../../../config/routing";
import { connect } from "react-redux";
import selectors from "../../_selectors/mainSelectors";
import {
  fetchShapesBlock,
  setShapeFromShapesBlock
} from "../../Main/MainActions";
import capitalizeString from '../../../utils/capitalizeString';
import { get } from "lodash";

class ShapesBlockContainer extends React.Component {
  state = {
    currentId: 1,
    currentIndex: 0,
    currentSlug: 'round',
    length: 10
  };

  componentDidMount() {
    const { status, data, fetchShapesBlock } = this.props;

    if (status !== "success") {
      fetchShapesBlock();
    }
    if (status === "success") {
      this.setState((state) => ({
        ...state,
        currentId: get(data, 'data[0].id', 1),
        length: data.data.length
      }))
    }
  }

  handleSelect = (id, slug, index) => {
    this.setState((state) => ({
      ...state,
      currentId: id,
      currentSlug: slug,
      currentIndex: index
      })
    );

    if (id && id !== this.props.data.selected) {
      this.props.setShapeFromShapesBlock({
        selected: id,
        path: routing(slug).diamondsFeedWithShape
      });
    }
  };

  render() {
    const { status, page, isMobile, type } = this.props;
    const { selected, data, path } = this.props.data;

    const { currentId, currentIndex, currentSlug, length } = this.state;
    const currentItem = {
      currentId,
      currentIndex,
      currentSlug,
      length
    };

    if (status !== "success") return null;

    return (
      <ShapesBlock
        currentSlide={currentItem}
        selected={selected}
        data={data}
        handleSelect={this.handleSelect}
        path={path.toLowerCase()}
        page={page}
        type={type}
        isMobile={isMobile}
      />
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.shapesBlockStatus(state),
  data: selectors.shapesBlockData(state),
  isMobile: selectors.deviceSelector(state)
});

const clearState = fetchShapesBlock.fulfill;

const mapDispatchToProps = {
  fetchShapesBlock,
  setShapeFromShapesBlock,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShapesBlockContainer);
