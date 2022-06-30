import React, { Fragment } from "react";
import PlusSvg from "../../../img/jsSvg/PlusSvg";
import CompareSvg from "../../../img/jsSvg/CompareSvg";
import MessageSvg from "../../../img/jsSvg/MessageSvg";
import EnvelopeSvg from "../../../img/jsSvg/EnvelopeSvg";
import MessengerSvg from "../../../img/jsSvg/MessengerSvg";
import FacebookSvg from "../../../img/jsSvg/FacebookSvg";
import PinterestSvg from "../../../img/jsSvg/PinterestSvg";
import RemoveSmallSvg from "../../../img/jsSvg/RemoveSmallSvg";
import routing from "../../../config/routing";
import FavoriteSvg from "../../../img/jsSvg/FavoriteSvg";
import ShareListModal from "./Modal/ShareListModal";
import localeStore from "../../../config/LocalesStore";
import api from "../../../config/api";
import {
  facebookShareUrl,
  messengerShareUrl,
  openSocialWindow,
  pinterestShareUrl
} from "../../../utils/sharingUtils";
import notification from "../../../utils/notification";

export default class ActionsBlockMobile extends React.Component {
  state = {
    showShareModal: false,
    socialShareStatus: "none"
  };

  handleSocialShare = socialType => {
    const { type, currentTab } = this.props;
    const basename =
      localeStore.localeCode !== "en" ? localeStore.localeCode + "/" : "";
    let apiUrl;

    switch (currentTab) {
      case "diamond":
        apiUrl = api[type].shareDiamonds;
        break;
      case "engagement":
        apiUrl = api[type].shareEngagementRings;
        break;
      case "wedding":
        apiUrl = api[type].shareWeddingRings;
        break;
    }

    this.setState({ socialShareStatus: "request" });

    apiUrl({ share_path: "/" })
      .then(res => {
        this.setState({ socialShareStatus: "success" });

        let link;

        switch (type) {
          case "favorite":
            link = `${document.location.origin}${basename}${
              routing({ tab: currentTab, id: res.data.share_id }).favoriteShare
            }`;
            break;
          case "compare":
            link = `${document.location.origin}${basename}${
              routing({ tab: currentTab, id: res.data.share_id }).compareShare
            }`;
            break;
        }

        switch (socialType) {
          case "facebook":
            openSocialWindow({
              url: facebookShareUrl({ url: link })
            });
            break;
          case "messenger":
            openSocialWindow({
              url: messengerShareUrl({ url: link })
            });
            break;
          case "pinterest":
            openSocialWindow({
              url: pinterestShareUrl({
                description: `My list: ${link}`,
                url:
                  "https://develop-diamond-media.s3.eu-central-1.amazonaws.com/shapes/Round/E.png"
              })
            });
        }
      })
      .catch(err => {
        this.setState({
          socialShareStatus: "failure"
        });

        if (err.response) {
          notification("error", err.response.data.message);
        }
      });
  };

  handleShareModal = () => {
    this.setState({
      showShareModal: !this.state.showShareModal
    });
  };

  render() {
    const {
      type,
      currentTab,
      tabsCount,
      removeDiamonds,
      removeEngagements,
      removeWeddings,
      addAllDiamonds,
      addAllEngagements,
      addAllWeddings,
      history
    } = this.props;

    const { showShareModal, socialShareStatus } = this.state;

    if (currentTab === null) return null;

    let removeAllAction;
    let addAllAction;
    let count;
    let addLink;

    switch (currentTab) {
      case "diamond":
        addAllAction = addAllDiamonds;
        removeAllAction = removeDiamonds;
        count = tabsCount.diamond;
        addLink = routing().diamondsFeed;
        break;
      case "engagement":
        addAllAction = addAllEngagements;
        removeAllAction = removeEngagements;
        count = tabsCount.engagement;
        addLink = routing().engagementFeed;
        break;
      case "wedding":
        addAllAction = addAllWeddings;
        removeAllAction = removeWeddings;
        count = tabsCount.wedding;
        addLink = routing().weddingFeed;
        break;
    }

    const isFetching = socialShareStatus === "request";

    return (
      <div className="mobile-fav-action">
        <div className="fav-action-group">
          {showShareModal && (
            <ShareListModal
              productType={currentTab}
              listType={type}
              handleModal={this.handleShareModal}
            />
          )}
          <div className="fav-action">
            <button
              className="fav-action__item"
              onClick={() => history.push(addLink)}
            >
              <span className="action-icon">
                <PlusSvg />
              </span>
              Add product
            </button>

            <button className="fav-action__item">
              <span className="action-icon">
                <MessageSvg />
              </span>
              Ask for Expert Choice
            </button>

            {count > 0 && (
              <button
                className="fav-action__item"
                onClick={() => removeAllAction()}
              >
                <span className="action-icon">
                  <RemoveSmallSvg />
                </span>
                Remove all
              </button>
            )}

            {count > 0 &&
              (type === "favorite" ? (
                <button
                  className="fav-action__item"
                  onClick={() => addAllAction()}
                >
                  <span className="action-icon">
                    <CompareSvg />
                  </span>
                  Add all to comparison
                </button>
              ) : (
                <button
                  className="fav-action__item"
                  onClick={() => addAllAction()}
                >
                  <span className="action-icon">
                    <FavoriteSvg />
                  </span>
                  Add all to favorites
                </button>
              ))}
          </div>

          {count > 0 && (
            <Fragment>
              <p className="section-title">Share your collection</p>
              <div className="fav-action fav-action--social-list">
                <button
                  className="fav-action__item"
                  onClick={this.handleShareModal}
                >
                  <span className="action-icon">
                    <EnvelopeSvg />
                  </span>
                </button>
                <button
                  className="fav-action__item"
                  onClick={() => this.handleSocialShare("messenger")}
                  disabled={isFetching}
                >
                  <span className="action-icon">
                    <MessengerSvg />
                  </span>
                </button>
                <button
                  className="fav-action__item"
                  onClick={() => this.handleSocialShare("facebook")}
                  disabled={isFetching}
                >
                  <span className="action-icon">
                    <FacebookSvg />
                  </span>
                </button>
                <button
                  className="fav-action__item"
                  onClick={() => this.handleSocialShare("pinterest")}
                  disabled={isFetching}
                >
                  <span className="action-icon">
                    <PinterestSvg />
                  </span>
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
