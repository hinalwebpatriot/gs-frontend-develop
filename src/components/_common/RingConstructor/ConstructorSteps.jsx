import React, { Fragment } from "react";

import stepSvg from "../../../img/svg/step.svg";
import stepXs from "../../../img/step_xs.png";
import stepActiveSvg from "../../../img/svg/step_active.svg";
import stepActiveXs from "../../../img/step_active_xs.png";
import SettingSvg from "../../../img/jsSvg/SettingSvg";
import CompleteSvg from "../../../img/jsSvg/CompleteSvg";
import routing from "../../../config/routing";
import { Link } from "react-router-dom";
import ConstructorDiamondSvg from "../../../img/jsSvg/ConstructorDiamondSvg";

const LinkWrapper = ({ link, children }) => {
  if (link) {
    return <Link to={link}>{children}</Link>;
  } else {
    return children;
  }
};

const Step = ({ type, number, isActive, isDone, isMiddle }) => {
  let link;

  switch (type) {
    case "diamond":
      link = routing().diamondsFeed;
      break;
    case "setting":
      link = routing().engagementFeed;
      break;
    case "ring":
      link = routing().completedRings;
      break;
      default:
        break;
  }

  return (
    <div
      className={`step ${isActive ? "active" : ""} ${isDone ? "done" : ""} ${
        isMiddle ? "step--middle" : ""
      }`}
    >
      <LinkWrapper link={link}>
        <div className="step__figure">
          <img
            className="xs-hide"
            src={isActive ? stepActiveSvg : stepSvg}
            alt=""
          />
          <img
            className="xs-show"
            src={isActive ? stepActiveXs : stepXs}
            alt=""
          />
        </div>
        <div className="step-block">
          {/*<button className="step-block__remove">*/}
          {/*<img src={CloseStep} alt=""/>*/}
          {/*</button>*/}
          <p className="step-block__number">
            <span>{number}</span>
          </p>
          <p className="step-block__icon">
            {type === "diamond" && <ConstructorDiamondSvg />}
            {type === "setting" && <SettingSvg />}
            {type === "ring" && <CompleteSvg />}
          </p>
          <p className="step-choose">
            {type === "diamond" && (
              <Fragment>
                {"Choose "}
                <span>Diamond</span>
              </Fragment>
            )}
            {type === "setting" && (
              <Fragment>
                {"Choose "}
                <span>Setting</span>
              </Fragment>
            )}
            {type === "ring" && (
              <Fragment>
                {"Choose "}
                <span>Ring</span>
              </Fragment>
            )}
          </p>
        </div>
      </LinkWrapper>
    </div>
  );
};

export default class ConstructorSteps extends React.Component {
  render() {
    const { marks } = this.props;

    const steps = marks.map((step, index) => (
      <Step
        type={step.type}
        number={index + 1}
        isDone={step.isDone}
        isActive={step.isActive}
        key={`${step.type}_constructor`}
      />
    ));

    return (
      <section className="step-section">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="step-info sm-hide">
              <p className="step-info__title">Build a Ring of Your Dreams</p>
              <p className="step-info__text">Design your Perfect Emotions</p>
            </div>
            <div className="step-row">{steps}</div>
          </div>
        </div>
      </section>
    );
  }
}
