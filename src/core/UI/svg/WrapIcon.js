import React from 'react';

const WrapIcon = ({ className = '' }) => {
  return (
    <svg
      width="27"
      height="29"
      viewBox="0 0 27 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="10.8766" y="8.3364" width="6.50128" height="6.8364" fill="#FFF9F9" stroke="white" />
      <g filter="url(#filter0_d_4_38)">
        <rect
          x="5.25064"
          y="4.4182"
          width="16.8155"
          height="15.6524"
          rx="0.5"
          stroke="white"
          shapeRendering="crispEdges"
        />
      </g>
      <line x1="1" y1="4.39775" x2="9.43894" y2="4.39775" stroke="white" />
      <line x1="5.25064" x2="5.25064" y2="8.81595" stroke="white" />
      <path d="M8.2345 0.951538V0.983591" stroke="#FFFCFC" strokeLinecap="round" />
      <line x1="5.5" y1="8" x2="5.5" y2="11" stroke="#FFFCFC" />
      <line x1="12" y1="4.5" x2="8" y2="4.5" stroke="#FFFCFC" />
      <defs>
        <filter
          id="filter0_d_4_38"
          x="0.750641"
          y="3.9182"
          width="25.8156"
          height="24.6524"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_38" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_38" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default WrapIcon;
