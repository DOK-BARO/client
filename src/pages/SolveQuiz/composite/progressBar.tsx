import { SolvingQuizQuestionType } from "@/types/QuizType";
import styles from "./_progress_bar.module.scss";
import { Check } from "@/svg/check";
import { gray0 } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close";

export default function ProgressBar({
	currentStep,
	questions,
	isAnswerCorrects,
}: {
	questions: SolvingQuizQuestionType[];
	currentStep: number;
	isAnswerCorrects: boolean[];
}) {
	return (
		<section className={styles["progress-bar"]}>
			{
				questions.map((_, index) => {
					const questionIndex = index + 1;
					const isCurrent = currentStep === questionIndex;
					let isCorrect;
					let isCheckedAnswer = isAnswerCorrects[index] !== undefined;
					let className = styles["step"];
					if (isCurrent) {
						className = styles["current-step"];
					}
					if (isCheckedAnswer) {
						isCorrect = isAnswerCorrects[index];
						console.log(isCorrect);
						if (isCorrect) {
							className = styles["correct-step"];
						} else {
							className = styles["incorrect-step"];
						}
					}
					return (
						<div
							key={index}
							className={styles["step-container"]}>
							<div className={className}>
								{
									isCheckedAnswer &&
									(isCorrect
										?
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
										/>)
								}
								{!isCheckedAnswer && questionIndex}
							</div>
							<div className={styles["step-bar"]}></div>
						</div>
					)
				})
			}
		</section>
	);
}