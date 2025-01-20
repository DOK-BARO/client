import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const StudyRank: React.FC<SVGProps> = ({ alt, ...props }) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.553 0.548432C7.37909 -0.18281 8.62091 -0.182811 9.44699 0.548432L10.0833 1.11171C10.4484 1.43483 10.911 1.62647 11.3976 1.6561L12.2459 1.70777C13.3471 1.77483 14.2252 2.65293 14.2922 3.75413L14.3439 4.60238C14.3735 5.08897 14.5652 5.55164 14.8883 5.91667L15.4516 6.553C16.1828 7.37909 16.1828 8.62091 15.4516 9.44699L14.8883 10.0833C14.5652 10.4484 14.3735 10.911 14.3439 11.3976L14.2922 12.2459C14.2252 13.3471 13.3471 14.2252 12.2459 14.2922L11.3976 14.3439C10.911 14.3735 10.4484 14.5652 10.0833 14.8883L9.44699 15.4516C8.62091 16.1828 7.37909 16.1828 6.553 15.4516L5.91667 14.8883C5.55164 14.5652 5.08897 14.3735 4.60238 14.3439L3.75413 14.2922C2.65293 14.2252 1.77483 13.3471 1.70777 12.2459L1.6561 11.3976C1.62647 10.911 1.43483 10.4484 1.11171 10.0833L0.548432 9.44699C-0.18281 8.62091 -0.182811 7.37909 0.548432 6.553L1.11171 5.91667C1.43483 5.55164 1.62647 5.08897 1.6561 4.60238L1.70777 3.75413C1.77483 2.65293 2.65293 1.77483 3.75413 1.70777L4.60238 1.6561C5.08897 1.62647 5.55164 1.43483 5.91667 1.11171L6.553 0.548432Z"
        fill={props.fill}
      />
    </svg>
  );
};
