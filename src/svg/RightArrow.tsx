import { SVGProps } from "@/types/SVGProps";
import React from "react";

const RightArrow: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width ?? 21}
      height={props.height ?? 20}
      viewBox={`0 0 ${props.width ?? 20 + 1} ${props.width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M7.5 4L13.5 10L7.5 16"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default RightArrow;
