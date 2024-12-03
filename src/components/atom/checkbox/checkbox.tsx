import styles from "./_checkbox.module.scss";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { systemSuccess, systemDanger } from "@/styles/abstracts/colors";
import Textarea from "../textarea/textarea";

interface CheckBoxProps {
	id: string;//TODO: CheckBoxType사용
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: "checkbox-writing" | "checkbox-default" | "checkbox-correct" | "checkbox-incorrect" | "checkbox-add" | "checkbox-selected";
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
	className: customClassName = "",
	value,
	handleLabelValueChange = () => { },
	deleteOption = () => { },
	fullWidth,
	textAreaRef,
	disabled,
}: CheckBoxProps) {

	const containerClassName = `${styles["option-container"]}
	${fullWidth ? styles["full"] : ""}
	${styles[type]}
	`;

	const icon = () => {
		if (type) {
			if (type === "checkbox-correct") {
				return <CheckIcon style={{ color: systemSuccess }} />;
			} else if (type === "checkbox-incorrect") {
				return <CloseIcon style={{ color: systemDanger }} />;

			} else {
				return null;;
			}
		}
	}
	const optionMaxLength = 500;

	return (
		<div className={containerClassName}>
			<label className={`${styles["option-label"]} ${styles["outlined"]}`}>
				<input
					id={id}
					className={styles.checkbox}
					type="checkbox"
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					value={value}
				/>

				<div className={styles["checkbox-container"]}>
					<div className={styles["square"]} />
				</div>
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
				icon &&
				<div className={styles["option-label-icon"]}>{icon()}</div>
			}
	</label>
		</div>
	);
}
