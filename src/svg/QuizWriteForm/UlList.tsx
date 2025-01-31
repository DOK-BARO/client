import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const UlList: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      className={props.className}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M6.53922 5H16.1992M6.53922 9.86H16.1992M6.53922 14.72H16.1992M2.69922 5V5.0096M2.69922 9.86V9.8696M2.69922 14.72V14.7296"
        stroke={props.stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
