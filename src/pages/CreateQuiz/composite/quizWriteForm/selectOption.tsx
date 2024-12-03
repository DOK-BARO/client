import React from "react";
import { CheckBoxOption } from "@/types/CheckBoxTypes";
import useInput from "@/hooks/useInput.ts";
import styles from "./_question_form.module.scss";
import CheckBox from "@/pages/CreateQuiz/atom/checkBox/checkBox";
import { QuestionFormMode } from "@/data/constants";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { AnswerType, QuizQuestionType } from "@/types/QuizType";
import { RadioOptionType } from "@/types/RadioTypes";
import RadioOption from "@/components/atom/radioOption/radioOption";

interface SelectOptionProps {
	option: RadioOptionType | CheckBoxOption;
	deleteOption: (id: number) => void;
	selectedValue: string | null | { [key: string]: boolean };
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setText: (optionId: number, value: string) => void;
	questionFormId: string;
	quizMode: string;
	answerType: AnswerType;
	checked?: boolean;
}

const SelectOption: React.FC<SelectOptionProps> = ({
	option,
	deleteOption,
	selectedValue,
	onChange,
	setText,
	questionFormId,
	quizMode,
	answerType,
	checked,
}) => {
	const { onChange: onOptionChange, value: optionText } = useInput(option.label);
	const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

	const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onOptionChange(e);
		setText(option.id, e.target.value);

		const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions?.map((question) => {
			if (question.id.toString() === questionFormId!) {
				return {
					...question,
					selectOptions: question.selectOptions.map((selectOption) => {
						if (selectOption.id === option.id) {
							return { ...selectOption, option: e.target.value };
						}
						return selectOption;
					}),
				};
			}
			return question;
		}) ?? [];

		updateQuizCreationInfo("questions", updatedQuestions);
	};

	const isChecked = (typeof selectedValue === "string") ? (selectedValue === option.value) : selectedValue ? selectedValue[option.id] : false;

	return (
		<div
			key={option.id}
			className={styles["option-container"]}
		>
			{answerType === "MULTIPLE_CHOICE" ? (
				<RadioOption
					radioGroupName={questionFormId}
					option={option as RadioOptionType}
					selectedValue={typeof selectedValue === "string" ? selectedValue : ""}
					onChange={onChange}
					isDisabled={quizMode === QuestionFormMode.QUESTION}
					// className={`${styles["new-option"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
					className={`${styles["new-option"]}`}
					autoFocus={true}
					labelValue={optionText}
					handleLabelValueChange={onTextAreaChange}
					// focusedOptionIndex={focusedOptionIndex}
					type={quizMode === QuestionFormMode.QUESTION ? "option-writing" : "option-default"}
					deleteOption={deleteOption}
					fullWidth
				/>
			) : (
				<CheckBox
					id={option.id.toString()}
					checked={checked!}
					onChange={onChange}
					disabled={quizMode === QuestionFormMode.QUESTION}
					// className={`${styles["new-option"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
					className={`${styles["new-option"]}`}
					autoFocus={true}
					value={option.value}
					LabelComponent={
						quizMode === QuestionFormMode.QUESTION ? ( // TOOD: 변수화
							<input
								id={`${option.id}`}
								name={"checkbox-group"}
								value={optionText}
								onChange={onTextAreaChange}
								// className={`${styles["new-option-text-input"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
								className={`${styles["new-option-text-input"]}`}
								autoFocus
							/>
						) : (
							<div className={`${styles["new-option-label"]}`}>{optionText}</div>
						)
					}
				/>
			)}
			{/* {quizMode === QuestionFormMode.QUESTION && (
				<button
					className={styles["delete-option-button"]}
					onClick={() => {
						deleteOption(option.id);
					}}
				>
					<Close width={20} height={20} stroke={gray90} strokeWidth={2} />
				</button>
			)} */}



		</div>
	);
};

export default SelectOption;
