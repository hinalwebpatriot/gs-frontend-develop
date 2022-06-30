import React from "react";
import EnvelopeSvg from "../../../img/jsSvg/EnvelopeSvg";
import ImageLoader from "../../_common/ImageLoader";

import quoteImg from "../../../img/qoute_img.png";

const ContactUsSeoBlock = ({ data }) => {
  const { email, photo, title, text, name, list_1, list_2, list_3 } = data;

  if (Object.values(data).some(key => key === null)) {
    return null;
  }

  return (
    <div className="main-section main-section--contact-expert ">
      <div className="container">
        <div className="expert-qoute-block">
          <div className="expert-choice expert-choice--contact">
            <div className="expert-choice__inner">
              <div className="expert-choice-img expert-choice-img--type2 sm-hide">
                <ImageLoader
                  preloadStyles={{ margin: "200px auto" }}
                  src={photo}
                />
              </div>
              <div className="qoute-img sm-hide">
                <img src={quoteImg} alt="quote" />
              </div>
              <div className="row justify-content-end">
                <div className="col-lg-6">
                  <div className="expert-qoute">
                    <p className="section-title">{title}</p>
                    <p className="expert-qoute__item">{text}</p>
                    <ul>
                      <li>{list_1}</li>
                      <li>{list_2}</li>
                      <li>{list_3}</li>
                    </ul>
                    <div className="qoute-author">
                      <p className="qoute-author__name">{name}</p>
                      <a
                        href={`mailto:${email}`}
                        className="qoute-author__email"
                      >
                        <span>
                          <EnvelopeSvg />
                        </span>
                        {email}
                      </a>
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
};

export default ContactUsSeoBlock;
