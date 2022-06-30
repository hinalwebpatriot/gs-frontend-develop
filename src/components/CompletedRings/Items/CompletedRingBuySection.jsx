import React from "react";
import localeStore from "../../../config/LocalesStore";
import { addToCartCompetedRing } from "../../Checkout/Cart/CartActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import GoogleEE from '../../_common/GoogleEE/GoogleEE';
import fedex from '../../../img/new_icons/PNG/fedex.jpg';

const CompletedRingBuySection = ({
  data,
  diamond,
  setting,
  addToCartCompetedRing
}) => (
  <div className="col-lg-6">
    <div className="complete-total">
      <p className="complete-total__item">
        The total diamond carat weight of your ring is {data.total_carat} Ct.
      </p>
      <div className="complete-total__price">
        Total:{" "}
        <span className="table-price">
          {data.price && localeStore.formatPrice(data.price)}
        </span>{" "}
        {localeStore.taxString}
      </div>
      <button
        className="theme-btn theme-btn--type2"
        onClick={() => {
          addToCartCompetedRing({
            diamondId: diamond.id,
            settingId: setting.id,
            ringSize: setting.selected_size.slug
          });

          GoogleEE.addToCart({
            products: [diamond, setting],
            quantity: 1
          })
        }
        }
      >
        Add to cart
      </button>
    </div>
    <div className="row">
      <div className="col-lg-8">
        <div className="complete-include order-include-wrap">
          <p className="medium-title">Your order includes</p>
          <div className="order-include-block">
            <ul className="info-list">
              <li className="list-item list-item--type2">
                <span className="list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                  >
                    <defs>
                      <path
                        id="3ccea"
                        d="M994 707.32v5.362h-7.419v-5.362h-1.162v5.362H978v-5.362h3.03a2.25 2.25 0 0 1-.27-1.073c0-1.239.998-2.247 2.224-2.247.908 0 1.836.473 2.548 1.3.176.203.332.423.468.652.136-.23.292-.449.468-.653.712-.826 1.64-1.299 2.548-1.299 1.226 0 2.225 1.008 2.225 2.247 0 .388-.099.754-.271 1.073zm-11.016 0h2.35c-.292-1.057-1.295-2.146-2.35-2.146-.585 0-1.062.481-1.062 1.073s.477 1.073 1.062 1.073zm7.094-1.073c0-.592-.477-1.073-1.062-1.073-1.055 0-2.058 1.09-2.35 2.146h2.35c.585 0 1.062-.481 1.062-1.073zm-11.034 7.609h6.375V722h-6.375zm7.537 0h6.375V722h-6.375z"
                      />
                    </defs>
                    <g>
                      <g transform="translate(-978 -704)">
                        <use fill="#ef4056" xlinkHref="#3ccea" />
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="list-text">Quality Packaging</span>
              </li>
              <li className="list-item list-item--type2">
                <span className="list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                  >
                    <defs>
                      <path
                        id="qs26a"
                        d="M991.49 761.452h-1.91v1.982zm-.648-2.427a.45.45 0 0 0 .448-.452.45.45 0 0 0-.448-.453h-9.73a.45.45 0 0 0-.449.453c0 .25.2.452.448.452zm-10.04-2.556l2.173.301a.45.45 0 0 0 .51-.438l.005-.25 1.556-.244a.455.455 0 0 0 .366-.559l-.63-2.48a2.563 2.563 0 0 0-1.845-4.33c-1.316 0-2.43 1.036-2.537 2.358a2.57 2.57 0 0 0 .682 1.962l-.658 3.138a.455.455 0 0 0 .378.542zm5.578-2.845c0 .25.2.453.448.453h4.014a.45.45 0 0 0 .448-.453.45.45 0 0 0-.448-.452h-4.014a.45.45 0 0 0-.448.452zm0-1.928c0 .247.2.448.448.448h4.014a.448.448 0 1 0 0-.895h-4.014c-.247 0-.448.2-.448.447zm0-1.923c0 .247.2.448.448.448h4.014a.448.448 0 1 0 0-.896h-4.014c-.247 0-.448.2-.448.448zm6.62-2.32V761.007a.456.456 0 0 1-.008.078l-.002.008a.447.447 0 0 1-.02.067l-.01.022a.451.451 0 0 1-.026.051l-.012.02a.454.454 0 0 1-.049.062l-3.42 3.548a.45.45 0 0 1-.07.059c-.01.008-.023.013-.035.02l-.043.023c-.014.006-.03.01-.044.014-.014.004-.027.01-.04.012a.445.445 0 0 1-.082.008l-.007.001h-9.684a.45.45 0 0 1-.448-.453v-17.094c0-.25.2-.453.448-.453h13.104a.45.45 0 0 1 .448.453zm-9.008 5.918l.42 1.658-.907.143.037-1.64c.156-.04.306-.094.45-.16zm-1.347.218l-.039 1.686v.005l-.012.534-1.194-.166.476-2.275c.237.11.496.185.769.216zm-1.352-2.686a1.661 1.661 0 0 1 1.774-1.524 1.66 1.66 0 0 1 1.508 1.793 1.661 1.661 0 0 1-1.774 1.524 1.66 1.66 0 0 1-1.508-1.793z"
                      />
                    </defs>
                    <g>
                      <g transform="translate(-979 -747)">
                        <use fill="#ef4056" xlinkHref="#qs26a" />
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="list-text">Diamond Certificate</span>
              </li>
              <li className="list-item list-item--type2">
                <Link to={routing().freeShipping} className="d-flex">
                  <span className="list-icon">
                    <img src={fedex} />
                  </span>
                  <span className="list-text">Free FedEx delivery</span>
                </Link>
              </li>
              <li className="list-item list-item--type2">
                <span className="list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                  >
                    <defs>
                      <path
                        id="2gz6a"
                        d="M991.174 836.771h-5.852V833h3.13c.338 0 .652.18.82.468zM984.266 833v3.771h-5.873l1.885-3.302a.953.953 0 0 1 .821-.469zm7.281 4.826v4.711a5.06 5.06 0 0 0-1.303-.17c-2.77 0-5.024 1.986-5.024 4.73 0 .444.06.874.17 1.284h-6.074a1.31 1.31 0 0 1-1.316-1.303v-9.252zm3.288 9.457l-.997.94a.531.531 0 0 1-.277.138.533.533 0 0 1-.126.01l-.03-.002-.014-.002a.537.537 0 0 1-.04-.006h-.002l-.011-.003a.525.525 0 0 1-.038-.01l-.017-.006a.521.521 0 0 1-.03-.01l-.02-.01a.52.52 0 0 1-.049-.025l-.021-.013a.54.54 0 0 1-.065-.049l-.01-.01-.971-.914a.524.524 0 0 1-.019-.746.536.536 0 0 1 .753-.018l.085.08a2.857 2.857 0 0 0-2.242-2.236 2.871 2.871 0 0 0-2.154.415 2.82 2.82 0 0 0-1.226 1.802c-.153.743-.004 1.5.42 2.133a2.85 2.85 0 0 0 1.819 1.215.528.528 0 1 1-.212 1.033 3.908 3.908 0 0 1-2.496-1.665 3.837 3.837 0 0 1-.575-2.926 3.867 3.867 0 0 1 1.682-2.47 3.938 3.938 0 0 1 2.954-.57 3.917 3.917 0 0 1 3.107 3.244l.087-.082c.213-.201.55-.193.753.018a.524.524 0 0 1-.018.745z"
                      />
                    </defs>
                    <g>
                      <g transform="translate(-978 -833)">
                        <use fill="#ef4056" xlinkHref="#2gz6a" />
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="list-text">30 day money back guarantee</span>
              </li>
              <li className="list-item list-item--type2">
                <span className="list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                  >
                    <defs>
                      <path
                        id="abija"
                        d="M986 881.558c2.96 0 5.368 2.422 5.368 5.4 0 2.977-2.408 5.4-5.368 5.4-2.96 0-5.368-2.422-5.368-5.4s2.408-5.4 5.368-5.4zM986 894c3.86 0 7-3.159 7-7.042a7.04 7.04 0 0 0-5.67-6.91l.13-.046a.542.542 0 0 0 .255-.214l1.319-2.36a.15.15 0 0 0-.08-.22l-3.025-1.15a7.885 7.885 0 0 1-.126-.05l-.016-.006a.051.051 0 0 0-.03 0l-.016.006-.126.049-3.026 1.151a.15.15 0 0 0-.08.22l1.32 2.364a.54.54 0 0 0 .254.214l.305.106a7.041 7.041 0 0 0-5.388 6.846c0 3.883 3.14 7.042 7 7.042z"
                      />
                    </defs>
                    <g>
                      <g transform="translate(-979 -876)">
                        <use fill="#ef4056" xlinkHref="#abija" />
                      </g>
                    </g>
                  </svg>{" "}
                </span>
                <span className="list-text">Ring Engravings</span>
              </li>
              <li className="list-item list-item--type2">
                <span className="list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                  >
                    <defs>
                      <path
                        id="oagma"
                        d="M993 921.311v2.833h-2.783v-1.066h.98a7.697 7.697 0 0 0-10.7.305l-.372.379-.74-.753.369-.375a8.723 8.723 0 0 1 12.197-.29v-1.033zm-1.125 12.924l.74.753-.372.378a8.723 8.723 0 0 1-12.197.29v1.033H979v-2.836h2.783v1.065h-.98a7.697 7.697 0 0 0 10.7-.305zm-10.96-5.239c0-1.366.522-2.612 1.373-3.537a5.031 5.031 0 0 1 3.71-1.639c2.809 0 5.084 2.322 5.084 5.18 0 2.862-2.279 5.18-5.084 5.18-2.805 0-5.084-2.318-5.084-5.184zm3.493 2.447c.27.136.563.206.862.253.23.037.238.048.241.294 0 .11.004.224.004.334 0 .14.069.22.21.225.158.003.32.003.482 0 .134-.004.202-.078.202-.213 0-.155.007-.305 0-.46-.007-.154.058-.235.206-.275.335-.096.623-.28.847-.555.613-.76.379-1.873-.494-2.366-.274-.154-.562-.271-.85-.393a1.9 1.9 0 0 1-.466-.268c-.278-.228-.223-.595.101-.738a.794.794 0 0 1 .288-.059c.375-.022.732.048 1.075.217.17.084.223.059.281-.121.061-.191.112-.386.166-.577.036-.129-.01-.213-.13-.268a2.586 2.586 0 0 0-.678-.206c-.31-.048-.31-.048-.31-.364-.003-.444-.003-.444-.44-.444-.064 0-.126-.004-.19 0-.206.007-.242.044-.246.253v.283c0 .28-.003.276-.263.371-.635.235-1.024.672-1.067 1.378-.04.62.281 1.043.782 1.348.307.19.65.301.977.448.126.055.249.121.357.213.317.268.26.709-.115.874a1.18 1.18 0 0 1-.628.085 2.755 2.755 0 0 1-.955-.294c-.177-.096-.227-.07-.288.125-.055.165-.098.338-.145.507-.061.228-.04.283.184.393z"
                      />
                    </defs>
                    <g>
                      <g transform="translate(-979 -920)">
                        <use fill="#ef4056" xlinkHref="#oagma" />
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="list-text">
                  100% Refund
                  {/*<span className="list-describe">*/}
                    {/*Lorem Ipsum is simply dummy text of the printing and*/}
                    {/*typesetting industry. Lorem Ipsum is simply dummy text of*/}
                    {/*the printing and typesetting industry.*/}
                  {/*</span>*/}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// const mapStateToProps = (state) => {
//   return state.engraving;
// };

const mapDispatchToProps = {
  addToCartCompetedRing
};

export default connect(
  null,
  mapDispatchToProps
)(CompletedRingBuySection);
