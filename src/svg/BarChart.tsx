import { primary, secondary } from "@/styles/abstracts/colors";
import { SVGProps } from "@/types/SVGProps";

interface BarChartProps extends SVGProps {
  level: number;
}

export const BarChart: React.FC<BarChartProps> = ({ alt, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <path
        d="M3 14C3 12.8954 3.89543 12 5 12H7C8.10457 12 9 12.8954 9 14V21H3V14Z"
        fill={props.level >= 1 ? primary : secondary}
      />
      <path
        opacity="1"
        d="M10 9C10 7.89543 10.8954 7 12 7H14C15.1046 7 16 7.89543 16 9V21H10V9Z"
        fill={props.level >= 2 ? primary : secondary}
      />
      <path
        opacity="1"
        d="M17 5C17 3.89543 17.8954 3 19 3H21C22.1046 3 23 3.89543 23 5V21H17V5Z"
        fill={props.level >= 3 ? primary : secondary}
      />
    </svg>
  );
};
