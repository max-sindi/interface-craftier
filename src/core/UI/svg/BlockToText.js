import React from 'react'

const SVGBlockToText = ({ color = '#7D1ADF', ...props}) => {
  return (
    <svg width="68" height="26" viewBox="0 0 68 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#filter0_d)">
        <rect x="3.5" y="6.5" width="13" height="13" stroke={color}/>
      </g>
      <path d="M44.7816 13.0749C44.8678 12.9887 44.8678 12.8488 44.7816 12.7626L43.3762 11.3572C43.29 11.271 43.1502 11.271 43.0639 11.3572C42.9777 11.4435 42.9777 11.5833 43.0639 11.6695L44.3131 12.9188L43.0639 14.168C42.9777 14.2542 42.9777 14.394 43.0639 14.4803C43.1502 14.5665 43.29 14.5665 43.3762 14.4803L44.7816 13.0749ZM25 13C25.001 13.2208 25.001 13.2208 25.0012 13.2208C25.0013 13.2208 25.0015 13.2208 25.0018 13.2208C25.0024 13.2208 25.0032 13.2208 25.0044 13.2208C25.0066 13.2208 25.01 13.2208 25.0145 13.2208C25.0234 13.2207 25.0368 13.2207 25.0545 13.2206C25.0898 13.2204 25.1421 13.2202 25.2105 13.2199C25.3473 13.2193 25.548 13.2184 25.8038 13.2173C26.3153 13.2151 27.0472 13.2119 27.9286 13.2081C29.6914 13.2005 32.052 13.1904 34.4435 13.1802C39.227 13.1599 44.1325 13.1396 44.6254 13.1396L44.6254 12.6979C44.1313 12.6979 39.2241 12.7182 34.4416 12.7385C32.0501 12.7487 29.6895 12.7589 27.9267 12.7665C27.0453 12.7703 26.3134 12.7735 25.8018 12.7757C25.5461 12.7768 25.3454 12.7777 25.2086 12.7783C25.1402 12.7786 25.0878 12.7788 25.0525 12.7789C25.0349 12.779 25.0215 12.7791 25.0126 12.7791C25.0081 12.7791 25.0047 12.7791 25.0024 12.7792C25.0013 12.7792 25.0005 12.7792 24.9999 12.7792C24.9996 12.7792 24.9994 12.7792 24.9993 12.7792C24.9991 12.7792 24.999 12.7792 25 13Z"
            fill={color}/>
      <path d="M63.9771 16.8535H57.7222L56.3174 20.75H54.2871L59.9883 5.82031H61.7109L67.4224 20.75H65.4023L63.9771 16.8535ZM58.3169 15.2334H63.3926L60.8496 8.25049L58.3169 15.2334Z" fill={color}/>
      <defs>
        <filter id="filter0_d" x="0" y="3" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.490196 0 0 0 0 0.101961 0 0 0 0 0.87451 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>

  )
}

export default SVGBlockToText