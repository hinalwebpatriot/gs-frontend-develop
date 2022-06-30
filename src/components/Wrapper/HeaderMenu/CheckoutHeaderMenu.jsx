import React from "react";
import { Link, withRouter } from "react-router-dom";
import { flowRight as compose } from "lodash";
import { connect } from "react-redux";
import routing from "../../../config/routing";
import CartSvg from "../../../img/jsSvg/CartSvg";
import BackArrowButton from "../../../img/jsSvg/BackArrowButton";
import { allowDeliveryRoute, pushDeliveryData } from "../../Checkout/Delivery/DeliveryActions";
import { deviceSelector } from "../../_selectors/deviceSelector";
import selectors from "../../_selectors/cartSelectors";

class CheckoutHeaderMenu extends React.Component {
  pushToDelivery = () => {
    const { allowDeliveryRoute, history, cartCount } = this.props;
    if (cartCount > 0) {
      allowDeliveryRoute();
      history.push(routing().delivery);
    }
  };

  render() {
    const { path, history, pushDeliveryData, isMobile}  = this.props;

    return (
      <header className="header ">
        <div className="container">
          <div className="header-container">
            <Link to={routing().root} className="theme-logo" />
            <div className="nav-box nav-box--cart">
              <div className="nav-box__inner">
                <ul className="theme-nav theme-nav--cart">
                  {!isMobile && routing().cart !== path && (
                    <li className="">
                      <a onClick={history.goBack}>
                        <span className="nav-ico">
                          <BackArrowButton />
                        </span>
                        Back
                      </a>
                    </li>
                  )}
                  <li className="">
                    <a className={routing().cart === path ? "active" : ""} onClick={() => history.push(routing().cart)}>
                      <span className="nav-ico">
                        <CartSvg height="16px" />
                      </span>
                      Cart
                    </a>
                  </li>
                  <li className="">
                    <a className={routing().delivery === path ? "active" : ""} onClick={() => this.pushToDelivery()}>
                      <span className="nav-ico">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="26"
                          height="16"
                          viewBox="0 0 26 16"
                        >
                          <defs>
                            <path
                              id="desga"
                              d="M646.313 80c0 1.103-.912 2-2.032 2s-2.031-.897-2.031-2 .911-2 2.031-2 2.032.897 2.032 2zm-1.434 0a.593.593 0 0 0-.598-.588.593.593 0 0 0-.597.588c0 .324.268.588.597.588.33 0 .598-.264.598-.588zM639 79.096V66.504c0-.278.226-.504.506-.504h14.425c.28 0 .507.226.507.504v12.592a.505.505 0 0 1-.507.504h-6.357a.504.504 0 0 1-.504-.427c-.2-1.514-1.413-2.454-2.882-2.454-1.468 0-2.682.94-2.881 2.454a.504.504 0 0 1-.505.427h-1.296a.505.505 0 0 1-.506-.504zm21.715-10.51l4.166 5.08A.526.526 0 0 1 665 74v5.08c0 .287-.229.52-.51.52h-.542a.512.512 0 0 1-.51-.441c-.2-1.567-1.425-2.538-2.906-2.538-1.482 0-2.707.971-2.908 2.538a.512.512 0 0 1-.51.441h-.54a.516.516 0 0 1-.511-.52V68.92c0-.287.228-.52.51-.52h3.75c.152 0 .295.069.392.187zm-3.12 4.502h4.377c.433 0 .67-.515.392-.854l-2.127-2.605a.507.507 0 0 0-.393-.187h-2.25a.516.516 0 0 0-.51.52v2.605c0 .288.228.521.51.521zM662.562 80c0 1.103-.911 2-2.03 2-1.12 0-2.032-.897-2.032-2s.911-2 2.031-2 2.032.897 2.032 2zm-1.433 0a.593.593 0 0 0-.598-.588.593.593 0 0 0-.597.588c0 .324.268.588.597.588.33 0 .598-.264.598-.588z"
                            />
                          </defs>
                          <g>
                            <g transform="translate(-639 -66)">
                              <use fill="#636363" xlinkHref="#desga" />
                            </g>
                          </g>
                        </svg>
                      </span>
                      Delivery
                    </a>
                  </li>

                  <li>
                    <a className={routing().order === path ? "active" : ""} onClick={() => pushDeliveryData({ push: history.push })}>
                      <span className="nav-ico">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                        >
                          <defs>
                            <path
                              id="dbvba"
                              d="M828 70.571v10.286c0 .572-.55 1.143-1.1 1.143h-19.8c-.55 0-1.1-.571-1.1-1.143V70.571zm0-3.428v2.032h-22v-2.032c0-.572.55-1.143 1.1-1.143h19.8c.55 0 1.1.571 1.1 1.143z"
                            />
                          </defs>
                          <g>
                            <g transform="translate(-806 -66)">
                              <use fill="#636363" xlinkHref="#dbvba" />
                            </g>
                          </g>
                        </svg>
                      </span>
                      Payment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={
                        path.indexOf("checkout/success") !== -1 ||
                        path.indexOf("checkout/failure") !== -1
                          ? "active"
                          : ""
                      }
                    >
                      <span className="nav-ico">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <defs>
                            <path
                              id="jvo2a"
                              d="M976.132 72.774l1.799 1.796 3.94-3.931 1.395 1.392-3.938 3.931-1.397 1.393-1.394-1.393-1.8-1.796zm8.525 6.883a7.999 7.999 0 0 0 0-11.314 7.999 7.999 0 0 0-11.314 0 7.999 7.999 0 0 0 0 11.314c3.125 3.124 8.192 3.124 11.314 0z"
                            />
                          </defs>
                          <g>
                            <g transform="translate(-971 -66)">
                              <use fill="#636363" xlinkHref="#jvo2a" />
                            </g>
                          </g>
                        </svg>
                      </span>
                      Confirmation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state, props) => ({
  cartCount: selectors.count(state),
  isMobile: deviceSelector(state),
  state: state,
  ...props
});

const mapDispatchToProps = {
  allowDeliveryRoute,
  pushDeliveryData,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CheckoutHeaderMenu);
