import React from "react";
import styles from "./_radio_option.module.scss";
import { RadioOptionType } from "@/types/RadioTypes";
// TODO: 아이콘 변경 필요
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { systemSuccess, systemDanger } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors";
import Textarea from "@/components/atom/textarea/textarea.tsx";

interface RadioOptionProps {
	option: RadioOptionType;
	type?: "option-writing" | "option-default" | "option-correct" | "option-incorrect" | "option-add" | "option-selected";
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	radioGroupName: string;
	disabled: boolean;
	labelValue: string;
	handleLabelValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	deleteOption?: (id: number) => void;
	textAreaRef?: React.RefObject<HTMLTextAreaElement>;
	fullWidth?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
	option,
	type = "option-default",
	checked,
	onChange,
	radioGroupName,
	disabled,
	labelValue,
	handleLabelValueChange = () => { },
	deleteOption = () => { },
	textAreaRef,
	fullWidth = false,
}) => {

	const containerClassName = `
			${styles["option-container"]}
			${fullWidth ? styles["full"] : ""}
			${styles[type]}
			`;

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
	const optionMaxLength = 500;

	return (
		<div
			key={option.id}
			className={containerClassName}
		>
			<label className={styles["option-label"]}>
				<input
					id={option.id.toString()}
					type="radio"
					name={radioGroupName}
					value={option.value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
				/>
				{
					type === "option-writing" ? (
						<Textarea
							id={`${option.id}`}
							value={labelValue}
							onChange={handleLabelValueChange}
							className={styles["option-label-textarea"]}
							maxLength={optionMaxLength}
							textAreaRef={textAreaRef}
							autoFocus
							fullWidth
						/>
					)
						:
						(
							<div className={`${styles["option-label-value"]}`}>{labelValue}</div>
						)
				}
		

			{type === "option-default" && (
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
				<div className={styles["option-label-icon"]}>{icon()}</div>
			}
				</label>
		</div>
	);
};

export default RadioOption;