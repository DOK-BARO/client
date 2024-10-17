import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const AlignJustify: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path d="M2 3L18 3M2 7.33333L18 7.33333M2 11.6667L18 11.6667M2 16L18 16" stroke={props.stroke} stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};
