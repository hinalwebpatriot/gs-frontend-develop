import React from "react";
import subscribeValidation from "./SubscribeValidation";
import api from "../../../config/api";
import notification from "../../../utils/notification";
import { get } from "lodash";

export default class SubscribeContainer extends React.Component {
  state = {
    gender: "man",
    checkboxes: [], //'sale', 'discounts', 'new_collection'
    image: null
  };

  // componentDidMount() {
  //   this.handleFetchForm();
  // }
  //
  // handleFetchForm = () => {
  //   api.main.subscribeForm()
  //     .then(({data}) => {
  //       this.setState({
  //         image: data.banner
  //       })
  //     })
  //     .catch(err => {})
  // }

  changeSubscribeType = value => {
    const { checkboxes } = this.state;

    if (checkboxes.includes(value)) {
      this.setState({
        checkboxes: checkboxes.filter(item => item !== value)
      });
    } else {
      this.setState({
        checkboxes: [value, ...checkboxes]
      });
    }
  };

  handleSend = ({ email, gender }) => {
    const { isValid, errors } = subscribeValidation({ email });

    if (isValid) {
      let type;
      const { checkboxes } = this.state;

      if (!checkboxes.length) {
        type = ["sale", "discounts", "new_collection"];
      } else {
        type = checkboxes;
      }

      const req = {
        email,
        type,
        gender
      };

      api.main
        .subscribe(req)
        .then(() => {
          notification("success", "Your email have been sent");
        })
        .catch(e => {

          notification(
            "error",
            get(e, "response.data.errors.email[0]", "Something went wrong")
          );
        });
    } else {
      notification("error", errors.email);
    }
  };

  render() {
    const { Component, isMain } = this.props;
    const { checkboxes } = this.state;
    return (
      <Component
        changeSubscribeType={this.changeSubscribeType}
        handleSend={this.handleSend}
        checkboxes={checkboxes}
        isMain={isMain}
      />
    );
  }
}
