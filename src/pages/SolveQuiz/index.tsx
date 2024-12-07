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
import { useAtom } from "jotai";
import { selectedOptions, solvingQuizIdAtom } from "@/store/quizAtom";

export default function Index() {
	const { quizId } = useParams<{ quizId: string }>();
	if (!quizId) return;
	
	const [solvingQuizId, setSolvingQuizIdAtom] = useAtom(solvingQuizIdAtom);
	const { data: quiz, isLoading: isQuizLoading } = useQuery({
		queryKey: quizKeys.detail(quizId),
		queryFn: () => quizService.fetchQuiz(quizId),
	});
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
	const [options] = useAtom(selectedOptions);

	//TODO: 퀴즈 풀러가기 버튼 핸들러 구현 지점에서 사용될 hook으로 만들어도 될듯
	// navigate(`/quiz/${bookDetailContent.id}`);
	const handleTestBtn = async() => {
		// 퀴즈 풀기 시작시 넣어야 하는 로직
		const {id} = await quizService.startSolvingQuiz(quizId.toString());
		console.log("id: %o",id);
		setSolvingQuizIdAtom(id);
	}

	const handleQuestionSubmit = async(_: React.MouseEvent<HTMLButtonElement>) => {
		const endStep = quiz!.questions.length;
		const questionId: number = quiz?.questions[currentStep - 1].id ?? 0;
		const solvingQuizIdToString:string = solvingQuizId.toString();
		console.log("index:%o",solvingQuizIdToString);
		await quizService.submitQuestion(solvingQuizIdToString,questionId,options);
		if (endStep === currentStep) {
			return;
		} else {
			setCurrentStep((prev) => (prev + 1));
			setSubmitDisabled(true);
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
						setSubmitDisabled={setSubmitDisabled}
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
					disabled={submitDisabled}
					color="primary"
					icon={<ArrowRight stroke={gray0} width={20} height={20} />}
					className={styles["submit"]}
				>채점하기</Button>
			</div>
			{/* TODO: 책 상세 페이지에 들어갈 로직 (이 코드는 테스트용) */}
			<button
			onClick={()=> handleTestBtn()}
			>퀴즈 풀기 시작 시 눌러야할 버튼</button>
		</section>
	);
}

