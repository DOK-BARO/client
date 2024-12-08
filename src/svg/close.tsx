import React from "react";
import { SVGProps } from "@/types/SVGProps";

export const Close: React.FC<SVGProps> = ({ alt, ...props }) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox={`0 0 27 26`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title id="svgTitle">{alt}</title>
			<path d="M19.3099 7.58325L8.47656 18.4166M19.3099 18.4166L8.47656 7.58325" 
			stroke={props.stroke}
			strokeWidth={props.strokeWidth}
			stroke-linecap="round" />
		</svg>
	);
};
