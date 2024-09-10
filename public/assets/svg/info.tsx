import { SVGProps } from "../../../src/types/SVGProps";
import React from "react";

export const Info: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      role="img"
      aria-labelledby="svgTitle"
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <g clipPath="url(#clip0_1141_8838)">
        <path
          d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z"
          stroke="#555555" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1141_8838">
          <rect width={props.width} height={props.width} fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};
