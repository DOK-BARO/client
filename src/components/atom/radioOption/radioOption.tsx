import React from "react";
import styles from "./_radio_option.module.scss";
import { RadioOptionType } from "@/types/RadioTypes";
// TODO: 아이콘 변경 필요
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { systemSuccess, systemDanger } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors";

interface RadioOptionProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	option: RadioOptionType;
	//TODO:  check, hover, focus상태는 type으로 나누는것보다 css 가상클래스로 처리하는게 나을듯 함. 하지만 확인해봐야 함
	// TODO: option 빼도 될듯
	type?: "option-writing" | "option-default" | "option-correct" | "option-incorrect" | "option-add";
	selectedValue: string | null;
	isDisabled: boolean;
	className?: string;
	autoFocus: boolean;
	// icon?: ReactElement | null;
	radioGroupName: string;
	labelValue: string;
	handleLabelValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fullWidth?: boolean;
	focusedOptionIndex?: number | null;
	deleteOption?: (id: number) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
	option,
	selectedValue,
	onChange,
	type = "option-default", //TOOD: 기본설정 확인
	isDisabled,
	className: customClassName,
	autoFocus = false,
	fullWidth = false,
	labelValue,
	handleLabelValueChange,
	radioGroupName,
	deleteOption,
}) => {
	const className = `${styles["radio-button-item"]} ${styles[customClassName ?? ""]} ${fullWidth ? styles["full"] : ""}`;
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
	const isChecked = (typeof selectedValue === "string") ? (selectedValue === option.value) : selectedValue ? selectedValue[option.id] : false;


	return (
		<div
			key={option.id}
			className={
				`${styles["radio-button-container"]}
			${styles["option-container"]} ${isChecked ? styles["checked"] : ""}
			${fullWidth ? styles["full"] : ""}`}
		>
			<label key={option.value} className={className}>
				<div className={styles["radio-button"]}>
					<input
						type="radio"
						name={radioGroupName}
						value={option.value}
						checked={selectedValue === option.value}
						onChange={onChange}
						disabled={isDisabled}
						autoFocus={autoFocus}
					/>
					{type === "option-writing" ? (
						<input
							id={`${option.id}`}
							name={"radio-group"}
							value={labelValue}
							onChange={handleLabelValueChange}
							className={labelClassName}
							autoFocus
						/>
					) : (
						<div className={`${styles["new-option-label"]}`}>{labelValue}</div>
					)
					}
				</div>
				{type === "option-writing" && (
					<button
						className={styles["delete-option-button"]}
						onClick={() => {
							deleteOption!(option.id);
						}}
					>
						<Close width={20} height={20} stroke={gray90} strokeWidth={2} />
					</button>
				)}
				{
					icon &&
					<div className={styles["radio-button-item-icon"]}>{icon()}</div>
				}
			</label>
		</div>
	);
};

export default RadioOption;