import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const BlankQuiz: React.FC<SVGProps> = ({ alt, ...props }) => {
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
        d="M10.5 18H5.49999C4.39542 17.9999 3.49999 17.1045 3.5 15.9999L3.50008 3.99999C3.50008 2.89542 4.39551 2 5.50008 2H14.5003C15.6049 2 16.5003 2.89543 16.5003 4V7.5M12.5003 12.9566C12.5003 11.876 13.3957 11 14.5003 11C15.6049 11 16.5003 11.876 16.5003 12.9566C16.5003 14.0371 15.6049 14.9131 14.5003 14.9131M14.5003 17.5752V17.5"
        stroke={props.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};
