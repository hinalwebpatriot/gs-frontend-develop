import React from "react";
import RingConstructor from "./RingConstructor";
import api from "../../../config/api";
import notification from "../../../utils/notification";
import routing from "../../../config/routing";
import { flowRight as compose } from "lodash";
import { withRouter } from "react-router-dom";
import { getInscriptionFontStorage, getInscriptionStorage } from "../../Product/Engraving/methods";

const withRingConstructorContainer = Component => {
  return class RingConstructorHOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        status: "none",
        // isMatches: false,
        isUpdating: RingConstructor.isUpdating,
        engraving: '-'
      };
    }

    checkMatching = () => {
      // const { type, id, selectedSize = {}, ringId = {}, diamondId = {} } = this.props;
      const { type, id, selectedSize = {} } = this.props;
      // const diamondId = null;
      // const ringId = null;

      const isUpdating = RingConstructor.isUpdating;
      const diamondFromStorage = RingConstructor.diamondId;
      const settingFromStorage = RingConstructor.settingId;
      const settingSizeFromStorage = RingConstructor.settingSize;
      const optionFromStorage = RingConstructor.editOption;
      // console.log(isUpdating, diamondFromStorage, settingFromStorage, settingSizeFromStorage, optionFromStorage);

      const getEngraving = {
        text: getInscriptionStorage(type === "engagement" ? id : settingFromStorage),
        font: getInscriptionFontStorage(type === "engagement" ? id : settingFromStorage)
      };

      const getParams = () => {
        switch (type) {
          case "diamond":
            return {
              diamond_id: id,
              ring_id: settingFromStorage,
              ring_size_slug: settingSizeFromStorage,
              engraving: getEngraving
            };
          case "engagement":
            return {
              diamond_id: diamondFromStorage,
              ring_id: id,
              ring_size_slug: selectedSize.slug,
              engraving: getEngraving
            };
          case "landing":
            return {
              diamond_id: this.props.diamondId,
              ring_id: this.props.ringId,
              ring_size_slug: selectedSize.slug,
              engraving: getEngraving
            };

          default:
            return {};
        }
      };

      const params = getParams();

      // const params = {
      //   diamond_id: type === "diamond" ? id : diamondFromStorage || type === "landing" ? diamondId : diamondFromStorage,
      //   ring_id: type === "engagement" ? id : settingFromStorage || type === "landing" ? ringId : diamondFromStorage,
      //   ring_size_slug:
      //     type === "engagement" ? selectedSize.slug : settingSizeFromStorage || type === "landing" ? selectedSize.slug : settingSizeFromStorage,
      //   engraving: getEngraving
      // };

      // console.log('params', params);

      this.setState({
        status: "request"
      });
      api.constructor
        .checkItems(params)
        .then(() => {
          if (isUpdating) {
            // console.log('yes', isUpdating);
            return api.constructor.updateRing({
              diamond_id: type === "diamond" ? params.diamond_id : undefined,
              ring_id: type === "engagement" ? params.ring_id : undefined,
              ring_size_slug:
                type === "engagement" ? params.ring_size_slug : undefined,
              id: optionFromStorage,
              engraving: getEngraving
            });
          } else {
            // console.log('no', isUpdating, params);
            return api.constructor.createRing(params);
          }
        })
        .then(res => {
          this.setState({
            status: "success"
          });

          RingConstructor.completeUpdate(true);

          // console.log("success", res.data.message);
          notification("success", res.data.message);
          this.props.history.push(routing().completedRings);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 400) {
              this.setState({
                status: "failure"
              });
              notification("error", err.response.data.message);
            }
            if (err.response.status === 406) {
              this.setState({
                status: "success"
              });
              notification("error", err.response.data.message);
            }
            if (err.response.status === 409) {
              this.setState({
                status: "success"
              });
              RingConstructor.completeUpdate();
              notification("info", err.response.data.message);
              this.props.history.push(routing().completedRings);
            }
            if (err.response.status === 404) {
              notification("error", params);
              RingConstructor.completeUpdate();
              this.setState({
                status: "failure"
              });
            }
          } else {
            this.setState({
              status: "failure"
            });
            notification("error", "Something went wrong");
          }
        });
    };

    handleSave = () => {
      const { type, id, selectedSize, history, diamondId } = this.props;

      if (type === "diamond") {
        RingConstructor.completeUpdate();
        RingConstructor.diamondId = id;
        history.push(routing().engagementFeed);
      }

      if (type === "engagement") {
        RingConstructor.completeUpdate();
        RingConstructor.settingId = id;
        RingConstructor.settingSize = selectedSize.slug;
        history.push(routing().diamondsFeed);
      }

      if (type === "landing") {
        // console.log(selectedSize, diamondId, settingId);
        RingConstructor.completeUpdate();
        RingConstructor.diamondId = diamondId;
        RingConstructor.settingId = id;
        RingConstructor.settingSize = selectedSize.slug;
        this.checkMatching();
        setTimeout(() => {
          history.push(routing().completedRings);
        }, 7000)
      }
    };

    render() {
      const { status, isMatches } = this.state;
      const { type, children, className } = this.props;

      const diamondId = RingConstructor.diamondId;
      const settingId = RingConstructor.settingId;
      const isUpdating = RingConstructor.isUpdating;
      const isComplete =
        (diamondId && type === "engagement") ||
        (settingId && type === "diamond");

      return (
        <Component
          status={status}
          isMatches={isMatches}
          type={type}
          isComplete={isComplete}
          isUpdating={isUpdating}
          handleCheck={this.checkMatching}
          handleSave={this.handleSave}
          children={children}
          className={className}
        />
      );
    }
  };
};

const withRingConstructor = compose(
  withRouter,
  withRingConstructorContainer
);

export default withRingConstructor;
