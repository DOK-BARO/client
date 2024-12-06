import React from "react";
import styles from "./_solve_quiz.module.scss";
import SolvingQuizForm from "./composite/solvingQuizForm";
import ProgressBar from "./composite/progressBar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useState } from "react";
import Button from "@/components/atom/button/button";
import { ArrowRight } from "@/svg/arrowRight";
import { gray0 } from "@/styles/abstracts/colors";
export default function Index() {
	//TODO: 퀴즈 풀러가기 버튼 핸들러 구현 지점에서 사용될 hook으로 만들어도 될듯
	// await quizService.startSolvingQuiz(bookDetailContent.id.toString());
	// navigate(`/quiz/${bookDetailContent.id}`);
	const { quizId } = useParams<{ quizId: string }>();
	if (!quizId) return;

	const { data: quiz, isLoading: isQuizLoading } = useQuery({
		queryKey: quizKeys.detail(quizId),
		queryFn: () => quizService.fetchQuiz(quizId),
	});
	const [currentStep, setCurrentStep] = useState<number>(1);

	const handleQuestionSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
		const endStep = quiz!.questions.length;


		if (endStep === currentStep) {
			console.log("end: ", endStep, "currnet:", currentStep);
			return;
		} else {
			setCurrentStep((prev) => (prev + 1));
		}
	}

	const warning = "/assets/svg/solvingQuizFormLayout/warning.svg";

	// TODO 에러처리 필요
	if (!quiz) {
		return <div>퀴즈 없음</div>
	}
	if (isQuizLoading) {
		return <>로딩</>
	}
	return (
		<section>
			<ProgressBar
				questions={quiz.questions}
				currentStep={currentStep}
			/>
			<div className={styles["container"]}>
				<div className={styles["inner-container"]}>
					<SolvingQuizForm
						question={quiz.questions[currentStep - 1]}
					/>
					<Button
						size="xsmall"
						color="transparent"
						iconPosition="left"
						icon={<img src={warning} />}
						className={styles["report"]}
					>신고하기</Button>
				</div>
				<Button
					onClick={handleQuestionSubmit}
					disabled={false}
					color="primary"
					icon={<ArrowRight stroke={gray0} width={20} height={20} />}
					className={styles["submit"]}
				>채점하기</Button>
			</div>
		</section>
	);
}

