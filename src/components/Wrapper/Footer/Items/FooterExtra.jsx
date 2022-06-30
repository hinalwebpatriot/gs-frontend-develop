import React, { Fragment } from 'react';
import SvgSwitcher from "../../../_common/SvgSwitcher";
import { ReactSVG } from 'react-svg';

import cert1 from "../../../../img/icons/Certifications/Default/GIA@2x.png";
import cert1_hover from "../../../../img/icons/Certifications/Hover/Gia.png";

import cert2 from "../../../../img/icons/Certifications/Default/NCAJV@2x.png";
import cert2_hover from "../../../../img/icons/Certifications/Hover/NCAJV.png";

import cert3 from "../../../../img/icons/Certifications/Default/JAA_black.svg";
import cert3_hover from "../../../../img/icons/Certifications/Hover/JAA.svg";

import cert4 from "../../../../img/icons/Certifications/Default/GAA@2x.png";
import cert4_hover from "../../../../img/icons/Certifications/Hover/GAA.png";

const CertificateButtons = () => (
  <>
    <span className="f-img__item certification gia">
      <SvgSwitcher link={cert1} hoverLink={cert1_hover} alt="Сertificate 1" />
    </span>
    <span className="f-img__item certification certification-2">
      <SvgSwitcher link={cert2} hoverLink={cert2_hover} alt="Сertificate 2"/>
    </span>
    <span className="f-img__item certification jaa">
      <SvgSwitcher link={cert3} hoverLink={cert3_hover} alt="Сertificate 3"/>
    </span>
    <span className="f-img__item certification certification-4">
      <SvgSwitcher link={cert4} hoverLink={cert4_hover} alt="Сertificate 4"/>
    </span>
  </>
)

