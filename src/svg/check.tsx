import React from "react";
import { SVGProps } from "@/types/SVGProps";
// TODO: props쓰는거 있는지 확인
export const Check: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.width}
      aria-labelledby="svgTitle"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>

      <path
        d="M6 10L9 13L15 7"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
