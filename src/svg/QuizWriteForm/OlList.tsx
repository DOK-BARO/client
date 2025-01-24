import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const OlList: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={"0 0 20 20"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M8.83431 5.00015H17.8343M8.8343 10.417H17.8343M9.00065 15.8337H17.8343M2.08398 13.3335C2.08398 12.8915 2.25958 12.4675 2.57214 12.155C2.8847 11.8424 3.30862 11.6668 3.75065 11.6668C4.19268 11.6668 4.6166 11.8424 4.92916 12.155C5.24172 12.4675 5.41732 12.8915 5.41732 13.3335C5.41732 13.826 5.00065 14.1668 4.58398 14.5835L2.08398 16.6668H5.41732M3.75065 8.3335V3.3335L2.08398 5.00016"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
