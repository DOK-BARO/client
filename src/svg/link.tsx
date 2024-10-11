import { SVGProps } from "@/types/SVGProps";
import React from "react";

export const Link: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M7.379 10.1905L5.14554 12.424C4.31141 13.2581 3.83173 14.3931 3.8405 15.5859C3.84926 16.7787 4.31844 17.9206 5.19216 18.7673C6.03884 19.641 7.18097 20.1102 8.37359 20.119C9.59342 20.1279 10.7015 19.6753 11.5357 18.8411L13.7692 16.6077M16.622 13.8094L18.8554 11.576C19.6896 10.7418 20.1692 9.60687 20.1605 8.41406C20.1517 7.22124 19.6825 6.07936 18.8088 5.23262C17.9623 4.38614 16.8204 3.91693 15.6276 3.90816C14.4348 3.8994 13.2997 4.35185 12.4655 5.18601L10.232 7.41946M8.61359 15.3271L15.314 8.62676"
        stroke={props.stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
