import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const Move: React.FC<SVGProps> = ({ alt, ...props }) => {
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
        d="M5.76158 15.363L2.39844 11.9999M2.39844 11.9999L5.76158 8.63676M2.39844 11.9999H21.5984M18.2353 15.363L21.5984 11.9999M21.5984 11.9999L18.2353 8.63676M8.63529 5.76304L11.9984 2.3999M11.9984 2.3999L15.3616 5.76304M11.9984 2.3999L11.9984 21.5999M8.63529 18.2368L11.9984 21.5999M11.9984 21.5999L15.3616 18.2368"
        stroke={props.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
