import { SVGProps } from "../../../src/types/SVGProps";

export const QuizLevelBarChart: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      role="img"
      aria-labelledby="svgTitle"
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <g clipPath="url(#clip0_482_3458)">
        <path
          d="M3.33301 14C3.33301 12.8954 4.22844 12 5.33301 12H7.33301C8.43758 12 9.33301 12.8954 9.33301 14V21H3.33301V14Z"
          fill="#9747FF"
          stroke={props.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path opacity="0.1"
          d="M10.333 9C10.333 7.89543 11.2284 7 12.333 7H14.333C15.4376 7 16.333 7.89543 16.333 9V21H10.333V9Z"
          fill="#9747FF"
          stroke={props.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path opacity="0.1"
          d="M17.333 5C17.333 3.89543 18.2284 3 19.333 3H21.333C22.4376 3 23.333 3.89543 23.333 5V21H17.333V5Z"
          fill="#9747FF"
          stroke={props.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_482_3458">
          <rect
            width={props.width}
            height={props.height}
            stroke={props.stroke}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
