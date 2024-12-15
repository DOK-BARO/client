import { SVGProps } from "@/types/SVGProps";
import React from "react";

export const Copy: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M3.33398 9.06241L3.33398 14.5C3.33399 16.1568 4.67715 17.5 6.33402 17.5L11.7715 17.4999M8.33398 2.4999L13.959 2.4999C14.9945 2.4999 15.834 3.33937 15.834 4.3749L15.834 12.4999C15.834 13.5354 14.9945 14.3749 13.959 14.3749L8.33399 14.3749C7.29845 14.3749 6.45899 13.5354 6.45899 12.4999L6.45898 4.3749C6.45898 3.33937 7.29845 2.4999 8.33398 2.4999Z"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
