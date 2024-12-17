import styles from "./_checkbox.module.scss";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors";
import Textarea from "../textarea/textarea";
import correctIcon from "/assets/svg/common/correct.svg";
import inCorrectIcon from "/assets/svg/common/incorrect.svg";

export type CheckboxStatusType = "checkbox-writing"
	| "checkbox-written"
	| "checkbox-default"
	| "checkbox-correct"
	| "checkbox-incorrect"
	| "checkbox-selected"
	| "checkbox-add"
	| "solving-correct"
	| "solving-incorrect"
	;
interface CheckBoxProps {
	id: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: CheckboxStatusType;
	disabled?: boolean;
	className?: string;
	value: string;
	handleLabelValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	deleteOption?: (id: number) => void;
	textAreaRef?: React.RefObject<HTMLTextAreaElement>;
	fullWidth?: boolean;
}

export default function CheckBox({
	id,
	checked,
	type = "checkbox-default",
	onChange,
	value,
	handleLabelValueChange = () => { },
	deleteOption = () => { },
	fullWidth,
	textAreaRef,
	disabled,
}: CheckBoxProps) {
	const optionMaxLength = 500;

	const containerClassName = `
	${styles["option-container"]}
	${fullWidth ? styles["full"] : ""}
	${styles[type]}
	`;

	const icon = () => {
		if (type) {
			if (type === "checkbox-correct") {
				return <img src={correctIcon} alt="정답인 선지입니다" />;
			} else if (type === "checkbox-incorrect") {
				return <img src={inCorrectIcon} alt="오답인 선지입니다" />;

			} else {
				return null;;
			}
		}
	}

	return (
		<div className={containerClassName}>
			<label className={`${styles["option-label"]}`}>
				<input
					id={id}
					type="checkbox"
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					value={value}
				/>
			<div className={styles["checkbox"]}></div>
				{type === "checkbox-writing" ? (
					<Textarea
						id={id}
						value={value}
						onChange={handleLabelValueChange}
						className={styles["option-label-textarea"]}
						maxLength={optionMaxLength}
						textAreaRef={textAreaRef}
						autoFocus
						fullWidth
					/>
				) : (
					<div className={`${styles["option-label-value"]}`}>{value}</div>
				)}


				{type === "checkbox-writing" && (
					<button
						className={styles["delete-option-button"]}
						onClick={() => {
							deleteOption(parseInt(id));
						}}
					>
						<Close width={20} height={20} stroke={gray90} strokeWidth={2} />
					</button>
				)}
				{
					icon() &&
					<div>{icon()}</div>
				}
			</label>
		</div>
	);
}
