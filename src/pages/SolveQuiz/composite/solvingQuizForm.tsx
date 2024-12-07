import { SolvingQuizQuestionType } from "@/types/QuizType";
import Button from "@/components/atom/button/button";
import { RadioOptionType } from "@/types/RadioTypes";
import RadioOption from "@/components/atom/radioOption/radioOption";
import useRadioGroup from "@/hooks/useRadioGroup";
import styles from "./_solving_quiz_form.module.scss"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedOptions } from "@/store/quizAtom";

export default function SolvingQuizForm({
	question,
	setSubmitDisabled,
}: {
	question: SolvingQuizQuestionType;
	setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { selectedValue: selectedRadioOption, handleChange } = useRadioGroup('');
	const [, setSelectedOptions] = useAtom(selectedOptions);
	useEffect(()=>{
		if(selectedRadioOption){
			setSubmitDisabled(false);
		}
	},[selectedRadioOption]);

	const handleSelectOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		const option =(parseInt( e.target.value)+1).toString();
			setSelectedOptions([option]);
	}

	return (
		<section className={styles["container"]}>
			<div className={styles["title-area"]}>
				<Button size="xsmall" color="white">{question.type}</Button>
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
					if (selectedRadioOption) {
						const selectedOptionIdx: number = parseInt(selectedRadioOption);
						isChecked = selectedOptionIdx === index;
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
							disabled={false}
							labelValue={option.content}
							type={isChecked ? "option-selected" : "option-default"}
						/>
						</div>
					)

				})}
			</div>
		
		</section>
	);
}