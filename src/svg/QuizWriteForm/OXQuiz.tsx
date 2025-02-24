import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const OxQuiz: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M8.6 13.4H2.6C1.71634 13.4 1 12.818 1 12.1V4.3C1 3.58203 1.71634 3 2.6 3H8.2C9.08366 3 9.8 3.58203 9.8 4.3V6.25M9.8 16H15.4C16.2837 16 17 15.418 17 14.7V6.9C17 6.18203 16.2837 5.6 15.4 5.6H9.8C8.91634 5.6 8.2 6.18203 8.2 6.9V14.7C8.2 15.418 8.91634 16 9.8 16Z"
        stroke="#8E8E8E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
