import React from "react";
import ShareSvg from "../../../img/jsSvg/ShareSvg";
import CompleteRingShareModal from './CompleteRingShareModal';


export default class CompleteRingShareButton extends React.Component {
  state = {
    showModal: false
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    }, () => document.body.classList.toggle('share-open'))
  }

  componentWillUnmount() {
    document.body.classList.remove('share-open');
  }

  render() {
    const { showModal } = this.state;
    return (
      <div className="complete-action__item">
        <button className={`share-ring complete-action__btn ${showModal ? 'active' : ''}`} onClick={this.handleModal}>
          <span>
            <ShareSvg />
          </span>
          Share with a friend
        </button>
        { showModal && <CompleteRingShareModal handleModal={this.handleModal}/>}
      </div>
    );
  }
}
