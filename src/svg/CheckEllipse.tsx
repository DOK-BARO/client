import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  alt?: string;
  fillOut?: string;
  fillIn?: string;
}

export const CheckEllipse: React.FC<SVGProps> = ({
  alt,
  fillOut,
  fillIn,
  ...props
}) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      aria-labelledby="svgTitle"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>

      <g clipPath="url(#clip0_2008_2526)">
        <circle cx="9.99967" cy="10.0002" r="9.16667" fill={fillOut} />
        <path
          d="M6.25 10L8.75 12.5L13.75 7.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2008_2526">
          <rect width="20" height="20" fill={fillIn} />
        </clipPath>
      </defs>
    </svg>
  );
};
