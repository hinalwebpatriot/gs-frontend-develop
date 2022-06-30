import React from "react";
import { Preloader } from "../../../_common/Preloader";
import routing from "../../../../config/routing";
import api from "../../../../config/api";
import notification from "../../../../utils/notification";
import { dataLayerPush } from '../../../../utils/dataLayer';
export default class ConfirmEmail extends React.Component {
  state = {
    status: "request"
  };

  componentDidMount() {
    const signature =
      this.props.match.params.signature + this.props.location.search;
    const replace = this.props.history.replace;

    if (signature) {
      this.handleConfirm(signature);
    } else {
      replace(routing().root);
    }

    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  handleConfirm = signature => {
    api.auth
      .confirmEmail(signature)
      .then(res => {
        if (res.status === 200) {
          this.setState({ status: "success" });
          notification("success", "Your email has been confirmed");
          this.props.history.replace(routing().root);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        this.setState({ status: "failure" });
        notification("error", "Something went wrong");
        this.props.history.replace(routing().root);
      });
  };

  render() {
    return (
      <section className="main-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-5">
              <Preloader />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
