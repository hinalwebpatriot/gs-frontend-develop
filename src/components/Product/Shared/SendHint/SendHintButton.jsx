import React, { Fragment } from "react";
import HintHerSvg from "../../../../img/jsSvg/HintHerSvg";
import { withRouter } from "react-router-dom";
import SendHintModal from "./SendHintModal";
import localeStore from "../../../../config/LocalesStore";

class SendHintButton extends React.Component {
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
    const { pathname } = this.props.location;
    const { type, id } = this.props;

    const link = `${
      localeStore.localeCode === "en" ? "" : "/" + localeStore.localeCode
    }${pathname}`;
    return (
      <Fragment>
        <button
          className="prod-action product-actions__item"
          onClick={this.handleModal}
        >
          <span className="extra-icon">
            <HintHerSvg />
          </span>
          <span className="prod-action__text">Hint him / her</span>
        </button>
        {showModal && (
          <SendHintModal
            handleModal={this.handleModal}
            link={link}
            type={type}
            id={id}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(SendHintButton);
