import { SVGProps } from "@/types/SVGProps";
import React from "react";

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
        d="M14.3984 12.0289C14.3984 13.3187 13.3239 14.3642 11.9984 14.3642C10.673 14.3642 9.59844 13.3187 9.59844 12.0289C9.59844 10.7391 10.673 9.69353 11.9984 9.69353C13.3239 9.69353 14.3984 10.7391 14.3984 12.0289Z"
        stroke={props.stroke}
        stroke-width="2"
      />
    </svg>
  );
};
