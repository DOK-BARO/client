import { SolvingQuizQuestionType } from "@/types/QuizType";
import styles from "./_progress_bar.module.scss";

export default function ProgressBar({
	questions,
}: {
	questions: SolvingQuizQuestionType[]; 
	// currentStep: number;
	// setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {

	return (
		<section className={styles["progress-bar"]}>
			{
				questions.map((_, index) => (
					<div className={styles["step-container"]}>
						<div className={styles["step"]}>
							{index + 1}
						</div>
						<div className={styles["step-bar"]}></div>
					</div>
				))
			}
		</section>
	);
}