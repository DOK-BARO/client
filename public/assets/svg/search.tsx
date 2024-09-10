import { SVGProps } from "../../../src/types/SVGProps";
import React from "react";

export const Search: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
