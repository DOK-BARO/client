import { SVGProps } from "../../../src/types/SVGProps";

export const StudyIcon: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      role="img"
      aria-labelledby="svgTitle"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="svgTitle">{alt}</title>
      <g clip-path="url(#clip0_1141_8838)">
        <path
          d="M18.3327 17.5V15.8333C18.3327 14.2801 17.2704 12.9751 15.8327 12.605M12.916 2.7423C14.1376 3.23679 14.9993 4.43443 14.9993 5.83333C14.9993 7.23224 14.1376 8.42988 12.916 8.92437M14.166 17.5C14.166 15.9469 14.166 15.1703 13.9123 14.5577C13.574 13.741 12.9251 13.092 12.1083 12.7537C11.4957 12.5 10.7192 12.5 9.16602 12.5H6.66602C5.11288 12.5 4.33631 12.5 3.72374 12.7537C2.90698 13.092 2.25806 13.741 1.91975 14.5577C1.66602 15.1703 1.66602 15.9469 1.66602 17.5M11.2493 5.83333C11.2493 7.67428 9.75696 9.16667 7.91602 9.16667C6.07507 9.16667 4.58268 7.67428 4.58268 5.83333C4.58268 3.99238 6.07507 2.5 7.91602 2.5C9.75696 2.5 11.2493 3.99238 11.2493 5.83333Z"
          stroke="#555555" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  );
};
