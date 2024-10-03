import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const XCircle: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>

      <circle cx="12" cy="12.778" r="10" fill={props.fill} />
      <path
        d="M15 9.77808L12 12.7781M9 15.7781L12 12.7781M9 9.77808L12 12.7781M15 15.7781L12 12.7781"
        stroke={props.stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
