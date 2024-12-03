import styles from "./_checkbox.module.scss";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { systemSuccess, systemDanger } from "@/styles/abstracts/colors";

interface CheckBoxProps {
	id: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: "checkbox-writing" | "checkbox-default" | "checkbox-correct" | "checkbox-incorrect" | "checkbox-add" | "checkbox-selected";
	disabled?: boolean;
	className?: string;
	value: string;
	handleLabelValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fullWidth?: boolean;
	deleteOption?: (id: number) => void;
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
	disabled,
}: CheckBoxProps) {
	const className = `${styles[customClassName]}
  ${styles.label} ${styles["outlined"]} ${fullWidth ? styles["full"] : ""}

  `

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
	return (
		<div className={
				`${styles["container"]}
			${styles["option-container"]} ${type==="checkbox-correct" ? styles["checked"] : ""}
			${fullWidth ? styles["full"] : ""}`}>
			<input
				id={id}
				className={styles.checkbox}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				value={value}
			/>

			<label className={className} htmlFor={id}>
				<div className={styles["checkbox-container"]}>
					<div className={styles["square"]} />
				</div>
				{type === "checkbox-writing" ? (
					<input
						id={`${id}`}
						name={"checkbox-group"}
						value={value}
						onChange={handleLabelValueChange}
						className={`${styles["new-option-text-input"]}`}
						autoFocus
					/>
				) : (
					<div className={`${styles["new-option-label"]}`}>{value}</div>
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
					<div className={styles["radio-button-item-icon"]}>{icon()}</div>
				}

			</label>
		</div>
	);
}
