import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const Close: React.FC<SVGProps> = ({ alt, ...props }) => {
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
        d="M3.98975 3.99023L16.0106 16.011"
        stroke={props.stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16.0103 3.99023L3.98944 16.011"
        stroke={props.stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
};
