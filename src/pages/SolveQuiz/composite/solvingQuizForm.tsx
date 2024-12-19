import { SolvingQuizQuestionType } from "@/types/QuizType";
import Button from "@/components/atom/button/button";
import { RadioOptionType } from "@/types/RadioTypes";
import RadioOption from "@/components/atom/radioOption/radioOption";
import useRadioGroup from "@/hooks/useRadioGroup";
import styles from "./_solving_quiz_form.module.scss"
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "@/store/quizAtom";
import { OptionStatusType } from "@/components/atom/radioOption/radioOption";
import { Check } from "@/svg/check";
import { Close } from "@/svg/close";
import { gray0 } from "@/styles/abstracts/colors";
import CheckBox from "@/components/atom/checkbox/checkbox";
import { CheckboxStatusType } from "@/components/atom/checkbox/checkbox";
import { CheckBoxOption } from "@/types/CheckBoxTypes";

export default function SolvingQuizForm({
	formIndex,
	question,
	setSubmitDisabled,
	correctAnswer,
	optionDisabled,
	isAnswerCorrects,
	didAnswerChecked,
}: {
	formIndex: number,
	question: SolvingQuizQuestionType;
	optionDisabled: boolean;
	setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	correctAnswer: string[];
	isAnswerCorrects: boolean[];
	didAnswerChecked: boolean;
}) {
	const [, setSelectedOptions] = useAtom(selectedOptionsAtom);
	const { selectedValue: selectedRadioOption, handleChange, setSelectedValue } = useRadioGroup('');
	const [checkedOptions, setCheckedOptions] = useState<{ [key: string]: boolean; }>({});

	useEffect(() => {
		if (question.type === "MULTIPLE_CHOICE_SINGLE_ANSWER") {
			if (selectedRadioOption) {
				setSubmitDisabled(false);
			}
		} else if (question.type === "MULTIPLE_CHOICE_MULTIPLE_ANSWER") {
			let haveCheckedOption = Object.values(checkedOptions).find((value) => value)
			if (haveCheckedOption) {
				setSubmitDisabled(false);
			} else {
				setSubmitDisabled(true);
			}
		}
	}, [selectedRadioOption, JSON.stringify(checkedOptions)]);

	useEffect(() => {
		setSelectedValue('');
	}, [question]);

	const handleSelectOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		const option = (parseInt(e.target.value) + 1).toString();
		setSelectedOptions([option]);
	}

	const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;

		setCheckedOptions((prev) => {
			return {
				...prev,
				[id]: checked,
			};
		});
		setSelectedOptions((prev) => {
			const answerIdx: string = (parseInt(id) + 1).toString();
			if (checked) {
				return [...prev, answerIdx];
			} else {
				return prev.filter((prevId) => prevId !== answerIdx);
			}
		});
		console.log("%o", checkedOptions);

	}

	const getQuizType = (): string => {
		if (question.type === "MULTIPLE_CHOICE_SINGLE_ANSWER") {
			return "단수 정답";
		} else if (question.type === "MULTIPLE_CHOICE_MULTIPLE_ANSWER") {
			return "복수정답";
		} else if (question.type === "OX") {
			return "OX 퀴즈"
		}
		return "";
	}

	const isCorrect = isAnswerCorrects[formIndex];

	return (
		<section className={styles["container"]}>
			<div className={styles["title-area"]}>
				<Button size="xsmall" color="white">{getQuizType()}</Button>
				<div className={styles["title-wrapper"]}>
					{didAnswerChecked &&
						<div className={isCorrect ? styles["tag-correct"] : styles["tag-incorrect"]}>
							{
								isCorrect ?
									<Check
										stroke={gray0}
										width={26}
										height={26}

									/>
									:
									<Close
										stroke={gray0}
										width={26}
										height={26}
										strokeWidth={2.1}
									/>
							}
						</div>
					}
					<h2>{question.content.toString()}</h2>
				</div>
			</div>
			<div
				className={styles["options-area"]}
			>
				{question.selectOptions.map((option, index) => {

					const selectOption = (): JSX.Element => {
						if (question.type === "MULTIPLE_CHOICE_SINGLE_ANSWER") {
							const radioOption: RadioOptionType = {
								id: index,
								value: index.toString(),
								label: option.content,
							}
							let isChecked: boolean = false;
							let isCorrect: boolean = false;
							let typeName: OptionStatusType = "option-default";
							if (selectedRadioOption) {
								const selectedOptionIdx: number = parseInt(selectedRadioOption);
								isChecked = selectedOptionIdx === index;
								if (isChecked) { // 체크 되었을 때
									typeName = "option-selected";
								}
								if (correctAnswer?.length) { // 채점되었고 
									const correctAnswerIdx: string[] = correctAnswer.map((answer) => (parseInt(answer) - 1).toString());
									isCorrect = correctAnswerIdx.includes(index.toString());
									if (isCorrect) { // 맞는 선지일때 (내가 선택한거랑 상관없이 초록색 적용)
										typeName = "solving-correct"
									} else {
										typeName = "solving-incorrect"
									}
								}
							}
							return <RadioOption
								radioGroupName={question.id.toString()}
								option={radioOption}
								checked={isChecked}
								onChange={handleSelectOptions}
								disabled={optionDisabled}
								labelValue={option.content}
								type={typeName}
							/>;
						}
						else {
							//TODO: OX퀴즈
							// else if(question.type === "MULTIPLE_CHOICE_MULTIPLE_ANSWER"){
							const checkBoxOption: CheckBoxOption = {
								id: index,
								value: index.toString(),
								label: option.content,
							}
							let isChecked: boolean = false;
							let isCorrect: boolean = false;
							// TODO: 체크박스 확인 필요
							let typeName: CheckboxStatusType = "checkbox-default";
							if (JSON.stringify(checkedOptions) !== '{}') {
								isChecked = checkedOptions[checkBoxOption.id]
								console.log("ccheckedId: ", checkBoxOption.id);
								if (isChecked) { // 체크 되었을 때
									typeName = "checkbox-selected";
								}
								if (correctAnswer?.length) { // 채점되었고 
									const correctAnswerIdx: string[] = correctAnswer.map((answer) => (parseInt(answer) - 1).toString());
									isCorrect = correctAnswerIdx.includes(index.toString());
									if (isCorrect) { // 맞는 선지일때 (내가 선택한거랑 상관없이 초록색 적용)
										typeName = "solving-correct"
									} else {
										typeName = "solving-incorrect"
									}
								}
							}

							return <CheckBox
								id={checkBoxOption.id.toString()}
								checked={checkedOptions[checkBoxOption.id]}
								onChange={handleCheckBoxChange}
								disabled={optionDisabled}
								value={option.content}
								type={typeName}
							/>;
						}

					}
					return (
						<div
							key={index}
							className={styles["option"]}>
							{selectOption()}
						</div>
					)

				})}
			</div>

		</section>
	);
}