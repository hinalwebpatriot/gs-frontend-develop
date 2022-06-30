import React from 'react';

const HeaderEngagementRingSvg = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="16"
    height="20"
    viewBox="0 0 16 20"
    {...props}
  >
    <defs>
      <path
        id="eaqvc"
        d="M639.962 87.05a7.962 7.962 0 1 0 0 15.924 7.962 7.962 0 1 0 0-15.924m0 15.859a7.15 7.15 0 1 1 7.151-7.15 7.15 7.15 0 0 1-7.151 7.15"
      />
      <path id="eaqvd" d="M639.955 88.437l1.911-4.297h-3.806z" />
      <path id="eaqva" d="M638.08 83.11h3.768v.888h-3.768z" />
      <path id="eaqvf" d="M640.944 83.11h-1.96l-.904.888h3.768z" />
      <path id="eaqvg" d="M639.789 88.435l-4.039-4.295h2.126z" />
      <path id="eaqvh" d="M640.13 88.435l4.039-4.295h-2.125z" />
      <path id="eaqvb" d="M641.16 83.11h3.013v.888h-3.013z" />
      <path id="eaqvj" d="M642.262 83.11h-1.102l.904.888h2.11z" />
      <clipPath id="eaqve">
        <use xlinkHref="#eaqva" />
      </clipPath>
      <clipPath id="eaqvi">
        <use xlinkHref="#eaqvb" />
      </clipPath>
    </defs>
    <g>
      <g transform="translate(-632 -83)">
        <g>
          <use fill="#636363" xlinkHref="#eaqvc" />
        </g>
        <g>
          <use fill="#636363" xlinkHref="#eaqvd" />
        </g>
        <g>
          <g />
          <g clipPath="url(#eaqve)">
            <use fill="#636363" xlinkHref="#eaqvf" />
          </g>
        </g>
        <g>
          <use fill="#636363" xlinkHref="#eaqvg" />
        </g>
        <g>
          <use fill="#636363" xlinkHref="#eaqvh" />
        </g>
        <g>
          <g />
          <g clipPath="url(#eaqvi)">
            <use fill="#636363" xlinkHref="#eaqvj" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default HeaderEngagementRingSvg;
