import React from "react";
import about1 from "../../../../img/why_us_image.jpg";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import IconFA from '../../../_common/IconFA';

export default class WhyGSDiamondsBlock extends React.Component {
  render() {
    return (
      <div className="about-prod-section">
        <div className="prod-about-img">
          <img src={about1} alt="Why GSD About" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-about">
                <p className="theme-subtitle theme-subtitle--uppercase theme-subtitle--bigger">
                  WHY GS DIAMONDS
                </p>
                <div className="prod-about__block">
                  <div className="sertificate-info">
                    <p>Certified Diamonds</p>
                    <span>What are GIA, diamond certificates</span>
                  </div>
                </div>
                <div className="prod-about__block">
                  <p className="info-p">
                    <span className="bold">Showroom </span>
                    in Sydney est 1986
                  </p>
                </div>
                <div className="warranty-info">
                  <p className="warranty-info__title">Warranties</p>
                  <ul className="info-list">
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        <span className="bold">Best price match </span>
                        Imported direct from international manufacturers
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        <span className="bold">High quality promise </span>
                        or full refund
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        <span className="bold">Conflict free </span>
                        and in compliance with the UN resolutions.
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        <span className="bold">Lifetime Warranty </span>
                        to protect against manufacturer defects in craftsmanship
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        <span className="bold">Secure checkout </span>
                        powered by Norton security. All sensitive data is
                        encrypted using 256-bit Secure Socket Layers (SSL)
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        You receive the diamonds I exactly what you ordered
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                    <li>
                      <span className="list-icon">
                        <IconFA icon={faCheck}/>
                      </span>
                      <span className="list-text">
                        <span className="bold">Return policy </span>
                        If for any reason you are not satisfied, we will gladly
                        accept your timely return of unworn, unwashed, or
                        defective merchandise
                        {/*<span className="info-icon">*/}
                        {/*<span>*/}
                        {/*<i className="fa fa-info-circle" />*/}
                        {/*</span>*/}
                        {/*</span>*/}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
