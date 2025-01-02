import styles from "./_quiz_result.module.scss";
import Button from "@/components/atom/Button/Button";
import CommonQuizResult from "./composite/CommonQuizResult";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StudyQuizResult from "./composite/StudyQuizResult";
import { useState } from "react";

export default function Index() {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const navigate = useNavigate();
	const { quizId, solvingQuizId, quizTitle, studyGroupId } = useParams<{ quizId: string, solvingQuizId: string, quizTitle: string, studyGroupId?: string }>();


	const steps: { order: number; component: JSX.Element }[] = [
		{
			order: 0,
			component: <CommonQuizResult solvingQuizId={solvingQuizId!} />,
		},
		{
			order: 1,
			component: <StudyQuizResult studyGroupId={studyGroupId!} solvingQuizId={solvingQuizId!} quizTitle={quizTitle!} quizId={quizId!} />
		},
	];

	const handleGoToNext = () => {
		if (studyGroupId) {
			setCurrentStep(1);
		} else {
			navigate(`/quiz/review/${quizId}/${solvingQuizId}/${quizTitle}`, { replace: false });
		}
	};

	return (
		<section className={styles["container"]}>
			<h2 className={styles["sr-only"]}>퀴즈 결과화면</h2>
			{steps[currentStep].component}
			{
				currentStep !== 1 &&
				<Button
					color="primary"
					size="medium"
					onClick={handleGoToNext}>
					다음
				</Button>
			}
		</section>
	);
}
