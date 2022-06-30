import React from "react";

import cert1 from "../../../../../img/sertificate1.png";
import CertificateTabContent from "./CertificateTabContent";
import api from "../../../../../config/api";
import withFetch from "../../../../_common/HOC/WithFetch";
import { openHubspotChat } from "../../../../../config/hubspot";
import { connect } from "react-redux";
import { deviceSelector } from "../../../../_selectors/deviceSelector";
import { flowRight as compose } from "lodash";

class CertificateTabsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.timerId = null;
    this.delay = 300;

    this.state = {
      tab: null,
      loaded: []
    };
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    document.body.classList.remove("diamonds-tab-open");
  }

  handleOpenTab = ({ currentTarget }) => {
    this.timerId = setTimeout(() => {
      const tab = +currentTarget.dataset.tab;

      if (tab) {
        const { loaded } = this.state;
        this.setState({
          loaded: loaded.includes(tab) ? loaded : [...loaded, tab],
          tab: tab
        });
        document.body.classList.add("diamonds-tab-open");
        // document.addEventListener('click', this.handleCloseTab);
      }
    }, this.delay);
  };

  handleCloseTab = ({ target }) => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    try {
      // if (!target.closest('.sertificate') || !target.closest('.expert-info')) {
      this.setState(
        {
          tab: null
        },
        () => {
          document.body.classList.remove("diamonds-tab-open");
          // document.removeEventListener('click', this.handleCloseTab);
        }
      );
      // }
    } catch (e) {}
  };

  render() {
    const { tab, loaded } = this.state;
    const { handleModal, status, data, isMobile } = this.props;
    let isFetched = false;
    let tabsContent = [];

    if (status === "success" && data.length && !isMobile) {
      isFetched = true;
      tabsContent = data.map(item => (
        <CertificateTabContent link={item.file} />
      ));
    }

    return (
      <div className="expert-line-section">
        <div className="container">
          <div className="expert-line-box">
            <div
              className={`sertificate ${tab === 1 ? "active-drop" : ""}`}
              data-tab="1"
              onMouseEnter={isFetched ? this.handleOpenTab : undefined}
              onMouseLeave={this.handleCloseTab}
            >
              <div className="sertificate__img">
                <img src={cert1} alt="" />
              </div>
              <p>
                Certified <br />
                Diamonds
              </p>
              {loaded.includes(0) &&  tabsContent[0]}
            </div>
            <div
              className={`expert-info expert-info--first ${
                tab === 2 ? "active-drop" : ""
              } `}
              data-tab="2"
              onMouseEnter={isFetched ? this.handleOpenTab : undefined}
              onMouseLeave={this.handleCloseTab}
            >
              <span className="expert-info__text">
                Showroom in Sydney est 1986
              </span>
              {loaded.includes(1) && tabsContent[1]}
            </div>
            <div
              className={`expert-info ${tab === 3 ? "active-drop" : ""}`}
              data-tab="3"
              onMouseEnter={isFetched ? this.handleOpenTab : undefined}
              onMouseLeave={this.handleCloseTab}
            >
              <span className="expert-info__text">
                Conflict free and in compliance with the UN resolutions
              </span>
              {loaded.includes(2) && tabsContent[2]}
            </div>
            <div
              className={`expert-info ${tab === 4 ? "active-drop" : ""}`}
              data-tab="4"
              onMouseEnter={isFetched ? this.handleOpenTab : undefined}
              onMouseLeave={this.handleCloseTab}
            >
              <span className="expert-info__text">
                Imported direct from international manufactures
              </span>
              {loaded.includes(3) && tabsContent[3]}
            </div>

            <div className="expert-btn">
              <button
                className="theme-btn theme-btn--type2 sm-show"
                onClick={handleModal}
              >
                Filter
              </button>
              <button
                className="theme-btn theme-btn--chat"
                onClick={() => openHubspotChat()}
              >
                Chat with expert
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isMobile: deviceSelector(state)
});

export default compose(
  withFetch(api.diamondsFeed.getCertificateTabs),
  connect(mapStateToProps)
)(CertificateTabsBlock);

// withFetch(api.diamondsFeed.getCertificateTabs);
