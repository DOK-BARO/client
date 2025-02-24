import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const TrashCan: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M2.66602 4.11765H13.3327M5.99935 2H9.99935M6.66602 11.1765V6.94118M9.33268 11.1765V6.94118M10.3327 14H5.66602C4.92964 14 4.33268 13.3679 4.33268 12.5882L4.02828 4.85292C4.0125 4.45189 4.31529 4.11765 4.69437 4.11765H11.3043C11.6834 4.11765 11.9862 4.45189 11.9704 4.85292L11.666 12.5882C11.666 13.3679 11.0691 14 10.3327 14Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
