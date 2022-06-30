import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import CartSvg from "../../../img/jsSvg/CartSvg";

export default class CheckoutServicesHeaderMenu extends React.Component {
    render() {
        const { path } = this.props;

        return (
            <header className="header ">
                <div className="container">
                    <div className="header-container">
                        <Link to={routing().root} className="theme-logo" />
                        <div className="nav-box nav-box--cart">
                            <div className="nav-box__inner">
                                <ul className="theme-nav theme-nav--cart">
                                    <li className="">
                                        <a className={routing().cartServices === path ? "active" : ""}>
                      <span className="nav-ico">
                        <CartSvg height="16px" />
                      </span>
                                            Cart
                                        </a>
                                    </li>


                                    <li>
                                        <a className={routing().servicesOrder === path ? "active" : ""}>
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
