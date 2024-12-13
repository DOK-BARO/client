import { SolvingQuizQuestionType } from "@/types/QuizType";
import Button from "@/components/atom/button/button";
import { RadioOptionType } from "@/types/RadioTypes";
import RadioOption from "@/components/atom/radioOption/radioOption";
import useRadioGroup from "@/hooks/useRadioGroup";
import styles from "./_solving_quiz_form.module.scss"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "@/store/quizAtom";
import { OptionStatusType } from "@/components/atom/radioOption/radioOption";
import { AnswerType } from "@/types/QuizType";

export default function SolvingQuizForm({
	question,
	setSubmitDisabled,
	correctAnswer,
	optionDisabled,
}: {
	question: SolvingQuizQuestionType;
	optionDisabled: boolean;
	setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	correctAnswer: string[];
}) {
	const [,setSelectedOptions] = useAtom(selectedOptionsAtom);
	const { selectedValue: selectedRadioOption, handleChange, setSelectedValue } = useRadioGroup('');

	useEffect(()=> {
		if(selectedRadioOption){
			setSubmitDisabled(false);
		}
	},[selectedRadioOption]);

	useEffect(() => {
		setSelectedValue('');
	},[question]);

	const handleSelectOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		const option = (parseInt(e.target.value) + 1).toString();
		setSelectedOptions([option]);
	}

	const getQuizType = ():string => {
		//TODO checkbox옵션 확인 필요
		if(question.type === "MULTIPLE_CHOICE" ){
			return "단수 정답";
		}else if(question.type ==="OX"){
			return "OX"
		}
		return "";
	}

	return (
		<section className={styles["container"]}>
			<div className={styles["title-area"]}>
				<Button size="xsmall" color="white">{getQuizType()}</Button>
				<h2>{question.content.toString()}</h2>
			</div>
			<div
				className={styles["options-area"]}
			>
				{question.selectOptions.map((option, index) => {
					const radioOption: RadioOptionType = {
						id: index,
						value: index.toString(),
						label: option.content
					}
					let isChecked: boolean = false;
					let isCorrect: boolean = false;
					let typeName: OptionStatusType = "option-default";
					if (selectedRadioOption) {
						const selectedOptionIdx: number = parseInt(selectedRadioOption);
						isChecked = selectedOptionIdx === index;
						if (isChecked) { 	// 체크된 상태인데 맞았을 때
							typeName = "option-selected"
							if (correctAnswer?.length) {
								const correctAnswerIdx: string[] = correctAnswer.map((answer)=>(parseInt(answer)-1).toString());
								isCorrect = correctAnswerIdx.includes(index.toString());
								if (isCorrect) {
									typeName = "option-correct"
								}
							}
						}else{ 	// 체크 안했는데 그게 답일때
							if (correctAnswer?.length) {
								const correctAnswerIdx: string[] = correctAnswer.map((answer)=>(parseInt(answer)-1).toString());
								isCorrect = correctAnswerIdx.includes(index.toString());
								if (isCorrect) {
									typeName = "option-incorrect";
								}
							}
						}
					}
					return (
						<div
							key={radioOption.id}
							className={styles["option"]}>
							<RadioOption
								radioGroupName={question.id.toString()}
								option={radioOption}
								checked={isChecked}
								onChange={handleSelectOptions}
								disabled={optionDisabled}
								labelValue={option.content}
								type={typeName}
							/>
						</div>
					)

				})}
			</div>

		</section>
	);
}