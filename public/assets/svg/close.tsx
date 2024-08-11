import React from "react";
import { SVGProps } from "../../../src/types/SVGProps";

export const Close: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M3.98975 3.99023L16.0106 16.011"
        stroke={props.stroke}
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <path
        d="M16.0103 3.99023L3.98944 16.011"
        stroke={props.stroke}
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </svg>
  );
};
