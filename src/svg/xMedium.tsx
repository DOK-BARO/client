import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const XMedium: React.FC<SVGProps> = ({ alt, ...props }) => {
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
        d="M18 6L6 18M18 18L6 6"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
