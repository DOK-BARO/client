import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const XLarge: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M20 4L4 20M20 20L4 4"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
