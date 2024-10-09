import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const Visible: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M14.4016 12.0287C14.4016 13.3185 13.327 14.3641 12.0016 14.3641C10.6761 14.3641 9.60156 13.3185 9.60156 12.0287C9.60156 10.7389 10.6761 9.69336 12.0016 9.69336C13.327 9.69336 14.4016 10.7389 14.4016 12.0287Z"
        stroke={props.stroke}
        strokeWidth="2"
      />
      <path
        d="M11.9984 18.8553C19.3215 18.9751 21.5984 12.1187 21.5984 12.1187C21.5984 12.1187 19.4138 5.14258 11.9984 5.14258C4.58305 5.14258 2.39844 12.1187 2.39844 12.1187C2.39844 12.1187 4.67536 18.7356 11.9984 18.8553Z"
        stroke={props.stroke}
        strokeWidth="2"
      />
    </svg>
  );
};
