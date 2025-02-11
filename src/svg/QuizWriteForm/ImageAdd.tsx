import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const ImageAdd: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      stroke={props.stroke}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M6.19714 20.9343L15.2557 12.4086L19.5186 16.6714M6.19714 20.9343H16.8543C18.62 20.9343 20.0514 19.5029 20.0514 17.7371V12.4086M6.19714 20.9343C4.43141 20.9343 3 19.5029 3 17.7371V7.08001C3 5.31427 4.43141 3.88287 6.19714 3.88287H13.1243M18.9857 9.02859L18.9857 6.01429M18.9857 6.01429L18.9857 3M18.9857 6.01429L15.9714 6.01429M18.9857 6.01429L22 6.01429M9.39428 8.67858C9.39428 9.56144 8.67858 10.2771 7.79571 10.2771C6.91285 10.2771 6.19714 9.56144 6.19714 8.67858C6.19714 7.79571 6.91285 7.08001 7.79571 7.08001C8.67858 7.08001 9.39428 7.79571 9.39428 8.67858Z"
        stroke="#1D1D1D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
