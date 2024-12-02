import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const ArrowRight: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M7 15L12 10L7 5"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
