import React, { Fragment } from "react";
import faFacebookF  from "@fortawesome/fontawesome-free-brands/faFacebookF";
import faGooglePlusG  from "@fortawesome/fontawesome-free-brands/faGooglePlusG";

import IconFA from '../../_common/IconFA';

export default class SocialButtons extends React.Component {
  render() {
    const { type } = this.props;
    const word = type === "login" ? "Sign in" : "Registration";
    return (
      <Fragment>
        <p className="cred-form__text">{word} via social networks</p>
        <div className="cred-social">
          <button className="social-btn social-btn--type1">
            <span className="social-btn__icon">
              <IconFA icon={faFacebookF}/>
            </span>
            <span className="social-btn__text">
              {word} with <span>Facebook</span>
            </span>
          </button>
          <button className="social-btn social-btn--type2">
            <span className="social-btn__icon">
              <IconFA icon={faGooglePlusG}/>
            </span>
            <span className="social-btn__text">
              {word} with <span> Google+</span>
            </span>
          </button>
        </div>
      </Fragment>
    );
  }
}
