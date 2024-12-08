import React from "react";
import styles from "./_solve_quiz.module.scss";
import SolvingQuizForm from "./composite/solvingQuizForm";
import ProgressBar from "./composite/progressBar";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useState } from "react";
import Button from "@/components/atom/button/button";
import { ArrowRight } from "@/svg/arrowRight";
import { gray0 } from "@/styles/abstracts/colors";
import { useAtom } from "jotai";
import { selectedOptionsAtom, solvingQuizIdAtom } from "@/store/quizAtom";
import { QuestionCheckedResult } from "@/types/QuizType";
import toast from "react-hot-toast";

export default function Index() {
	const { quizId } = useParams<{ quizId: string }>();
	if (!quizId) {
		return;
	}
	const warning = "/assets/svg/solvingQuizFormLayout/warning.svg";
	const navigate = useNavigate();

	const [solvingQuizId, setSolvingQuizIdAtom] = useAtom(solvingQuizIdAtom);
	const { data: quiz, isLoading: isQuizLoading, error } = useQuery({
		queryKey: quizKeys.detail(quizId),
		queryFn: () => quizService.fetchQuiz(quizId),
		retry: false,
	});
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
	const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
	const [questionCheckedResult, setQuestionCheckedResult] = useState<QuestionCheckedResult>();
	const [optionDisabled, setOptionDisabled] = useState<boolean>(false);
	const [didAnswerChecked, setDidAnswerChecked] = useState<boolean>(false);
	const [toggleAnswerDescription, setToggleAnswerDescription] = useState<boolean>(false);

	//TODO: 퀴즈 풀러가기 버튼 핸들러 구현 지점에서 사용될 hook으로 만들어도 될듯
	// navigate(`/quiz/${bookDetailContent.id}`);
	const handleTestBtn = async () => {
		// 퀴즈 풀기 시작시 넣어야 하는 로직
		const { id } = await quizService.startSolvingQuiz(quizId.toString());
		setSolvingQuizIdAtom(id);
	}

	const handleQuestionSubmit = async (_: React.MouseEvent<HTMLButtonElement>) => {
		setOptionDisabled(true);
		const questionId: number = quiz?.questions[currentStep - 1].id ?? 0;
		const solvingQuizIdToString: string = solvingQuizId.toString();
		const checkedResult: QuestionCheckedResult = await quizService.submitQuestion(solvingQuizIdToString, questionId, selectedOptions);

		if (checkedResult) {
			setQuestionCheckedResult(checkedResult)
			setDidAnswerChecked(true);
		}
	}

	const handleShowAnswerDescriptionBtn = () => {
		setToggleAnswerDescription(!toggleAnswerDescription);
	}

	const handleNextQuestionBtn = () => {
		const endStep = quiz!.questions.length;

		if (endStep === currentStep) {
			return;
		} else {
			// 초기화 작업
			setOptionDisabled(false);
			setSubmitDisabled(true);
			setSelectedOptions([]);
			setDidAnswerChecked(false);

			setCurrentStep((prev) => (prev + 1));
		}
	}

	const handleNoQuiz = () => {
		toast.error("퀴즈를 불러오는데 실패했습니다.\n없는 퀴즈일 수 있습니다.");
		navigate('/');
	}
	const handleError = (error: any) => {
		if (error.response?.status === 404) {
			handleNoQuiz();
		}
	};
	if (isQuizLoading) {
		return <>로딩</>
	}

	if (error) {
		handleError(error);
		return;
	}

	if (!quiz) {
		//TODO: 함수 분리
		handleNoQuiz();
		return;
	}


	return (
		<section className={styles["container"]}>
			<ProgressBar
				questions={quiz.questions}
				currentStep={currentStep}
			/>
			<div className={styles["inner-container"]}>
				<div className={styles["question-area"]}>
					<SolvingQuizForm
						optionDisabled={optionDisabled}
						setSubmitDisabled={setSubmitDisabled}
						question={quiz.questions[currentStep - 1]}
						correctAnswer={questionCheckedResult?.correctAnswer ?? []}
					/>
					<Button
						size="xsmall"
						color="transparent"
						iconPosition="left"
						icon={<img src={warning} />}
						className={styles["report"]}
					>신고하기</Button>
				</div>
				{toggleAnswerDescription
					&&
					<section className={styles["answer-description-area"]}>
						<Button
							color="secondary"
							size="xsmall"
							className={styles["answer-description"]}
						>해설</Button>
						{questionCheckedResult?.answerExplanationContent}
						{questionCheckedResult?.answerExplanationImages && (
							<section className={styles["image-area"]}>
								{questionCheckedResult?.answerExplanationImages.map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`해설 이미지 ${index + 1}`}
										className={styles["image"]}
									/>
								))}
							</section>
						)}
					</section>
				}
			</div>


			{
				!didAnswerChecked &&
				<Button
					onClick={handleQuestionSubmit}
					disabled={submitDisabled}
					color="primary"
					icon={<ArrowRight stroke={gray0} width={20} height={20} />}
					className={styles["footer-btn"]}
				>채점하기</Button>
			}

			{
				didAnswerChecked &&
				<div className={styles["footer-btn-container"]}>
					<Button
						onClick={handleShowAnswerDescriptionBtn}
						color="primary-border"
						className={styles["footer-btn"]}
					>해설보기</Button>
					<Button
						onClick={handleNextQuestionBtn}
						color="primary"
						icon={<ArrowRight stroke={gray0} width={20} height={20} />}
						className={styles["footer-btn"]}
					>다음문제</Button>
				</div>
			}
			{/* TODO: 책 상세 페이지에 들어갈 로직 (이 코드는 테스트용) */}
			<button
				onClick={() => handleTestBtn()}
			>퀴즈 풀기 시작 시 눌러야할 버튼</button>
		</section>
	);
}

