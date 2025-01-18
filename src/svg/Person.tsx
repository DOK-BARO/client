import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const Person: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      aria-labelledby="svgTitle"
      viewBox={`0 0 ${props.width} ${props.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>

      <path
        d="M20.002 38.0039C29.9442 38.0039 38.0039 29.9442 38.0039 20.002C38.0039 10.0597 29.9442 2 20.002 2C10.0597 2 2 10.0597 2 20.002C2 29.9442 10.0597 38.0039 20.002 38.0039Z"
        fill="#D9D9D9"
      />
      <mask
        id="mask0_1468_32655"
        maskUnits="userSpaceOnUse"
        x="7"
        y="10"
        width="26"
        height="29"
      >
        <path
          d="M7 33.9695C7 28.4635 11.2714 24 20 24C28.7286 24 33 28.4635 33 33.9695C33 34.1528 32.974 34.3288 32.9262 34.4926C32.5987 35.6149 31.1031 35.7117 29.9754 36.0199L19.0714 39L10.2799 36.182C8.98481 35.7669 7.18494 35.5573 7.01489 34.208C7.00508 34.1302 7 34.0506 7 33.9695Z"
          fill="white"
        />
        <circle cx="20" cy="16" r="6" fill="white" />
      </mask>
      <g mask="url(#mask0_1468_32655)">
        <path
          d="M20.0059 38.0024C29.9481 38.0024 38.0078 29.9427 38.0078 20.0005C38.0078 10.0583 29.9481 1.99854 20.0059 1.99854C10.0637 1.99854 2.00391 10.0583 2.00391 20.0005C2.00391 29.9427 10.0637 38.0024 20.0059 38.0024Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
