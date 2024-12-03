import React from "react";
import { CheckBoxOption } from "@/types/CheckBoxTypes";
import useInput from "@/hooks/useInput.ts";
import styles from "./_question_form.module.scss";
import CheckBox from "@/components/atom/checkbox/checkbox";
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
					labelValue={optionText}
					handleLabelValueChange={onTextAreaChange}
					type={quizMode === QuestionFormMode.QUESTION ? "option-writing" : isChecked ? "option-correct": "option-default"}
					deleteOption={deleteOption}
					fullWidth
				/>
			) : (
				<CheckBox
					id={option.id.toString()}
					checked={checked!}
					onChange={onChange}
					disabled={quizMode === QuestionFormMode.QUESTION}
					// TODO: 이름 이상함
					className={`${styles["new-option"]}`}
					value={optionText}
					handleLabelValueChange={onTextAreaChange}
					deleteOption={deleteOption}
					type={quizMode === QuestionFormMode.QUESTION ? "checkbox-writing" : "checkbox-correct"}
				/>
			)}
		</div>
	);
};

export default SelectOption;
