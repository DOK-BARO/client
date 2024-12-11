import { QuestionFormMode } from "@/data/constants.ts";
import RadioOption from "@/components/atom/radioOption/radioOption";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOptionType } from "@/types/RadioTypes.ts";
import { FC, useEffect } from "react";
import styles from "./_question_form.module.scss";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import { ChangeEvent } from "react";

export const OXQuestionTemplate: FC<{ questionFormMode?: string, questionFormId?: string }> = ({ questionFormMode, questionFormId }) => {

	const options: RadioOptionType[] = [{
		id: 1,
		value: "O",
		label: "O",
	},
	{
		id: 2,
		value: "X",
		label: "X",
	}];

	const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();
// TODO: 선택지를 1개이상 추가해주세요 에러남
	const {
		getQuestion,
	} = useQuestionTemplate("OX", questionFormId!);

	const setInitialAnswer = (): string => {
		const question = getQuestion();
		return question.answers[0];
	}

	const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(setInitialAnswer());
	const disabled: boolean = questionFormMode === QuestionFormMode.QUESTION;

	useEffect(() => {
		const question = getQuestion();
		// ChangeEvent 객체 생성
		const event: ChangeEvent<HTMLInputElement> = {
			target: {
				value: questionFormMode === QuestionFormMode.QUESTION ? "" : question.answers[0],
			},
		} as ChangeEvent<HTMLInputElement>;
		onRadioGroupChange(event);

	}, [questionFormMode]);

	const handleRadioGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		onRadioGroupChange(event);

		const updatedQuestions = quizCreationInfo.questions?.map((question) => question.id.toString() === questionFormId ? { ...question, answers: [value] } : question) ?? [];
		updateQuizCreationInfo("questions", updatedQuestions)
	}

	return (
		<fieldset className={styles["question-options"]}>
			<legend>답안 선택지</legend>
			{
				options.map((option) => {
					// TODO: 동작 확인 필요
					let isChecked;
					isChecked = selectedRadioGroupValue === option.label;
					return (
						<div
							key={option.id}
							className={`${styles["option-container"]} 
            ${selectedRadioGroupValue === option.label && (questionFormMode === QuestionFormMode.ANSWER) ? styles["checked"] : styles["notchecked"]}`}
						>
							{/* 	<RadioOption
								radioGroupName={question.id.toString()}
								option={radioOption}
								checked={isChecked}
								onChange={handleSelectOptions}
								disabled={optionDisabled}
								labelValue={option.content}
								type={typeName}
							/> */}
							<RadioOption
								radioGroupName={questionFormId?.toString()!}
								option={option}
								checked={isChecked}
								onChange={handleRadioGroupChange}
								disabled={disabled}
								labelValue={option.value}
								// TODO: 구현 안함
								type={"option-default"}
							/>
						</div>)
				}
				)}
		</fieldset>
	);
};