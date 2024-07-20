import { SVGProps } from "../../types/SVGProps";

export const PlusCircle: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      role="img"
      aria-labelledby="svgTitle"
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <g clip-path="url(#clip0_482_3458)">
        <path
          d="M9.99984 6.66602V13.3327M6.6665 9.99935H13.3332M18.3332 9.99935C18.3332 14.6017 14.6022 18.3327 9.99984 18.3327C5.39746 18.3327 1.6665 14.6017 1.6665 9.99935C1.6665 5.39698 5.39746 1.66602 9.99984 1.66602C14.6022 1.66602 18.3332 5.39698 18.3332 9.99935Z"
          stroke={props.fill}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_482_3458">
          <rect width={props.width} height={props.height} fill={props.fill} />
        </clipPath>
      </defs>
    </svg>
  );
};
