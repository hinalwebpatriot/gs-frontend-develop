import React from "react";
import CustomTooltip from "../../../_common/CustomTooltip";
import buy1 from "../../../../img/svg/buy-opt1.svg";
import buy2 from "../../../../img/svg/buy-opt2.svg";
import buy3 from "../../../../img/svg/buy-opt3.svg";
import buy4 from "../../../../img/svg/buy-opt4.svg";
import buy5 from "../../../../img/svg/buy-opt5.svg";
import buy6 from "../../../../img/svg/buy-opt6.svg";
import { Link } from 'react-router-dom';
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../../_common/IconFA';
import routing from '../../../../config/routing';

const CartBuyOptions = () => (
  <div className="buy-options row">
    <div className="col-lg-4">
      <div className="buy-option">
        <div className="buy-option__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="32"
            viewBox="0 0 109.8 139.9"
          >
            <g>
              <path
                className="cls-1"
                d="M56.3,72.6c-0.8,0-2.1,0-2.8,0c-3.1,0.2-6,1.3-8.5,3.2C38,81,36.6,91,41.9,98v16c0,4.9,3.9,8.8,8.8,8.8h8.5   c4.8,0,8.8-3.9,8.8-8.8V98c1.8-2.5,2.9-5.4,3.2-8.5C71.7,80.8,65.1,73.2,56.3,72.6z M59.5,92.5L57.9,94v18.8h-6V94l-1.5-1.5   c-0.9-0.9-1.5-2.2-1.6-3.5c-0.4-3.2,2-6.1,5.2-6.5c0.5,0,1.5,0,2,0c1.3,0.1,2.5,0.7,3.4,1.6C61.7,86.5,61.8,90.2,59.5,92.5z"
              />
              <path
                className="cls-1"
                d="M100.2,52.8v-7.1c0-24.7-19.7-45.2-44-45.6c-0.6,0-1.9,0-2.5,0c-24.3,0.4-44,20.9-44,45.6v7.1   C4.1,54.1,0,59.7,0,66.5v59.4c0,7.7,5.4,14,12.1,14h85.7c6.7,0,12.1-6.3,12-14V66.5C109.8,59.8,105.7,54.1,100.2,52.8z M99.8,125.9   c0,2.4-1.4,4-2.1,4H12.1c-0.7,0-2.1-1.5-2.1-4V66.5c0-2.5,1.3-4,2.1-4h7.5V45.6C19.6,26.3,35,10.3,53.8,10H56   c18.9,0.3,34.2,16.3,34.2,35.6v16.8h7.5c0.7,0,2.1,1.5,2.1,4V125.9z"
              />
              <path
                className="cls-1"
                d="M54.4,16.4C38.6,16.7,26,29.8,26.3,45.6v16.8h57.3V45.6c0-0.4,0-0.7,0-1.1C83.3,28.7,70.2,16.2,54.4,16.4z    M73.5,52.5H36.3v-6.8c0-0.3,0-0.6,0-0.9c0.2-10.3,8.8-18.4,19.1-18.2s18.4,8.8,18.2,19.1V52.5z"
              />
            </g>
          </svg>
        </div>
        <div className="buy-info buy-option__info">
          <p className="d-felx align-items-center buy-info__title">
            Secure Shopping
            <CustomTooltip path="checkout.secureShopping" />
          </p>
          <p className="buy-info__text">
            We use the latest SSL security technology to encrypt all personal
            information.
          </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="buy-option">
        <div className="buy-option__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="39"
            height="30"
            viewBox="0 0 141 94"
          >
            <g>
              <path
                className="cls-1"
                d="M126.3,0H14.7c0,0,0,0,0,0C6.6,0,0,6.6,0,14.7v5.9v17.6v41.1C0,87.4,6.6,94,14.7,94h111.6   c8.1,0,14.7-6.6,14.7-14.7V38.2V20.6v-5.9C141,6.6,134.4,0,126.3,0z M14.7,5.9h111.6c4.9,0,8.8,3.9,8.8,8.8v2.9H5.9v-2.9   C5.9,9.9,9.8,5.9,14.7,5.9z M126.3,88.2H14.7c-4.9,0-8.8-3.9-8.8-8.8V41.2h129.3v38.2C135.1,84.2,131.2,88.2,126.3,88.2z"
              />
              <path
                className="cls-1"
                d="M55.8,58.8H20.6c-0.1,0-0.2,0-0.3,0c-1.6,0.1-2.9,1.5-2.8,3.1c0.1,1.6,1.5,2.9,3.1,2.8h35.3c0.1,0,0.2,0,0.3,0   c1.6-0.1,2.9-1.5,2.8-3.1C58.8,59.9,57.4,58.7,55.8,58.8z"
              />
              <path
                className="cls-1"
                d="M55.8,70.5H20.6c-0.1,0-0.2,0-0.3,0c-1.6,0.1-2.9,1.5-2.8,3.1c0.1,1.6,1.5,2.9,3.1,2.8h35.3c0.1,0,0.2,0,0.3,0   c1.6-0.1,2.9-1.5,2.8-3.1C58.8,71.7,57.4,70.4,55.8,70.5z"
              />
              <path
                className="cls-1"
                d="M114.6,52.9h-5.9c-4.9,0-8.8,3.9-8.8,8.8v5.9c0,4.9,4,8.8,8.8,8.8h5.9c4.9,0,8.8-3.9,8.8-8.8v-5.9   C123.4,56.9,119.4,52.9,114.6,52.9z M117.5,67.6c0,1.6-1.3,2.9-2.9,2.9h-5.9c-1.6,0-2.9-1.3-2.9-2.9v-5.9c0-1.6,1.3-2.9,2.9-2.9   h5.9c1.6,0,2.9,1.3,2.9,2.9V67.6z"
              />
            </g>
          </svg>
        </div>
        <div className="buy-info buy-option__info">
          <p className="d-felx align-items-center buy-info__title">
            Payment Options
            <CustomTooltip path="checkout.paymentOptions" />
          </p>
          <p className="buy-info__text">
            We accept all major credit and debit cards:
          </p>
        </div>
      </div>
      <div className="d-flex payment buy-info__payment">
        <div className="payment__item">
          <img src={buy1} alt="" />
        </div>
        <div className="payment__item">
          <img src={buy2} alt="" />
        </div>
        <div className="payment__item">
          <img src={buy3} alt="" />
        </div>
        <div className="payment__item">
          <img src={buy4} alt="" />
        </div>
        <div className="payment__item">
          <img src={buy5} alt="" />
        </div>
        <div className="payment__item">
          <img src={buy6} alt="" />
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="buy-option">
        <div className="buy-option__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="32"
            height="30"
            viewBox="0 0 132.9 132.8"
          >
            <path
              className="cls-1"
              d="M128.5,42.8C118.7,17.1,94.1,0,66.5,0c-17,0.1-33.4,6.7-45.7,18.4v-5.9c0-4-3.3-7.2-7.3-7.2H7.3  c-4,0-7.3,3.2-7.3,7.2v36.2c0,4,3.3,7.3,7.3,7.3h36.3c4,0,7.3-3.3,7.3-7.3c0,0,0,0,0,0v-6.1c0-4-3.2-7.2-7.2-7.3c0,0,0,0,0,0H33.1  c17.2-18.4,46.1-19.4,64.5-2.3C116,50.2,117,79.1,99.8,97.6C82.6,116,53.8,117,35.3,99.8c-5.1-4.8-9.1-10.6-11.5-17.2  c-2.2-5.3-8.2-7.8-13.5-5.7c-5.1,2.1-7.7,7.8-5.9,13c13,34.3,51.4,51.5,85.7,38.5C124.3,115.5,141.6,77.1,128.5,42.8z"
            />
          </svg>
        </div>
        <div className="buy-info buy-option__info">
          <p className="d-felx align-items-center buy-info__title">
            Returns <span className="default-font">&</span> Refunds
            <CustomTooltip path="checkout.refunds" />
          </p>
          <p className="buy-info__text">Within 30 days.</p>
          <Link to={routing().moneyBack} className="product-more">
            Read more{" "}
            <span>
              {" "}
              <IconFA icon={faCaretRight}/>
            </span>
          </Link>
          {/*<p className="buy-info__refund">*/}
            {/*Refund. Read our*/}
            {/*<a href="#">365 day returns policy</a>*/}
          {/*</p>*/}
        </div>
      </div>
    </div>
  </div>
);

export default CartBuyOptions;
