import React from "react";

import CustomTooltip from "../../../_common/CustomTooltip";

export default class FooterSubscribeBlock extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  handleSend = ({ currentTarget }) => {
    this.props.handleSend({
      email: this.input.current.value,
      gender: currentTarget.dataset.value
    });
    this.input.current.value = "";
  };

  render() {
    return (
      <div className="f-subscribe-box mobile-f-line">
        <p className="info-p f-col__title--type2">
          <CustomTooltip path="shared.subscribeOffers" />
          Subscribe to get more offers
        </p>
        <div className="f-subscribe">
          <div className="subscribe">
            <input aria-label="subscribe" 
              type="text"
              className="subscribe__field"
              placeholder="Email"
              ref={this.input}
            />
            <button aria-label="subscribe" 
              className="subscribe__btn"
              onClick={this.handleSend}
              data-value="woman"
            >
              Woman
            </button>
            <button aria-label="subscribe" 
              className="subscribe__btn"
              onClick={this.handleSend}
              data-value="man"
            >
              Man
            </button>
          </div>
        </div>
      </div>
    );
  }
}