const PaymentButtons = () => (
  <>
    <span className="f-img__item paypal">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="22" viewBox="0 0 90 22"><g fill="none" fillRule="evenodd"><path d="M33.54 4.79h-4.96a.69.69 0 00-.69.57l-2 12.44a.4.4 0 00.4.47h2.38c.34 0 .63-.24.68-.57l.54-3.36a.68.68 0 01.68-.57h1.57c3.27 0 5.16-1.54 5.65-4.6.22-1.35.01-2.4-.63-3.14-.7-.81-1.96-1.24-3.62-1.24zm.57 4.55c-.27 1.74-1.63 1.74-2.95 1.74h-.74l.52-3.26a.4.4 0 01.41-.34h.34c.9 0 1.75 0 2.18.5.26.3.34.74.24 1.36zm14.27-.06H46c-.2 0-.38.14-.4.34l-.11.65-.17-.24c-.51-.73-1.66-.97-2.8-.97a5.42 5.42 0 00-5.31 4.67c-.23 1.37.1 2.67.88 3.57.73.84 1.76 1.19 3 1.19 2.11 0 3.29-1.33 3.29-1.33l-.11.64a.4.4 0 00.4.47h2.15c.34 0 .63-.24.68-.57l1.29-7.95a.4.4 0 00-.41-.47zm-3.32 4.52a2.63 2.63 0 01-2.68 2.22c-.69 0-1.24-.21-1.6-.62-.34-.41-.48-1-.37-1.64a2.64 2.64 0 012.67-2.23c.67 0 1.22.21 1.58.63a2 2 0 01.4 1.64z" fill="#636363" fillRule="nonzero"/><path d="M61.04 9.28h-2.4a.7.7 0 00-.56.3l-3.3 4.74-1.4-4.56a.69.69 0 00-.66-.48h-2.34a.4.4 0 00-.4.53l2.64 7.55-2.48 3.42a.4.4 0 00.34.64h2.39a.7.7 0 00.56-.3l7.95-11.2a.4.4 0 00-.34-.64z" fill="#636363"/><path d="M68.95 4.79h-4.97a.68.68 0 00-.68.57l-2 12.44a.4.4 0 00.4.47h2.55c.23 0 .44-.17.47-.4l.57-3.53a.68.68 0 01.69-.57h1.57c3.27 0 5.15-1.54 5.65-4.6.22-1.35 0-2.4-.64-3.14-.7-.81-1.95-1.24-3.61-1.24zm.57 4.55c-.27 1.74-1.63 1.74-2.95 1.74h-.75l.53-3.26a.4.4 0 01.4-.34h.35c.9 0 1.74 0 2.18.5.26.3.34.74.24 1.36zm14.26-.06h-2.37a.4.4 0 00-.41.34l-.1.65-.17-.24c-.52-.73-1.66-.97-2.81-.97a5.42 5.42 0 00-5.3 4.67 4.29 4.29 0 00.88 3.57c.72.84 1.76 1.19 3 1.19 2.1 0 3.28-1.33 3.28-1.33l-.1.64a.4.4 0 00.4.47h2.15c.34 0 .62-.24.68-.57l1.28-7.95a.4.4 0 00-.4-.47zm-3.31 4.52a2.63 2.63 0 01-2.68 2.22c-.7 0-1.24-.21-1.6-.62-.35-.41-.48-1-.37-1.64a2.64 2.64 0 012.66-2.23c.68 0 1.23.21 1.59.63a2 2 0 01.4 1.64z" fill="#A9A9A9" fillRule="nonzero"/><path d="M86.59 5.13L84.55 17.8a.4.4 0 00.4.47H87a.7.7 0 00.69-.57l2-12.44a.4.4 0 00-.4-.47h-2.3a.4.4 0 00-.4.34z" fill="#A9A9A9"/><path d="M5.27 20.69l.38-2.36-.84-.02H.77L3.57.91A.23.23 0 013.8.74h6.81c2.26 0 3.82.46 4.64 1.36.38.43.62.88.74 1.36a4.8 4.8 0 010 1.88v.54l.38.2c.32.17.57.36.77.58.33.37.54.83.63 1.38a5.6 5.6 0 01-.1 2 6.93 6.93 0 01-.83 2.25 4.73 4.73 0 01-3.11 2.21 8.9 8.9 0 01-2.23.25h-.53c-.38 0-.74.13-1.03.37-.3.25-.48.58-.54.95l-.04.2-.67 4.16-.03.16a.2.2 0 01-.05.09.11.11 0 01-.07.02H5.27z" fill="#253B80"/><path d="M16.73 5.44l-.07.4c-.9 4.5-3.97 6.06-7.9 6.06h-2a.96.96 0 00-.95.8l-1.02 6.34-.3 1.8c-.04.3.2.58.51.58h3.54c.42 0 .78-.3.85-.7l.03-.18.67-4.14.04-.23c.07-.4.42-.7.84-.7h.53c3.44 0 6.12-1.37 6.9-5.3.34-1.66.17-3.03-.7-4-.26-.29-.6-.53-.97-.73z" fill="#A9A9A9"/><path d="M15.79 5.07a7.21 7.21 0 00-.87-.18c-.54-.09-1.13-.13-1.76-.13H7.82a.86.86 0 00-.37.08.83.83 0 00-.47.62L5.84 12.5l-.03.2c.07-.45.48-.8.96-.8h2c3.92 0 7-1.55 7.89-6.06l.07-.39a4.85 4.85 0 00-.94-.37z" fill="#636363"/><path d="M6.98 5.46c.04-.28.23-.5.47-.62a.87.87 0 01.37-.08h5.34a11.34 11.34 0 012.63.32l.2.06c.27.08.51.18.74.3.27-1.66 0-2.8-.92-3.83C14.79.48 12.96 0 10.6 0H3.8a.97.97 0 00-.97.8L.01 18.38c-.06.35.22.66.57.66h4.2l1.06-6.55 1.14-7.03z" fill="#636363"/></g></svg>
    </span>
    <span className="f-img__item humm">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1292.5 217.8" style={{enableBackground:"new 0 0 1292.5 217.8"}} xmlSpace="preserve"> <g> <path className="st0" d="M1064.1,209.6c-353.3,0-706.7,0-1060,0c0-67,0-134,0-201c33.7,0,67.3,0,101,0c-1.2,0.4-2.5,0.9-3.8,1.1 c-20.2,2.7-38.1,10.6-52.9,24.6c-5.6,5.3-11.9,7.8-19.1,8.4c-7.6,0.7-15.3,0.9-23.1,1.4c2.5,4.1,5.1,8,7.2,12.1 c5,9.7,7.9,19.5,5.4,31c-2,9.6-2.3,20-1.1,29.8c5.8,48.3,47.1,84.4,95.7,84.4c30.2,0,60.3,0,90.5,0c1.8,0,3.5,0,5.9,0 c0-2.4,0-4.2,0-6c0-18.3-0.1-36.7,0.1-55c0-2.7,1.2-5.9,2.9-7.9c24-28.6,29.4-60.2,15.5-94.9c-3.3-8.3-8-15.9-14.8-23 c-6.5,6.6-12.6,13-18.8,19.2c-24.1,24.1-48.2,48.2-72.3,72.4c-2,2-4.3,3.7-6.9,1.2c-2.7-2.6-1.4-4.9,0.9-7.2 c7.7-7.6,15.3-15.3,23-22.9c13.5-13.5,27-27,40.8-40.8c-9.8-10-21.1-17.2-34-21.5c-8.5-2.8-17.3-4.3-26-6.4c388,0,776,0,1164,0 c0,31.3,0,62.7,0,94c-0.7-4.4-1.5-8.8-2.2-13.2c-2.8-18.1-8.1-35.3-19.4-50.1c-18.9-24.8-55-30.3-79.7-12.1 c-13.7,10.1-21.7,24.1-26.6,40c-10.4,33.7-9.8,67.2,3.3,100c6.7,16.8,17.4,30.6,34.9,37.7c5,2,10.4,3.1,15.6,4.7 c-47.3,0-94.7,0-142,0c1.3-0.3,2.6-0.7,3.9-0.9c26.9-2.5,43.1-18.4,52.9-42.3c8.9-21.9,10.2-45,8.8-68.2 c-1-16.8-4.6-33.2-12.1-48.5c-18.1-37-58.9-40.8-86.3-24.6c-26.1,15.5-33.1,45.3-23.7,72.6c10,29,39,38.2,65.9,33.8 c18.2-2.9,32.4-13.2,44-27.3c1-1.2,2-2.4,3.1-3.7c0.6,0.7,0.9,1,1,1.2c0.2,0.8,0.4,1.6,0.4,2.4c0,21.6-1.7,42.8-10.4,63 c-14.4,33.5-45.5,40.4-72,28.9c-7.7-3.4-13.8-10.4-21.1-16.1c-0.8,0.8-2.7,2.4-4.6,4.1c5.8,8.1,12.1,15.1,21,18.5 C1046.9,205.7,1055.6,207.3,1064.1,209.6z M637.3,201.8c12.7,0,24.6-0.2,36.4,0.1c4.9,0.2,6.2-1.4,6.1-6.2c-0.2-25.3,0-50.7-0.2-76 c0-4,0.9-7.3,4.2-9.5c4.1-2.7,8.3-6,12.9-7.3c12.7-3.6,26.3,0.2,25.7,18.3c-0.8,24.6-0.2,49.3-0.2,74c0,1.9,0,3.9,0,6.2 c2.4,0.1,4.2,0.3,5.9,0.3c10.2,0,20.3-0.2,30.5,0.1c5,0.2,6.1-1.7,6.1-6.3c-0.2-25.8-0.2-51.7-0.1-77.5c0-1.8,0.5-4.1,1.7-5.4 c5.6-6.6,12.8-10.5,21.6-10.9c8.7-0.5,15.5,3.4,17.7,10.7c1,3.3,1,6.9,1.1,10.4c0.1,24.5,0.1,49-0.1,73.5c0,4.5,1.4,5.7,5.7,5.6 c10.8-0.2,21.7,0,32.5,0c1.3,0,2.5-0.4,4-0.7c0-2.1,0-3.9,0-5.8c0-24,0.4-48-0.2-72c-0.2-8.6,3.5-13.4,9.9-17.3 c8.1-4.9,16.9-6.5,25.6-1.9c8.1,4.2,7.8,12.5,8,20.2c0.1,2,0,4,0,6c0,21.7,0,43.3,0,65c0,1.9,0,3.9,0,6.3c13.5,0,26.3,0.1,39.1-0.2 c0.9,0,2.4-2.4,2.4-3.7c0.1-32.3,0.5-64.7-0.1-97c-0.3-14.9-6.4-27.1-21.4-32.9c-20-7.8-46.3-0.9-61,15.9c-1.2,1.4-2.5,2.8-3.1,3.5 c-5-5.5-8.7-11.8-14.2-15.5c-15.7-10.5-32.6-9-49-1.7c-6.8,3-13,7.7-19.6,11.8c-4.4-7.1-10.5-12.6-18.7-15.3 c-20.6-6.6-39.3-1.9-56.6,10.1c-4.4,3.1-8.1,7.3-12.1,10.9c-0.1,0-0.4,0-0.4-0.1c-0.5-0.8-1.1-1.7-1.5-2.5 c-3.8-7.5-9.1-13.5-17.2-16.6c-20.2-7.7-38.5-3.1-55.6,8.7c-2.6,1.8-5,4-8.4,6.8c0-4.8-0.1-8.4,0-12c0.1-3-1-4.1-4.1-4 c-11.2,0.1-22.3,0.1-33.5-0.1c-3.6-0.1-4.9,1.1-4.9,4.9c0.1,41.5,0.1,83,0,124.5c0,3.9,1.5,4.8,5,4.7c10.3-0.2,20.7-0.1,31-0.1 c2.1,0,4.1,0,6.5,0c0-2.6,0-4.4,0-6.2c0-24.3,0.3-48.7-0.2-73c-0.2-7.5,3-11.9,8.5-15.5c2.3-1.5,4.9-2.9,7.6-3.7 c13.1-3.9,27.1-0.5,26.7,18.6c-0.5,24.7-0.1,49.3-0.1,74C637.3,197.6,637.3,199.4,637.3,201.8z M304.8,201.8c0-2.6,0-4.5,0-6.3 c0-25.3-0.1-50.7,0.1-76c0-2.6,1.4-5.7,3.2-7.7c6.1-7.2,14.5-9.9,23.6-10.1c14.8-0.3,22.2,7.1,22.5,21.9c0,1.2,0,2.3,0,3.5 c0,22.8,0,45.7,0,68.5c0,1.9,0,3.9,0,5.8c14.3,0,27.9,0,41.3,0c0.2-0.8,0.4-1.1,0.4-1.5c0-33.5,0.5-67-0.3-100.5 c-0.3-12.5-6.8-22.8-18.4-28.9c-19.3-10.2-47.9-6.6-65.6,8.4c-1.9,1.6-3.9,3.1-6.9,5.5c0-23.4,0-45.3,0-67.2c-14.2,0-27.8,0-41.6,0 c-0.2,1.6-0.4,2.9-0.4,4.2c0,58.5,0,117-0.1,175.5c0,4.3,1.7,5.3,5.6,5.2c9.5-0.2,19-0.1,28.5-0.1 C299.2,201.8,301.6,201.8,304.8,201.8z M498.2,68.2c0,2.8,0,5,0,7.1c0,25.2,0.1,50.3-0.1,75.5c0,2.5-1.3,5.5-3,7.3 c-7.6,8.6-17.5,10.8-28.6,9.8c-9-0.8-15.2-6-16.7-15c-0.6-3.6-0.8-7.3-0.9-10.9c-0.1-22.7,0-45.3,0-68c0-1.8,0-3.6,0-5.7 c-14.1,0-27.7,0-41.2,0c-0.2,0.9-0.4,1.3-0.4,1.8c0,33-0.3,66,0.1,99c0.2,15.6,9.6,28.2,23.4,32.7c23.2,7.5,44.2,3.4,62.9-12.4 c1.1-0.9,2.4-1.6,4.5-3c0,4.3,0.2,7.2-0.1,10.2c-0.4,4.1,1,5.5,5.2,5.4c10.5-0.3,21-0.1,31.5-0.1c1.6,0,3.2-0.3,4.7-0.4 c0-44.8,0-89,0-133.2C525.8,68.2,512.4,68.2,498.2,68.2z M969.5,69.5C953.6,70,942.9,81,943.2,96.6c0.3,14,12.8,25.3,27.7,24.8 c13.7-0.5,26-12.7,25-28C995.2,80.2,983.1,69.1,969.5,69.5z"/> <path d="M120.1,8.6c8.7,2.1,17.6,3.6,26,6.4c12.9,4.3,24.2,11.4,34,21.5c-13.8,13.8-27.3,27.3-40.8,40.8 c-7.7,7.7-15.2,15.4-23,22.9c-2.4,2.3-3.6,4.6-0.9,7.2c2.6,2.5,4.9,0.8,6.9-1.2c24.1-24.1,48.3-48.2,72.3-72.4 c6.2-6.2,12.3-12.6,18.8-19.2c6.8,7.1,11.4,14.7,14.8,23c14,34.7,8.6,66.3-15.5,94.9c-1.7,2-2.8,5.2-2.9,7.9 c-0.2,18.3-0.1,36.6-0.1,55c0,1.8,0,3.6,0,6c-2.4,0-4.1,0-5.9,0c-30.2,0-60.3,0-90.5,0c-48.6,0-89.9-36.1-95.7-84.4 c-1.2-9.8-0.9-20.2,1.1-29.8c2.5-11.5-0.4-21.3-5.4-31c-2.1-4.1-4.7-8-7.2-12.1c7.7-0.4,15.4-0.6,23.1-1.4 c7.2-0.7,13.6-3.2,19.1-8.4c14.8-14,32.7-21.9,52.9-24.6c1.3-0.2,2.5-0.7,3.8-1.1C110.1,8.6,115.1,8.6,120.1,8.6z M66.8,42 c6,4.5,7.4,7.4,5.2,11c-0.8,1.3-2.4,3.1-3.6,3.1c-3.1,0-6.1-1-9.1-1.6c-0.4,5.6,2.9,10.8,8.6,12.9c6.3,2.2,13.1,0,16.7-5.5 c3.5-5.4,3-12.3-1.2-17C78.8,40.1,72.8,38.9,66.8,42z"/> <path d="M1064.1,209.6c-8.5-2.2-17.1-3.8-25.3-6.9c-8.9-3.4-15.2-10.4-21-18.5c1.9-1.7,3.8-3.3,4.6-4.1 c7.3,5.7,13.4,12.7,21.1,16.1c26.5,11.6,57.6,4.6,72-28.9c8.7-20.2,10.4-41.4,10.4-63c0-0.8-0.2-1.6-0.4-2.4 c-0.1-0.3-0.4-0.5-1-1.2c-1.1,1.3-2.1,2.5-3.1,3.7c-11.6,14.1-25.8,24.3-44,27.3c-26.9,4.3-55.9-4.8-65.9-33.8 c-9.4-27.3-2.4-57.1,23.7-72.6c27.4-16.2,68.2-12.5,86.3,24.6c7.5,15.3,11.1,31.7,12.1,48.5c1.3,23.2,0.1,46.2-8.8,68.2 c-9.7,24-25.9,39.8-52.9,42.3c-1.3,0.1-2.6,0.6-3.9,0.9C1066.7,209.6,1065.4,209.6,1064.1,209.6z M1064.7,125c1,0.1,2,0.2,3,0.2 c1,0,2-0.1,3-0.1c23.4-2.1,40-14.8,52.2-34c1-1.6,1.5-4.2,1.1-6.1c-1.4-7.3-2.6-14.8-5.2-21.7c-11.7-31.3-32-42.2-59.6-38.5 c-39.2,5.3-53.8,48-36,78.9C1032.3,119.3,1047.6,124.3,1064.7,125z"/> <path d="M1210.1,209.6c-5.2-1.5-10.6-2.7-15.6-4.7c-17.5-7-28.2-20.9-34.9-37.7c-13.1-32.8-13.7-66.3-3.3-100 c4.9-15.9,12.9-29.9,26.6-40c24.7-18.2,60.9-12.7,79.7,12.1c11.3,14.8,16.6,32,19.4,50.1c0.7,4.4,1.5,8.8,2.2,13.2 c0,6.7,0,13.3,0,20c-0.4,1.9-0.9,3.9-1.1,5.8c-1.9,17-5.7,33.4-14.2,48.5c-8.8,15.6-21.1,26.8-39,31c-2.2,0.5-4.4,1.2-6.7,1.8 C1218.7,209.6,1214.4,209.6,1210.1,209.6z M1158.9,112.1c0,4.8-0.3,9.7,0.1,14.5c1.4,17.4,5.2,34.2,14.1,49.5 c15.5,26.6,49.2,33.9,73.2,15.6c10.4-7.9,16.6-19,20.7-31.1c9.3-27.4,9.6-55.2,3.7-83.2c-3.2-15.3-9.2-29.7-21-40.6 c-22.9-21.3-60.5-14.9-76.8,13C1161.7,69,1158.7,90.2,1158.9,112.1z"/> <path className="st0" d="M1223.1,209.6c2.2-0.6,4.4-1.2,6.7-1.8c17.9-4.2,30.3-15.4,39-31c8.5-15,12.3-31.5,14.2-48.5 c0.2-2,0.7-3.9,1.1-5.8c0,29,0,58,0,87C1263.7,209.6,1243.4,209.6,1223.1,209.6z"/> <path d="M637.3,201.8c0-2.4,0-4.2,0-6c0-24.7-0.4-49.3,0.1-74c0.4-19-13.6-22.5-26.7-18.6c-2.7,0.8-5.2,2.2-7.6,3.7 c-5.6,3.6-8.7,8-8.5,15.5c0.6,24.3,0.2,48.7,0.2,73c0,1.8,0,3.6,0,6.2c-2.4,0-4.5,0-6.5,0c-10.3,0-20.7,0-31,0.1 c-3.5,0.1-5-0.8-5-4.7c0.1-41.5,0.1-83,0-124.5c0-3.8,1.3-4.9,4.9-4.9c11.2,0.2,22.3,0.2,33.5,0.1c3.1,0,4.2,1.1,4.1,4 c-0.1,3.6,0,7.2,0,12c3.4-2.7,5.7-4.9,8.4-6.8c17.1-11.9,35.4-16.5,55.6-8.7c8.1,3.1,13.3,9.1,17.2,16.6c0.5,0.9,1,1.7,1.5,2.5 c0.1,0.1,0.3,0.1,0.4,0.1c4-3.7,7.6-7.9,12.1-10.9c17.2-12,36-16.6,56.6-10.1c8.3,2.6,14.3,8.2,18.7,15.3 c6.7-4.1,12.8-8.8,19.6-11.8c16.5-7.2,33.3-8.8,49,1.7c5.5,3.7,9.3,9.9,14.2,15.5c0.6-0.7,1.9-2.1,3.1-3.5 c14.6-16.8,40.9-23.7,61-15.9c15,5.8,21.1,18,21.4,32.9c0.6,32.3,0.2,64.7,0.1,97c0,1.3-1.6,3.7-2.4,3.7 c-12.8,0.2-25.6,0.2-39.1,0.2c0-2.4,0-4.4,0-6.3c0-21.7,0-43.3,0-65c0-2,0-4,0-6c-0.2-7.7,0.1-15.9-8-20.2 c-8.7-4.6-17.5-2.9-25.6,1.9c-6.4,3.8-10.2,8.7-9.9,17.3c0.7,24,0.2,48,0.2,72c0,1.8,0,3.6,0,5.8c-1.5,0.3-2.8,0.7-4,0.7 c-10.8,0-21.7-0.3-32.5,0c-4.3,0.1-5.7-1.1-5.7-5.6c0.2-24.5,0.1-49,0.1-73.5c0-3.5-0.1-7.1-1.1-10.4c-2.2-7.3-9-11.2-17.7-10.7 c-8.8,0.5-16,4.3-21.6,10.9c-1.1,1.3-1.6,3.6-1.7,5.4c-0.1,25.8-0.1,51.7,0.1,77.5c0,4.7-1.1,6.5-6.1,6.3 c-10.2-0.4-20.3-0.1-30.5-0.1c-1.8,0-3.6-0.2-5.9-0.3c0-2.3,0-4.3,0-6.2c0-24.7-0.6-49.3,0.2-74c0.6-18.1-13-21.8-25.7-18.3 c-4.6,1.3-8.7,4.6-12.9,7.3c-3.3,2.1-4.2,5.4-4.2,9.5c0.2,25.3,0,50.7,0.2,76c0,4.8-1.2,6.3-6.1,6.2 C661.9,201.6,650,201.8,637.3,201.8z"/> <path d="M304.8,201.8c-3.2,0-5.6,0-8.1,0c-9.5,0-19-0.1-28.5,0.1c-4,0.1-5.6-0.9-5.6-5.2c0.1-58.5,0.1-117,0.1-175.5 c0-1.3,0.2-2.6,0.4-4.2c13.8,0,27.4,0,41.6,0c0,21.9,0,43.8,0,67.2c3-2.4,5-3.9,6.9-5.5c17.7-14.9,46.3-18.6,65.6-8.4 c11.6,6.1,18.1,16.4,18.4,28.9c0.8,33.5,0.3,67,0.3,100.5c0,0.3-0.2,0.6-0.4,1.5c-13.4,0-26.9,0-41.3,0c0-1.9,0-3.8,0-5.8 c0-22.8,0-45.7,0-68.5c0-1.2,0-2.3,0-3.5c-0.3-14.7-7.7-22.2-22.5-21.9c-9.1,0.2-17.5,2.9-23.6,10.1c-1.7,2-3.2,5.1-3.2,7.7 c-0.2,25.3-0.1,50.7-0.1,76C304.8,197.4,304.8,199.2,304.8,201.8z"/> <path d="M498.2,68.2c14.1,0,27.5,0,41.4,0c0,44.3,0,88.5,0,133.2c-1.5,0.1-3.1,0.4-4.7,0.4c-10.5,0-21-0.2-31.5,0.1 c-4.3,0.1-5.6-1.4-5.2-5.4c0.3-2.9,0.1-5.9,0.1-10.2c-2.1,1.4-3.4,2.1-4.5,3c-18.7,15.8-39.7,19.9-62.9,12.4 c-13.8-4.5-23.2-17.1-23.4-32.7c-0.4-33-0.1-66-0.1-99c0-0.5,0.2-0.9,0.4-1.8c13.5,0,27.1,0,41.2,0c0,2.2,0,3.9,0,5.7 c0,22.7,0,45.3,0,68c0,3.6,0.3,7.3,0.9,10.9c1.5,9,7.7,14.2,16.7,15c11.1,1,21-1.2,28.6-9.8c1.7-1.9,3-4.9,3-7.3 c0.2-25.2,0.1-50.3,0.1-75.5C498.2,73.1,498.2,71,498.2,68.2z"/> <path d="M969.5,69.5c13.7-0.4,25.7,10.7,26.5,23.8c0.9,15.3-11.3,27.5-25,28c-14.9,0.5-27.4-10.8-27.7-24.8 C942.9,81,953.6,70,969.5,69.5z M969.2,117.8c12.9,0.2,23-9.6,23.1-22.2c0.1-12.7-9.7-22.6-22.7-22.7c-12.4-0.2-22.6,9.5-22.8,21.5 C946.7,107.8,956.1,117.6,969.2,117.8z"/> <path className="st0" d="M66.8,42c6-3.1,12-1.9,16.5,2.9c4.3,4.7,4.8,11.6,1.2,17c-3.5,5.5-10.4,7.7-16.7,5.5c-5.7-2-9-7.3-8.6-12.9 c3,0.6,6.1,1.5,9.1,1.6c1.2,0,2.8-1.8,3.6-3.1C74.2,49.4,72.8,46.5,66.8,42z"/> <path className="st0" d="M1064.7,125c-17.2-0.6-32.5-5.7-41.5-21.4c-17.8-31-3.2-73.6,36-78.9c27.6-3.7,47.9,7.2,59.6,38.5 c2.6,6.9,3.7,14.4,5.2,21.7c0.4,1.9-0.1,4.5-1.1,6.1c-12.2,19.3-28.8,31.9-52.2,34c-1,0.1-2,0.2-3,0.1 C1066.7,125.2,1065.7,125.1,1064.7,125z"/> <path className="st0" d="M1158.9,112.1c-0.3-21.9,2.8-43.2,14-62.5c16.3-27.9,53.9-34.3,76.8-13c11.8,11,17.7,25.3,21,40.6 c5.9,28,5.6,55.9-3.7,83.2c-4.1,12.2-10.3,23.2-20.7,31.1c-23.9,18.3-57.7,11-73.2-15.6c-8.9-15.3-12.8-32-14.1-49.5 C1158.6,121.8,1158.9,117,1158.9,112.1z"/> <path className="st0" d="M969.2,117.8c-13.1-0.2-22.5-10-22.3-23.4c0.1-12,10.4-21.7,22.8-21.5c13,0.2,22.8,10,22.7,22.7 C992.2,108.2,982.1,117.9,969.2,117.8z M959.4,80.8c0,9.3-0.1,17.8,0.1,26.3c0,1,1.4,2.1,2.1,3.1c0.7-1.1,1.8-2.1,2-3.2 c0.3-2.7,0.1-5.5,0.1-8.3c0.5-0.4,1-0.8,1.5-1.2c2,1.4,4.3,2.4,6,4.1c1.7,1.7,2.7,4.2,4.3,6c1.2,1.3,3,2,4.6,2.9 c0.3-0.4,0.6-0.8,0.9-1.1c-2.2-3.6-4.4-7.1-6.8-10.8c1.5-0.9,3-1.2,3.4-2c1.5-2.7,3.6-5.7,3.7-8.5c0.1-4-3.2-6.7-7.1-7.1 C969.4,80.4,964.6,80.8,959.4,80.8z"/> <path d="M959.4,80.8c5.2,0,10-0.4,14.8,0.1c3.9,0.4,7.2,3.1,7.1,7.1c-0.1,2.9-2.2,5.8-3.7,8.5c-0.5,0.8-1.9,1.2-3.4,2 c2.3,3.7,4.5,7.3,6.8,10.8c-0.3,0.4-0.6,0.8-0.9,1.1c-1.5-1-3.4-1.7-4.6-2.9c-1.7-1.8-2.6-4.3-4.3-6c-1.7-1.7-4-2.8-6-4.1 c-0.5,0.4-1,0.8-1.5,1.2c0,2.8,0.2,5.6-0.1,8.3c-0.1,1.1-1.3,2.1-2,3.2c-0.7-1-2.1-2-2.1-3.1C959.3,98.6,959.4,90.1,959.4,80.8z M963.3,94.4c11.4,1,14.3-0.3,14.2-5.3c-0.1-4.5-3.8-7-10.7-5.5C960.1,85.1,965.4,90.7,963.3,94.4z"/> <path className="st0" d="M963.3,94.4c2.1-3.7-3.2-9.3,3.5-10.8c6.9-1.5,10.6,0.9,10.7,5.5C977.7,94.2,974.7,95.4,963.3,94.4z"/> </g> </svg>
    </span>
    <span className="f-img__item">
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="22" viewBox="0 0 74 22"><g fill="none"><path d="M6.51 14.9a5.36 5.36 0 00-1.2-.55 4.4 4.4 0 00-2.15-.1c-.25.05-.46.14-.64.26-.18.11-.32.25-.41.41a1 1 0 00-.15.54c0 .19.04.34.13.47.08.13.2.24.37.33.16.09.35.16.59.22.23.06.49.11.78.15l.63.08c.36.05.72.13 1.06.24.35.1.66.25.93.44a2 2 0 01.66.7c.16.29.25.63.25 1.04 0 .44-.1.84-.3 1.18a2.7 2.7 0 01-.78.87c-.33.23-.71.4-1.15.53a5.16 5.16 0 01-2.33.1 6.76 6.76 0 01-1.9-.58 4.6 4.6 0 01-.78-.52l.8-1.13c.15.14.34.27.55.39a4.88 4.88 0 003.1.5c.25-.07.47-.15.66-.27.2-.1.34-.25.45-.4a.94.94 0 00.16-.55c0-.34-.17-.6-.51-.78a4.73 4.73 0 00-1.51-.4l-.7-.1a5.61 5.61 0 01-.98-.22 2.8 2.8 0 01-.86-.44 2.15 2.15 0 01-.6-.72 2.19 2.19 0 01-.23-1.04 2.4 2.4 0 011.04-2.03c.32-.23.7-.4 1.13-.53a5.82 5.82 0 014.64.76L6.5 14.9zm4.91.67a3 3 0 011.18.23c.36.16.67.37.92.65a3 3 0 01.6 1 3.66 3.66 0 01.2 1.76H9.75c.04.28.12.5.24.7a1.65 1.65 0 00.96.75 2.76 2.76 0 001.56-.08c.31-.11.6-.27.85-.47l.67.93a3.1 3.1 0 01-1.2.66c-.42.13-.86.19-1.33.19a3.5 3.5 0 01-1.28-.23 2.9 2.9 0 01-1.64-1.63 3.48 3.48 0 01-.24-1.3c0-.47.08-.9.23-1.28a2.81 2.81 0 011.6-1.64c.37-.16.79-.24 1.24-.24zm-.02 1.17c-.24 0-.46.04-.64.1a1.4 1.4 0 00-.48.31 1.6 1.6 0 00-.34.47c-.08.18-.14.38-.18.6h3.2a1.85 1.85 0 00-.51-1.1 1.45 1.45 0 00-1.05-.38zm7.15-1.17c.46 0 .9.08 1.3.25.39.16.73.4 1 .71l-.86.9a2.6 2.6 0 00-.68-.46c-.24-.1-.5-.16-.8-.16a1.84 1.84 0 00-1.3.53 2 2 0 00-.52 1.39c0 .29.04.55.14.78a1.73 1.73 0 001.68 1.14c.3 0 .57-.05.83-.17.26-.12.48-.27.68-.45l.83.9c-.28.32-.62.56-1.02.72a3.53 3.53 0 01-2.62 0 2.94 2.94 0 01-1.68-1.66 3.44 3.44 0 01.01-2.51 2.93 2.93 0 011.68-1.66c.4-.17.84-.25 1.33-.25zm9.2 3.62c0 .48-.08.88-.25 1.23a2.4 2.4 0 01-1.55 1.32 3.67 3.67 0 01-2.11 0 2.35 2.35 0 01-1.56-1.32 2.86 2.86 0 01-.25-1.23v-3.46h1.36v3.34c0 .29.03.53.11.74.08.2.19.36.32.49.14.12.3.21.48.27a2.02 2.02 0 001.18 0c.19-.06.35-.15.48-.27.14-.13.24-.3.32-.5.08-.2.12-.44.12-.73v-3.34h1.35v3.46zm4.9-3.62a3.27 3.27 0 011.05.17l-.33 1.3a2.72 2.72 0 00-1.02-.22c-.21 0-.41.04-.6.1-.17.08-.33.18-.46.32-.12.14-.22.3-.3.5a2 2 0 00-.1.7v3.3h-1.35v-6h1.33v.67c.2-.3.46-.5.77-.64.3-.13.64-.2 1.02-.2zm4.53 0a3 3 0 011.18.23 2.75 2.75 0 011.52 1.65 3.67 3.67 0 01.19 1.76H35.5c.04.28.12.5.24.7a1.66 1.66 0 00.96.75 2.76 2.76 0 001.56-.08c.31-.11.6-.27.86-.47l.67.93c-.38.32-.78.54-1.2.66-.43.13-.87.19-1.34.19a3.5 3.5 0 01-1.27-.23 2.9 2.9 0 01-1.65-1.63 3.48 3.48 0 01-.23-1.3c0-.47.07-.9.22-1.28a2.81 2.81 0 011.6-1.64c.38-.16.8-.24 1.25-.24zm-.03 1.17c-.24 0-.45.04-.64.1a1.4 1.4 0 00-.48.31 1.6 1.6 0 00-.33.47 1.9 1.9 0 00-.18.6h3.2a1.85 1.85 0 00-.52-1.1 1.45 1.45 0 00-1.05-.38zm8.75-3.94a5.29 5.29 0 012.2.49 4 4 0 011.53 1.34l-1.22.8a2.93 2.93 0 00-2.51-1.27c-.46 0-.89.08-1.28.23a2.99 2.99 0 00-1.67 1.66c-.17.4-.25.83-.25 1.3 0 .47.08.9.25 1.3a3 3 0 002.95 1.89 2.97 2.97 0 002.51-1.26l1.18.84a3.82 3.82 0 01-1.54 1.3 4.6 4.6 0 01-2.15.48c-.7 0-1.33-.12-1.9-.35a4.3 4.3 0 01-2.46-2.39 4.68 4.68 0 01-.36-1.81c0-.66.12-1.26.35-1.82a4.3 4.3 0 012.46-2.39 5.14 5.14 0 011.9-.34zm7.94 2.77c.48 0 .92.08 1.33.25a3.04 3.04 0 012 2.92 3.1 3.1 0 01-2 2.9 3.6 3.6 0 01-2.65.01 3.06 3.06 0 01-2-2.92 3.1 3.1 0 012-2.91c.4-.17.85-.25 1.32-.25zm0 1.24c-.27 0-.53.05-.76.14a1.82 1.82 0 00-1.02 1 2 2 0 00-.15.78 2 2 0 00.15.78 1.83 1.83 0 001.78 1.15c.28 0 .53-.05.77-.15a1.86 1.86 0 001.02-1 2 2 0 00.15-.78 2 2 0 00-.15-.78 1.82 1.82 0 00-1.02-1c-.24-.1-.5-.14-.77-.14zm7.37-1.24a2.4 2.4 0 011.94.88v-3.74h1.34v9.02h-1.34v-.72a2.37 2.37 0 01-1.94.88 3.08 3.08 0 01-2.19-.89 3.3 3.3 0 01-.9-2.27c0-.46.09-.88.25-1.27a3.02 3.02 0 012.84-1.89zm.16 1.24a1.75 1.75 0 00-1.73 1.18 2.15 2.15 0 00.37 2.1 1.75 1.75 0 001.36.57c.28 0 .53-.05.76-.15a1.75 1.75 0 00.97-1.01c.09-.24.13-.5.13-.77s-.04-.53-.13-.76a1.81 1.81 0 00-.97-1.01 1.9 1.9 0 00-.76-.15zm7.6-1.24c.43 0 .82.08 1.18.23.36.16.67.37.92.65a3 3 0 01.6 1 3.65 3.65 0 01.2 1.76H67.3c.04.28.12.5.23.7a1.65 1.65 0 00.97.75 2.76 2.76 0 001.56-.08c.31-.11.6-.27.85-.47l.67.93c-.38.32-.78.54-1.2.66a4.5 4.5 0 01-1.33.19 3.5 3.5 0 01-1.28-.23 2.9 2.9 0 01-1.65-1.63 3.48 3.48 0 01-.23-1.3c0-.47.08-.9.23-1.28a2.81 2.81 0 011.6-1.64c.37-.16.79-.24 1.24-.24zm3.56 6.16v-.3h.12v-.06h-.31v.06h.12v.3h.07zm.62 0v-.36h-.1l-.11.25-.11-.25h-.1v.36h.07v-.27l.1.23h.07l.1-.23v.27h.08zm-4.2-4.99c-.24 0-.46.04-.64.1a1.4 1.4 0 00-.49.31 1.6 1.6 0 00-.33.47c-.08.18-.14.38-.18.6h3.2a1.85 1.85 0 00-.51-1.1 1.45 1.45 0 00-1.05-.38z" fill="#A9A9A9"/><path d="M10.94 9.36h-1.5V1.87L6.7 8.47H5.12L2.39 1.94v7.42H.88V.26h2.31l2.72 6.5L8.63.26h2.31v9.1zm7.94 0H17.5V8.6a2.45 2.45 0 01-2 .91 3.21 3.21 0 01-2.28-.92 3.13 3.13 0 01-.68-1.04 3.53 3.53 0 010-2.63 3.14 3.14 0 014.13-1.71c.33.17.6.39.83.67v-.76h1.4v6.23zm-3.23-5.11c-.3 0-.58.05-.81.16a1.81 1.81 0 00-.99 1.06 2.22 2.22 0 00.38 2.18 2 2 0 00.6.43c.24.1.51.16.82.16a1.83 1.83 0 001.79-1.2 2.28 2.28 0 000-1.59 1.84 1.84 0 00-1.79-1.2zm9.64.44a3.9 3.9 0 00-1.38-.48c-.2-.03-.4-.05-.6-.05-.38 0-.67.07-.88.2-.22.14-.32.32-.32.54 0 .1.03.2.08.27.06.08.13.14.23.18.09.05.2.09.33.12l.41.07.66.1c.7.1 1.25.3 1.64.6.4.3.59.7.59 1.24a1.74 1.74 0 01-.77 1.46 2.8 2.8 0 01-.91.42 4.66 4.66 0 01-1.8.12 4.92 4.92 0 01-2.18-.77l.65-1.02a3.34 3.34 0 00.84.45 3.57 3.57 0 001.27.2c.48 0 .84-.08 1.09-.21.24-.14.37-.33.37-.56 0-.18-.1-.32-.27-.44a2.2 2.2 0 00-.84-.25l-.67-.08c-.71-.1-1.25-.3-1.62-.61a1.51 1.51 0 01-.55-1.22 1.74 1.74 0 01.71-1.46c.23-.17.5-.3.83-.4a5.68 5.68 0 012.52.03c.45.12.84.28 1.17.5l-.6 1.05zm6.62-.32h-2.45v2.7c0 .21.03.4.08.54a1 1 0 00.22.36 1.05 1.05 0 00.72.27c.22 0 .44-.04.66-.12.23-.09.44-.19.63-.3l.55 1.08c-.26.17-.55.32-.87.44-.32.12-.69.18-1.1.18a2.3 2.3 0 01-1.68-.59c-.4-.39-.6-1-.6-1.83V4.37h-1.28V3.13h1.27V1.25h1.4v1.88h2.45v1.24zm4.3-1.4c.44 0 .85.08 1.22.24a2.97 2.97 0 011.58 1.7 3.8 3.8 0 01.2 1.84h-4.73c.04.28.12.52.24.72a1.72 1.72 0 001 .77c.21.06.43.1.66.1a3.13 3.13 0 001.85-.66l.7.96c-.4.33-.81.56-1.25.69-.44.13-.9.19-1.39.19-.48 0-.92-.08-1.32-.23a3 3 0 01-1.7-1.7 3.4 3.4 0 01-.25-1.34c0-.49.08-.93.24-1.34a2.91 2.91 0 011.66-1.7 3.4 3.4 0 011.29-.24zm-.03 1.2a2 2 0 00-.67.12 1.5 1.5 0 00-.5.31c-.14.14-.25.3-.34.5a2.3 2.3 0 00-.19.61h3.32a1.92 1.92 0 00-.53-1.13 1.5 1.5 0 00-1.1-.4zm7.88-1.2a3.56 3.56 0 011.08.18l-.34 1.34a2.83 2.83 0 00-1.06-.23c-.22 0-.43.04-.61.11a1.3 1.3 0 00-.48.33c-.14.14-.24.32-.32.52-.07.21-.11.45-.11.71v3.43h-1.4V3.13h1.39v.7c.21-.3.47-.51.79-.65a2.6 2.6 0 011.06-.21zm4.77 0c.48 0 .93.08 1.35.25.4.17.76.42 1.04.74l-.9.93a2.6 2.6 0 00-.7-.47 2 2 0 00-2.17.39 2.07 2.07 0 00-.54 1.43c0 .3.04.57.14.81a1.78 1.78 0 001 1.04 2.03 2.03 0 001.6-.04c.27-.12.5-.27.71-.46l.86.94c-.29.33-.64.57-1.05.74a3.5 3.5 0 01-1.34.25c-.5 0-.96-.08-1.38-.25a3.05 3.05 0 01-1.74-1.73c-.16-.4-.24-.83-.24-1.3 0-.46.08-.9.24-1.3a3.05 3.05 0 011.74-1.72c.42-.17.88-.25 1.38-.25zm9.83 6.39h-1.4V8.6a2.45 2.45 0 01-2 .91 3.21 3.21 0 01-2.27-.92 3.13 3.13 0 01-.69-1.04c-.16-.4-.24-.84-.24-1.32 0-.47.08-.91.24-1.31a3.14 3.14 0 014.14-1.71c.33.17.6.39.82.67v-.76h1.4v6.23zm-3.24-5.11c-.3 0-.57.05-.8.16a1.81 1.81 0 00-1 1.06 2.24 2.24 0 00.39 2.18c.16.18.36.32.6.43.24.1.5.16.81.16a1.83 1.83 0 001.79-1.2 2.26 2.26 0 000-1.59 1.84 1.84 0 00-1.79-1.2zm8.53-1.28a3.56 3.56 0 011.08.18l-.34 1.34a2.84 2.84 0 00-1.06-.23c-.22 0-.43.04-.61.11a1.3 1.3 0 00-.48.33c-.14.14-.24.32-.32.52-.07.21-.11.45-.11.71v3.43h-1.4V3.13h1.39v.7c.21-.3.47-.51.8-.65.3-.14.66-.21 1.05-.21zm4.58 0c.46 0 .85.08 1.18.25.33.17.6.39.83.67V0h1.4v9.36h-1.4V8.6a2.45 2.45 0 01-2 .91 3.21 3.21 0 01-2.28-.92 3.14 3.14 0 01-.68-1.04 3.53 3.53 0 010-2.63 3.15 3.15 0 012.95-1.96zm5.03 5.81a.41.41 0 01.39.24.37.37 0 010 .31.42.42 0 01-.55.21.41.41 0 01-.22-.2.37.37 0 01-.03-.16c0-.06 0-.1.03-.16a.4.4 0 01.22-.2.3.3 0 01.16-.04zm0 .7a.31.31 0 00.3-.18.3.3 0 00.02-.12.3.3 0 00-.1-.22.32.32 0 00-.22-.09.32.32 0 00-.22.09.3.3 0 00.1.5l.12.03zM73.6 9c.05 0 .08.01.11.03a.1.1 0 01.04.09.1.1 0 01-.03.08.15.15 0 01-.1.03l.13.14h-.1l-.1-.14h-.05v.14h-.08V9h.18zm-.1.07v.1h.1a.1.1 0 00.05-.01l.02-.04c0-.02 0-.03-.02-.04a.1.1 0 00-.05 0h-.1zm-4.8-4.81c-.3 0-.57.05-.8.16a1.81 1.81 0 00-.99 1.06 2.24 2.24 0 00.38 2.18 2 2 0 00.6.43c.24.1.52.16.82.16a1.83 1.83 0 001.79-1.2 2.26 2.26 0 000-1.59 1.84 1.84 0 00-1.79-1.2z" fill="#636363"/></g></svg>
    </span>
    <span className="f-img__item">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="22" viewBox="0 0 50 22"><g fill="none" fillRule="evenodd"><path d="M20.37 11.66l-2.43 6.43-.26-1.3c-.6-1.6-1.92-3.29-3.45-3.97l2.23 8.26h2.63l3.92-9.42h-2.64zm4.58 9.43h-2.49l1.56-9.44h2.48zm9.02-9.21a6.26 6.26 0 00-2.23-.4c-2.46 0-4.19 1.29-4.2 3.12-.02 1.36 1.23 2.11 2.17 2.56.98.47 1.3.76 1.3 1.17-.01.64-.78.92-1.5.92-.99 0-1.52-.14-2.33-.49l-.33-.15-.34 2.11c.58.27 1.65.5 2.77.5 2.61 0 4.31-1.26 4.33-3.22.01-1.07-.65-1.89-2.1-2.56-.86-.44-1.4-.73-1.39-1.17 0-.4.45-.81 1.43-.81.81-.02 1.4.17 1.86.36l.22.1.34-2.04zm6.38-.22h-1.92c-.6 0-1.04.17-1.3.78l-3.7 8.65h2.61l.53-1.42h3.18l.3 1.42h2.32l-2.02-9.43zm-3.07 6.08l1-2.64.33-.9.16.82.58 2.72h-2.07z" fill="#636363"/><path d="M15.68 11.65h-4.01l-.03.17c3.12.78 5.18 2.7 6.04 4.97l-.87-4.34c-.15-.6-.59-.77-1.13-.8z" fill="#A9A9A9"/><path fill="#636363" d="M2.48 1l1.25 6.33 3.19-6.24H8.6L4.14 9.37H2.55L.72 1.3zm9.92 5.73H8.6c-.1 1.13.44 1.62 1.34 1.62a4 4 0 002.14-.72v1.12c-.7.43-1.52.7-2.47.7-1.65 0-2.74-.91-2.41-3 .3-1.87 1.62-3 3.16-3 1.77 0 2.35 1.3 2.1 2.94l-.07.34zm-2.24-2.3c-.58 0-1.13.46-1.39 1.4h2.35c.04-.89-.25-1.4-.96-1.4zm4.7 1.6l-.52 3.3h-1.47l.9-5.76h1.25v1.16c.5-.67 1.17-1.24 2.1-1.28v1.42c-.92.06-1.75.54-2.26 1.16zm2.24 3.31l.91-5.77h1.47l-.9 5.77H17.1zm1.81-6.74c-.49 0-.83-.34-.75-.81.08-.5.52-.84 1.01-.84.48 0 .81.35.73.84a1 1 0 01-.99.8zm4.62-.61c-.5 0-.8.21-.88.73l-.13.85h1.12v1.17h-1.3l-.73 4.6h-1.45l.72-4.6h-.85l.18-1.17h.85l.16-1c.2-1.27 1.1-1.75 2.31-1.75.26 0 .45.02.6.05v1.17a3.78 3.78 0 00-.6-.05zm.02 7.35l.9-5.77h1.47l-.9 5.77h-1.47zm1.8-6.74c-.48 0-.82-.34-.75-.81.08-.5.52-.84 1.01-.84.48 0 .81.35.74.84a1 1 0 01-1 .8zm6.25 4.13h-3.78c-.1 1.13.43 1.62 1.33 1.62a4 4 0 002.14-.72v1.12c-.71.43-1.52.7-2.47.7-1.65 0-2.74-.91-2.41-3 .3-1.87 1.62-3 3.15-3 1.77 0 2.36 1.3 2.1 2.94-.01.12-.05.26-.06.34zm-2.23-2.3c-.58 0-1.13.46-1.39 1.4h2.34c.05-.89-.24-1.4-.95-1.4zm6.57 4.91v-.8c-.5.49-1.13.92-1.95.92-1.23 0-2.08-.9-1.77-2.85.33-2.15 1.7-3.1 3.06-3.1.56 0 1 .1 1.33.21l.44-2.78 1.5-.23-1.36 8.63h-1.25zm.49-4.44a2.28 2.28 0 00-1.11-.25c-.77 0-1.43.61-1.63 1.88-.17 1.12.23 1.65.88 1.65.54 0 1-.31 1.47-.79l.39-2.49zm5.25 4.5c-.7 0-1.26-.12-1.78-.3l.96-6.13 1.13-.17-.41 2.65c.33-.29.8-.58 1.36-.58.94 0 1.57.7 1.34 2.16-.25 1.61-1.27 2.36-2.6 2.36zm.82-3.57c-.37 0-.74.25-1.07.58l-.31 1.98c.22.08.37.12.68.12.7 0 1.2-.42 1.35-1.42.13-.84-.15-1.26-.65-1.26zm4.4 3.74c-.57 1.08-1.14 1.42-2 1.42-.19 0-.3-.02-.4-.05v-.9c.14.04.3.07.5.07a.9.9 0 00.8-.46l.15-.3-.94-4.3 1.17-.15.55 3.12 1.48-3.05h1.1l-2.42 4.6z"/></g></svg>
    </span>
    <span className="f-img__item">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="22" viewBox="0 0 40 22"><g fill="none" fillRule="evenodd"><path d="M39.66.08H.1v21.86h39.57v-7.21a.59.59 0 00.24-.48.54.54 0 00-.24-.48" fill="#636363"/><path className="no-fill" d="M3.66 8.15l-.76-1.8-.76 1.8h1.52zm16.77-.71c-.16.09-.34.1-.55.1h-1.35v-1h1.37c.19 0 .4 0 .52.07.15.07.24.2.24.4s-.09.36-.23.43zm9.64.71l-.77-1.8-.77 1.8h1.54zM12.1 10.1h-1.14V6.57L9.33 10.1h-.98l-1.6-3.53v3.53H4.49l-.43-1H1.74l-.43 1H.11l1.98-4.5h1.66l1.89 4.26V5.59h1.81l1.46 3.06 1.34-3.06h1.85v4.5zm4.54 0h-3.71V5.6h3.71v.93h-2.6v.81h2.54v.93h-2.54v.9h2.6v.93zm5.24-3.3c0 .72-.5 1.1-.78 1.2.24.1.45.25.55.39.16.22.18.42.18.82v.89h-1.12v-.57c0-.27.02-.66-.18-.88-.16-.16-.41-.2-.81-.2h-1.2v1.65h-1.1V5.6h2.55c.57 0 .99 0 1.35.21.35.2.56.5.56 1zm1.78 3.3h-1.13V5.6h1.13v4.5zm13.17 0h-1.58l-2.1-3.38v3.38h-2.27l-.43-1h-2.32l-.42 1h-1.3c-.54 0-1.22-.12-1.6-.5-.4-.38-.6-.9-.6-1.72 0-.67.12-1.28.6-1.76.36-.36.92-.53 1.69-.53h1.07v.97h-1.05c-.4 0-.64.06-.86.27-.19.19-.32.54-.32 1.02s.1.83.3 1.05c.18.18.49.24.78.24h.5l1.57-3.55h1.67l1.88 4.26V5.6h1.7l1.95 3.14V5.59h1.14v4.5zm-36.74.88h1.9l.43-1h.96l.43 1h3.73v-.76l.34.76h1.94l.33-.77v.77h9.3V9.34h.17c.13 0 .16.01.16.22v1.42h4.8v-.38c.4.2 1 .38 1.8.38h2.02l.43-1h.96l.42 1h3.9v-.95l.59.95h3.12V4.7h-3.1v.74l-.42-.74h-3.17v.74l-.4-.74h-4.28c-.72 0-1.35.1-1.86.37V4.7h-2.96v.37c-.32-.28-.76-.37-1.25-.37H9.58l-.72 1.62L8.1 4.7H4.7v.74l-.37-.74h-2.9l-1.34 3V11zm39.57 3.32h-2.03c-.2 0-.33 0-.45.08a.37.37 0 00-.16.33c0 .17.1.28.24.33.12.04.25.05.43.05l.6.02c.61.01 1.02.12 1.27.36l.1.11V14.3zm0 2.97c-.27.38-.8.58-1.5.58H36v-.97h2.14c.22 0 .36-.03.45-.11a.39.39 0 00.13-.3.36.36 0 00-.13-.3c-.08-.06-.2-.1-.4-.1-1.04-.03-2.34.04-2.34-1.39 0-.65.43-1.34 1.6-1.34h2.21v-.9H37.6c-.62 0-1.07.15-1.39.38v-.37h-3.04c-.5 0-1.06.11-1.33.37v-.37H26.4v.37a2.97 2.97 0 00-1.5-.37h-3.59v.37c-.34-.33-1.1-.37-1.56-.37h-4.02l-.92.96-.86-.96h-6v6.28h5.9l.94-.98.89.98h3.63v-1.47h.35a3.9 3.9 0 001.55-.22v1.7h3v-1.65h.14c.18 0 .2.01.2.19v1.45h9.08c.58 0 1.18-.14 1.52-.4v.4h2.88c.6 0 1.19-.08 1.63-.29v-1.17zm-4.44-1.8c.22.22.34.5.34.96 0 .96-.63 1.42-1.75 1.42h-2.17v-.97h2.16c.21 0 .36-.03.46-.11a.4.4 0 000-.6.71.71 0 00-.4-.1c-1.05-.03-2.35.04-2.35-1.39 0-.65.43-1.34 1.6-1.34h2.22v.96H33.3c-.2 0-.33.01-.44.08-.13.08-.17.18-.17.33 0 .17.1.28.24.33.12.04.25.05.44.05l.6.02c.6.01 1.01.12 1.26.36zM25.2 15.2c-.15.09-.33.1-.55.1H23.3v-1.01h1.37c.2 0 .4 0 .53.08.14.07.23.2.23.4s-.09.35-.23.43zm.67.56c.25.1.45.25.54.38.16.22.18.43.19.82v.9h-1.12v-.57c0-.27.03-.67-.18-.88-.16-.16-.4-.2-.81-.2h-1.2v1.65h-1.11v-4.5h2.57c.56 0 .97.02 1.34.2.35.21.57.5.57 1 0 .73-.5 1.1-.79 1.2zm1.4-2.4h3.72v.93h-2.6v.81h2.53v.92h-2.54v.9h2.6v.94h-3.7v-4.5zm-7.5 2.07h-1.44v-1.14h1.45c.4 0 .68.15.68.55 0 .39-.26.6-.69.6zm-2.54 2.02L15.5 15.6l1.7-1.77v3.6zm-4.41-.53h-2.74V16h2.44v-.92h-2.44v-.81h2.79l1.22 1.3-1.27 1.33zm8.84-2.08c0 1.25-.97 1.5-1.94 1.5h-1.39v1.52h-2.16l-1.37-1.5-1.42 1.5h-4.4v-4.5h4.47l1.36 1.47 1.42-1.48h3.55c.89 0 1.88.24 1.88 1.49z" fill="#FFF" fillRule="nonzero"/></g></svg>
    </span>
    <span className="f-img__item">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="22" viewBox="0 0 45 22"><g fill="none" fillRule="evenodd"><path fill="#636363" fillRule="nonzero" d="M0 .21h45V22H0z"/><path className="no-fill" fill="#FFF" fillRule="nonzero" d="M5 6.03L2 7.89V4.17zm5 0L7 7.89V4.17zm5 0l-3 1.86V4.17z"/><text fontFamily="Lato-BoldItalic, Lato" fontSize="9" fontStyle="italic" fontWeight="bold" letterSpacing=".34" fill="#FFF" transform="translate(0 -1)"><tspan x="17.2" y="10.16">BANK</tspan></text><text fontFamily="Lato-BoldItalic, Lato" fontSize="9" fontStyle="italic" fontWeight="bold" letterSpacing="-.2" fill="#FFF" transform="translate(0 -1)"><tspan x="1.36" y="19.81">TRANSFE</tspan> <tspan x="36.2" y="19.81">R</tspan></text></g></svg>
    </span>
  </>
)

export default function FooterExtra({ isMobile }) {
  if (isMobile) {
    return (
      <Fragment>
        <div className="f-col xs-show mobile-f-line">
          <p className="info-p">Payment options</p>
          <div className="f-img f-img--type2">
            <PaymentButtons/>
          </div>
        </div>
        <div className="f-col xs-show mobile-f-line">
          <p className="info-p">Certifications & memberships</p>
          <div className="f-img">
            <CertificateButtons/>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className="sub-footer">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-auto">
                <p className="info-p">Certifications & memberships</p>
                <div className="f-img">
                  <CertificateButtons/>
                </div>
              </div>
              <div className="col-12 col-lg-auto f-img-col">
                <p className="info-p">Payment options</p>
                <div className="f-img f-img--type2">
                  <PaymentButtons/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}