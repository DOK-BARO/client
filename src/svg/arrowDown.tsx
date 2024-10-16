import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const ArrowDown: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path d="M7 10L12.0008 14.58L17 10" stroke={props.stroke} strokeWidth="2" strokeLinecap="round"
        strokeLinejoin={"round"}/>
    </svg>
  );
};
