import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const OxQuiz: React.FC<SVGProps> = ({ alt, ...props }) => {
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
        d="M12.3738 8.87623C11.9832 8.4857 11.3501 8.4857 10.9596 8.87623C10.569 9.26675 10.569 9.89992 10.9596 10.2904L12.3738 8.87623ZM14.2929 13.6238C14.6834 14.0143 15.3166 14.0143 15.7071 13.6238C16.0976 13.2332 16.0976 12.6001 15.7071 12.2096L14.2929 13.6238ZM15.7071 10.2904C16.0976 9.89992 16.0976 9.26675 15.7071 8.87623C15.3166 8.4857 14.6834 8.4857 14.2929 8.87623L15.7071 10.2904ZM10.9596 12.2096C10.569 12.6001 10.569 13.2332 10.9596 13.6238C11.3501 14.0143 11.9832 14.0143 12.3738 13.6238L10.9596 12.2096ZM4 3.5H9.25V1.5H4V3.5ZM9.625 13.5H4V15.5H9.625V13.5ZM3.5 13V4H1.5V13H3.5ZM9.75 4V6.25H11.75V4H9.75ZM4 13.5C3.72386 13.5 3.5 13.2761 3.5 13H1.5C1.5 14.3807 2.61929 15.5 4 15.5V13.5ZM9.25 3.5C9.52614 3.5 9.75 3.72386 9.75 4H11.75C11.75 2.61929 10.6307 1.5 9.25 1.5V3.5ZM4 1.5C2.61929 1.5 1.5 2.61929 1.5 4H3.5C3.5 3.72386 3.72386 3.5 4 3.5V1.5ZM10.75 6.5H16V4.5H10.75V6.5ZM16.5 7V16H18.5V7H16.5ZM16 16.5H10.75V18.5H16V16.5ZM10.25 16V7H8.25V16H10.25ZM10.75 16.5C10.4739 16.5 10.25 16.2761 10.25 16H8.25C8.25 17.3807 9.36929 18.5 10.75 18.5V16.5ZM16.5 16C16.5 16.2761 16.2761 16.5 16 16.5V18.5C17.3807 18.5 18.5 17.3807 18.5 16H16.5ZM16 6.5C16.2761 6.5 16.5 6.72386 16.5 7H18.5C18.5 5.61929 17.3807 4.5 16 4.5V6.5ZM10.75 4.5C9.36929 4.5 8.25 5.61929 8.25 7H10.25C10.25 6.72386 10.4739 6.5 10.75 6.5V4.5ZM10.9596 10.2904L12.6262 11.9571L14.0404 10.5429L12.3738 8.87623L10.9596 10.2904ZM12.6262 11.9571L14.2929 13.6238L15.7071 12.2096L14.0404 10.5429L12.6262 11.9571ZM14.0404 11.9571L15.7071 10.2904L14.2929 8.87623L12.6262 10.5429L14.0404 11.9571ZM12.6262 10.5429L10.9596 12.2096L12.3738 13.6238L14.0404 11.9571L12.6262 10.5429Z"
        fill={props.stroke}
      />
      <path
        d="M8.16602 8.3335C8.16602 9.16192 7.49444 9.8335 6.66602 9.8335C5.83759 9.8335 5.16602 9.16192 5.16602 8.3335C5.16602 7.50507 5.83759 6.8335 6.66602 6.8335C7.49444 6.8335 8.16602 7.50507 8.16602 8.3335Z"
        fill={props.stroke}
        strokeWidth="2"
      />
    </svg>
  );
};
