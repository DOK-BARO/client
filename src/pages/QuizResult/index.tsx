import styles from "./_quiz_result.module.scss";
import Button from "@/components/atom/button/button";
import Lottie from 'lottie-react';
import confetti from "@/animation/confetti.json";
import { useQuery } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { quizKeys } from "@/data/queryKeys";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Index() {
	const { quizId,solvingQuizId, quizTitle } = useParams<{ quizId: string,solvingQuizId:string, quizTitle: string }>();
	if (!quizId || !solvingQuizId || !quizTitle) {
		return;
	}
	const navigate = useNavigate();

	const { data, isLoading } = useQuery({
		queryKey: quizKeys.result(solvingQuizId),
		queryFn: () => quizService.fetchGradeResult(solvingQuizId),
	});

	const handleGoToNext = () => {
		// TODO: 스터디참여인 경우 스터디내에 순위확인

		navigate(`/quiz/review/${quizId}/${solvingQuizId}/${quizTitle}`, { replace: false, });
	}

	if (isLoading) {

		return (
			<div>로딩</div>
		);
	}

	return (
		<section className={styles["container"]}>
			<h2 className={styles["sr-only"]}>퀴즈 결과화면</h2>
			<p className={styles["title"]}>{data?.questionCount}문제 중에 <span>{data?.correctCount}</span>문제를 맞혔어요!</p>
			<Lottie className={styles["confetti"]} animationData={confetti} />
			<img className={styles["result-img"]} src="/assets/image/solving-quiz-complete.png" />
			<Button
				color="primary"
				size="medium"
				onClick={handleGoToNext}>다음</Button>
		</section>
	);

}