import { SVGProps } from "../../../src/types/SVGProps";
import React from "react";

export const Quiz: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      role="img"
      aria-labelledby="svgTitle"
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.width}`}
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <g clipPath="url(#clip0_1141_8838)">
        <path
          d="M7.91554 9.58333L9.58221 11.25L13.3322 7.5M10.4155 16.6667C14.3276 16.6667 17.4989 13.4953 17.4989 9.58333C17.4989 5.67132 14.3276 2.5 10.4155 2.5C6.50352 2.5 3.33221 5.67132 3.33221 9.58333C3.33221 10.375 3.46208 11.1363 3.70168 11.8472C3.79185 12.1147 3.83693 12.2484 3.84506 12.3512C3.85309 12.4527 3.84702 12.5238 3.82192 12.6225C3.7965 12.7223 3.74037 12.8262 3.62812 13.034L2.26507 15.557C2.07064 15.9168 1.97343 16.0968 1.99519 16.2356C2.01414 16.3566 2.08533 16.4631 2.18985 16.5269C2.30985 16.6001 2.51329 16.579 2.92016 16.537L7.18768 16.0958C7.31691 16.0825 7.38153 16.0758 7.44042 16.0781C7.49835 16.0803 7.53924 16.0857 7.59573 16.0987C7.65317 16.112 7.72539 16.1398 7.86984 16.1954C8.65988 16.4998 9.51822 16.6667 10.4155 16.6667Z"
          stroke="#555555" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};
