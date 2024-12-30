import styles from "../_quiz_result.module.scss";
import Lottie from 'lottie-react';
import confetti from "@/animation/confetti.json";
import { useQuery } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { quizKeys } from "@/data/queryKeys";

export default function CommonQuizResult ({solvingQuizId}:{solvingQuizId: string}) {
	const { data, isLoading } = useQuery({
		queryKey: quizKeys.result(solvingQuizId),
		queryFn: () => quizService.fetchGradeResult(solvingQuizId),
	});

	if (isLoading) {
		return (
			<div>로딩</div>
		);
	}

	return (
		<section>
		<p className={styles["title"]}>{data?.questionCount}문제 중에 <span>{data?.correctCount}</span>문제를 맞혔어요!</p>
			<Lottie className={styles["confetti"]} animationData={confetti} />
			<img className={styles["result-img"]} src="/assets/image/solving-quiz-complete.png" /></section>
	);
}