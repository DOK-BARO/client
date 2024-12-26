import styles from "./_quiz_result.module.scss";
import Button from "@/components/atom/button/button";
import CommonQuizResult from "./composite/commonQuizResult";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StudyQuizResult from "./composite/studyQuizResult";
import { useState } from "react";

export default function Index() {
	const [currentStep] = useState<number>(0);
	const navigate = useNavigate();
	const { quizId,solvingQuizId, quizTitle } = useParams<{ quizId: string,solvingQuizId:string, quizTitle: string }>();
	if (!quizId || !solvingQuizId || !quizTitle) {
		return;
	}

	const steps:{order:number, component: JSX.Element}[] = [
		{
			order: 0,
			component: <CommonQuizResult solvingQuizId={solvingQuizId}/>
		},
		{
			order: 1,
			component: <StudyQuizResult />
		}
	];

	const handleGoToNext = () => {
		// TODO: 스터디참여인 경우 스터디내에 순위확인 -> 1번으로
		// 아닌경우 -> navigate
		// if()
		navigate(`/quiz/review/${quizId}/${solvingQuizId}/${quizTitle}`, { replace: false, });
	}

	return (
		<section className={styles["container"]}>
			<h2 className={styles["sr-only"]}>퀴즈 결과화면</h2>
			{steps[currentStep].component}
			<Button
				color="primary"
				size="medium"
				onClick={handleGoToNext}>다음</Button>
		</section>
	);
}