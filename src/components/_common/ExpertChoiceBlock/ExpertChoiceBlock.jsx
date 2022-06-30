import React from "react";

import qoute from "../../../img/svg/qoute_img2.svg";
import qouteIcon from "../../../img/svg/speak.svg";
import withFetch from "../HOC/WithFetch";
import api from "../../../config/api";

class ExpertChoiceBlock extends React.Component {
  render() {
    const { status } = this.props;

    if (status !== "success") return null;

    const { data } = this.props.data;

    return (
      <div className="main-section sm-hide">
        <div className="container">
          <div className="expert-qoute-block">
            <div className="expert-choice">
              <div className="expert-choice__inner">
                <div className="expert-choice-img">
                  <img src={data.image} alt="Expert choice img" />
                </div>
                <div className="qoute-img">
                  <img src={qoute} alt="Quote img" />
                </div>
                <div className="row justify-content-end">
                  <div className="col-lg-6">
                    <div className="expert-qoute">
                      <p className="section-title">{data.title}</p>
                      <p className="expert-qoute__item">
                        <span className="qoute-icon">
                          <img src={qouteIcon} alt="Quote icon" />
                        </span>

                        {data.description}
                        {/*Once a diamond reaches the surface of the earth, the real challenge begins.*/}
                      </p>
                      <div className="qoute-author">
                        <p className="qoute-author__name">{data.expert_name}</p>
                        <span className="qoute-author__text">{data.brand}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFetch(api.diamondsFeed.getExpertChoice)(ExpertChoiceBlock);
