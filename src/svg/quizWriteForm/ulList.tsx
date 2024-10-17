import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const UlList: React.FC<SVGProps> = ({ alt, ...props }) => {
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
        d="M8.71961 6H21.5996M8.71961 12.48H21.5996M8.71961 18.96H21.5996M3.59961 6V6.0128M3.59961 12.48V12.4928M3.59961 18.96V18.9728"
        stroke="#1D1D1D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};
