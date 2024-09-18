import { SVGProps } from "../../../src/types/SVGProps";
import React from "react";

export const Check: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      className={props.className}
      style={props.style}
      role="img"
      aria-labelledby="svgTitle"
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <g clipPath="url(#clip0_482_3458)">
        <path d="M1 4L4 7L10 1" stroke={props.stroke || "none"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_482_3458">
          <rect
            width={props.width}
            height={props.height}
            stroke={props.stroke}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
