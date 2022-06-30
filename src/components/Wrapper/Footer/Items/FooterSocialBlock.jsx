import React from "react";
import socialLinks from "../../../../config/socialLinks";
import faFacebookF from "@fortawesome/fontawesome-free-brands/faFacebookF";
import faInstagram from "@fortawesome/fontawesome-free-brands/faInstagram";
import faPinterestP from "@fortawesome/fontawesome-free-brands/faPinterestP";
import faYoutube from "@fortawesome/fontawesome-free-brands/faYoutube";
import IconFA from '../../../_common/IconFA';

export default class FooterSocialBlock extends React.Component {
  render() {
    return (
      <div className="f-social-box mobile-f-line">
        <p className="info-p">Join 20000+ jewellery lovers</p>
        <div className="f-social">
          <a href={socialLinks.instagram} rel="nofollow" target="_blank" className="f-social__item" aria-label="social links: instagram">
            <IconFA icon={faInstagram}/>
          </a>
          <a href={socialLinks.facebook} rel="nofollow" target="_blank" className="f-social__item" aria-label="social links: facebook">
            <IconFA icon={faFacebookF}/>
          </a>
          <a href={socialLinks.youtube} rel="nofollow" target="_blank" className="f-social__item" aria-label="social links: youtube">
            <IconFA icon={faYoutube}/>
          </a>
          {/*<a href={socialLinks.twitter} className="f-social__item">*/}
          {/*<i className="fab fa-twitter" />*/}
          {/*</a>*/}
          <a href={socialLinks.pinterest} rel="nofollow" target="_blank" className="f-social__item" aria-label="social links: pinterest">
            <IconFA icon={faPinterestP}/>
          </a>
          {/*<a href={socialLinks.google} className="f-social__item">*/}
          {/*<i className="fab fa-google-plus-g" />*/}
          {/*</a>*/}
          {/*<a href={socialLinks.snapchat} className="f-social__item">*/}
          {/*<i className="fab fa-snapchat-ghost" />*/}
          {/*</a>*/}
        </div>
      </div>
    );
  }
}
