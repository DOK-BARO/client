import { SolvingQuizQuestionType } from "@/types/QuizType";
import Button from "@/components/atom/Button/Button";
import { RadioOptionType } from "@/types/RadioTypes";
import RadioOption from "@/components/atom/RadioOption/RadioOption";
import useRadioGroup from "@/hooks/useRadioGroup";
import styles from "./_solving_quiz_form.module.scss"
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "@/store/quizAtom";
import { OptionStatusType } from "@/components/atom/RadioOption/RadioOption";
import { Check } from "@/svg/Check";
import { Close } from "@/svg/Close";
import { gray0 } from "@/styles/abstracts/colors";
import CheckBox from "@/components/atom/Checkbox/Checkbox";
import { CheckboxStatusType } from "@/components/atom/Checkbox/Checkbox";
import { CheckBoxOption } from "@/types/CheckBoxTypes";
//TODO: 중복함수 리팩토링 필요
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
		if (question.type === "MULTIPLE_CHOICE_SINGLE_ANSWER" || question.type === "OX") {
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

	const handleOXChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		const value = e.target.value;
		setSelectedOptions([value]);
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

	const renderMultiChoiceForm = (): JSX.Element => {
		return <>
			{
				question.selectOptions.map((option, index) => {
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
								if (isChecked) { // 내가 체크했는데 틀린 선지
									typeName = "solving-incorrect"
								} else { // 체크하지 않았고 답도 아닌 선지
									typeName = "option-default"
								}

							}
						}
					}
					return <RadioOption
						key={index}
						radioGroupName={question.id.toString()}
						option={radioOption}
						checked={isChecked}
						onChange={handleSelectOptions}
						disabled={optionDisabled}
						labelValue={option.content}
						type={typeName}
					/>;

				})
			}
		</>

	}

	const renderCheckBoxForm = (): JSX.Element => {
		return <>
			{
				question.selectOptions.map((option, index) => {
					const checkBoxOption: CheckBoxOption = {
						id: index,
						value: index.toString(),
						label: option.content,
					}
					let isChecked: boolean = false;
					let isCorrect: boolean = false;
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
								if (isChecked) { // 내가 체크했는데 틀린 선지
									typeName = "solving-incorrect"
								} else { // 체크하지 않았고 답도 아닌 선지
									typeName = "checkbox-default"
								}
							}
						}
					}

					return <CheckBox
						key={checkBoxOption.id}
						id={checkBoxOption.id.toString()}
						checked={checkedOptions[checkBoxOption.id]}
						onChange={handleCheckBoxChange}
						disabled={optionDisabled}
						value={option.content}
						type={typeName}
					/>;
				})
			}
		</>

	}

	const renderOXForm = (): JSX.Element => {
		const options: RadioOptionType[] = [{
			id: 1,
			value: "O",
			label: "맞아요",
		},
		{
			id: 2,
			value: "X",
			label: "아니에요",
		}];
		return <>
			{options.map((option) => {
				let isChecked: boolean = false;
				let isCorrect: boolean = false;
				let typeName: OptionStatusType = "option-default";
				if (selectedRadioOption) {
					isChecked = selectedRadioOption === option.value;
					if (isChecked) { // 체크 되었을 때
						typeName = "option-selected";
					}
					if (correctAnswer?.length) { // 채점되었고 
						isCorrect = correctAnswer.includes(option.value);
						if (isCorrect) { // 맞는 선지일때 (내가 선택한거랑 상관없이 초록색 적용)
							typeName = "solving-correct"
						} else {
							if (isChecked) { // 내가 체크했는데 틀린 선지
								typeName = "solving-incorrect"
							} else { // 체크하지 않았고 답도 아닌 선지
								typeName = "option-default"
							}

						}
					}

				}
				return (
					<RadioOption
						radioGroupName={question.id.toString()}
						option={option}
						checked={isChecked}
						onChange={handleOXChanges}
						disabled={optionDisabled}
						labelValue={option.label}
						type={typeName}
					/>

				);

			})
			}

		</>
	}

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
				{question.type === "OX" &&
					renderOXForm()
				}
				{
					question.type === "MULTIPLE_CHOICE_SINGLE_ANSWER" &&
					renderMultiChoiceForm()
				}
				{
					question.type === "MULTIPLE_CHOICE_MULTIPLE_ANSWER" &&
					renderCheckBoxForm()
				}
			</div>

		</section>
	);
}