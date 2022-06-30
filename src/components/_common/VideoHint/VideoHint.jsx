import React, { Fragment } from "react";
import VideoHintModal from "./VideoHintModal";
import selectors from "../../_selectors/videoHintsSelectors";
import { connect } from "react-redux";
import VideoHintSvg from "../../../img/jsSvg/VideoHintSvg";

class VideoHint extends React.Component {
  state = {
    showModal: false
  };

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    const { showModal } = this.state;
    const { videoId, title = "", status } = this.props;

    if (status !== "success" || !videoId) {
      return null;
    }

    return (
      <Fragment>
        <button className="filter-play" onClick={this.handleModal}>
          <span>
            <VideoHintSvg />
          </span>
        </button>
        {showModal && (
          <VideoHintModal
            handleModal={this.handleModal}
            title={title}
            videoId={videoId}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  title: props.title,
  type: props.type,
  category: props.category,

  status: selectors.status(state),
  videoId: selectors.getHint(state, props)
});

export default connect(mapStateToProps)(VideoHint);
