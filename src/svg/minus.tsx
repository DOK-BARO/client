import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const Minus: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M7 10H13"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10H13"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
