import React from 'react';

const EditSvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <defs>
      <path
        id="tycxa"
        d="M593.847 409.148l2.149-2.148 2.99 2.99-2.149 2.148zm-7.788 8.157l2.622 2.629-3.681 1.061zm3.47 2.151l-2.99-2.993 6.644-6.65 2.99 2.993z"
      />
    </defs>
    <g>
      <g transform="translate(-585 -407)">
        <use fill="#636363" xlinkHref="#tycxa" />
      </g>
    </g>
  </svg>
)

export default EditSvg;