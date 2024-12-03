import React, { useEffect } from "react";
import styles from "./_radio_option.module.scss";
import { RadioOptionType } from "@/types/RadioTypes";
// TODO: 아이콘 변경 필요
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { systemSuccess, systemDanger } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors";
import { useState } from "react";

interface RadioOptionProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	option: RadioOptionType; //TODO: id, check,value 나눠서 써도 될듯
	type?: "option-writing" | "option-default" | "option-correct" | "option-incorrect" | "option-add" | "option-selected";
	selectedValue: string | null; // TODO sected option으로 이름변경
	isDisabled: boolean; //TODO: disabled로 이름변경
	radioGroupName: string;
	labelValue: string; //TODO: 그냥 value로 이름변경
	handleLabelValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fullWidth?: boolean;
	deleteOption?: (id: number) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
	option,
	selectedValue,
	onChange,
	type = "option-default", //TOOD: 기본설정 확인
	isDisabled,
	fullWidth = false,
	labelValue,
	handleLabelValueChange,
	radioGroupName,
	deleteOption = () => { },
}) => {

	const containerClassName = `
			${styles["radio-button-container"]}
			${styles["radio-button-item"]}
			${fullWidth ? styles["full"] : ""}
			${styles[type]}
			`
		;

	const labelClassName = `${styles["new-option-text-input"]}`;

	const icon = () => {
		if (type) {
			if (type === "option-correct") {
				return <CheckIcon style={{ color: systemSuccess }} />;
			} else if (type === "option-incorrect") {
				return <CloseIcon style={{ color: systemDanger }} />;

			} else {
				return null;;
			}
		}
	}

	return (
		<div
			key={option.id}
			className={containerClassName}
		>
			<label className={styles["new-option-label-container"]}>
				<div className={styles["radio-button"]}>
					<input
						type="radio"
						name={radioGroupName}
						value={option.value}
						checked={selectedValue === option.value}
						onChange={onChange}
						disabled={isDisabled}
						id={option.value}
					/>

					{
						type === "option-writing" ? (
							<input
								id={`${option.id}`}
								name={"radio-group"}
								value={labelValue}
								onChange={handleLabelValueChange}
								className={labelClassName}
							/>
						)
							:
							(
								<div className={`${styles["new-option-label"]}`}>{labelValue}</div>
							)
					}

				</div>
			</label>

			{type === "option-writing" && (
				<button
					className={styles["delete-option-button"]}
					onClick={() => {
						deleteOption(option.id);
					}}
				>
					<Close width={20} height={20} stroke={gray90} strokeWidth={2} />
				</button>
			)}
			{
				icon &&
				<div className={styles["radio-button-item-icon"]}>{icon()}</div>
			}
		</div>
	);
};

export default RadioOption;