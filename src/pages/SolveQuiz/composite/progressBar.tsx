import { SolvingQuizQuestionType } from "@/types/QuizType";
import styles from "./_progress_bar.module.scss";

export default function ProgressBar({
	currentStep,
	questions,
}: {
	questions: SolvingQuizQuestionType[];
	currentStep: number;
}) {

	return (
		<section className={styles["progress-bar"]}>
			{
				questions.map((_, index) => {
					const questionIndex = index + 1;
					const className = (currentStep === questionIndex) ? styles["current-step"] : styles["step"];
					return (
						<div
							key={index}
							className={styles["step-container"]}>
							<div className={className}>
								{questionIndex}
							</div>
							<div className={styles["step-bar"]}></div>
						</div>
					)
				})
			}
		</section>
	);
}