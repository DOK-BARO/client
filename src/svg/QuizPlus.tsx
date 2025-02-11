import { SVGProps } from "@/types/SVGProps";
import React from "react";

export const QuizPlus: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      stroke={props.stroke}
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M11.9998 4.80005L11.9998 19.2M19.1998 12L4.7998 12"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
