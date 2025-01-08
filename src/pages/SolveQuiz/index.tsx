import styles from "./_solve_quiz.module.scss";
import SolvingQuizForm from "./composite/SolvingQuizForm";
import ProgressBar from "./composite/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useEffect, useState } from "react";
import Button from "@/components/atom/Button/Button";
import { ArrowRight } from "@/svg/ArrowRight";
import { gray0 } from "@/styles/abstracts/colors";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "@/store/quizAtom";
import { QuestionCheckedResult } from "@/types/QuizType";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/xcode.css";
import toast from "react-hot-toast";
import ROUTES from "@/data/routes";
import { QuizResultRouteParams } from "@/types/ParamsType";

export default function Index() {
	const [solvingQuizId, setSolvingQuizId] = useState<number>();
	const { quizId } = useParams<{
		quizId: string;
	}>();

	useEffect(()=>{
		quizService.startSolvingQuiz(quizId!).then(({id})=>{
			setSolvingQuizId(id!);
		});
	},[]);

	useEffect(()=>{
		console.log("solvingQuizId" , solvingQuizId);

	},[solvingQuizId]);

	const warning = "/assets/svg/solvingQuizFormLayout/warning.svg";
	const navigate = useNavigate();

	const {
		data: quiz,
		isLoading: isQuizLoading,
		error,
	} = useQuery({
		queryKey: quizKeys.detail(quizId),
		queryFn: () => (quizId ? quizService.fetchQuiz(quizId) : null),
		retry: false,
		enabled: !!quizId,
	});

	const [currentStep, setCurrentStep] = useState<number>(1);
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
	const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
	const [questionCheckedResult, setQuestionCheckedResult] =
		useState<QuestionCheckedResult>();
	const [optionDisabled, setOptionDisabled] = useState<boolean>(false);
	const [didAnswerChecked, setDidAnswerChecked] = useState<boolean>(false);
	const [toggleAnswerDescription, setToggleAnswerDescription] =
		useState<boolean>(false);
	const [isAnswerCorrects, setIsAnswerCorrects] = useState<boolean[]>([]);
	const currentFormIndex: number = currentStep - 1;

	const handleQuestionSubmit = async () => {
		if (!solvingQuizId) {
			return;
		}
		setOptionDisabled(true);
		const questionId: number = quiz!.questions[currentStep - 1].id;
		const solvingQuizIdToString: string = solvingQuizId.toString();
		const checkedResult: QuestionCheckedResult =
			await quizService.submitQuestion(
				solvingQuizIdToString,
				questionId,
				selectedOptions
			);

		if (checkedResult) {
			setQuestionCheckedResult(checkedResult);
			setDidAnswerChecked(true);
			setIsAnswerCorrects((prev) => [...prev, checkedResult.correct]);
		}
	};

	const handleShowAnswerDescriptionBtn = () => {
		setToggleAnswerDescription(!toggleAnswerDescription);
	};

	const handleNextQuestionBtn = () => {
		const endStep = quiz!.questions.length;

		if (endStep === currentStep && quizId && solvingQuizId) {
			const id: string = quizId.toString();
			const solvingId: string = solvingQuizId.toString();
			const quizTitle: string = quiz?.title ?? "";
			const params:QuizResultRouteParams = {
				quizId: parseInt(id),
				solvingQuizId: parseInt(solvingId), // TODO 제거
				quizTitle: quizTitle,
				studyGroupId: quiz?.studyGroupId?.toString() ?? "",
			}
			navigate(ROUTES.QUIZ_RESULT(params),{replace:false,});
			return;

		} else {
			// 초기화 작업
			setSubmitDisabled(true);
			setSelectedOptions([]);
			setQuestionCheckedResult(undefined);
			setOptionDisabled(false);
			setDidAnswerChecked(false);
			setToggleAnswerDescription(false);

			setCurrentStep((prev) => prev + 1);
		}
	};

	if (isQuizLoading || !solvingQuizId) {
		return <>로딩</>;
	}
	if (error || !quiz) {
		toast.error("퀴즈를 불러오는데 실패했습니다.\n없는 퀴즈일 수 있습니다.");
		navigate(ROUTES.ROOT);
		return;
	}

	return (
		<section className={styles["container"]}>
			<ProgressBar
				questions={quiz.questions}
				isAnswerCorrects={isAnswerCorrects}
				currentStep={currentStep}
			/>
			<div className={styles["inner-container"]}>
				<div className={styles["question-area"]}>
					<SolvingQuizForm
						formIndex={currentFormIndex}
						optionDisabled={optionDisabled}
						setSubmitDisabled={setSubmitDisabled}
						question={quiz.questions[currentFormIndex]}
						correctAnswer={questionCheckedResult?.correctAnswer ?? []}
						isAnswerCorrects={isAnswerCorrects}
						didAnswerChecked={didAnswerChecked}
					/>
					<Button
						size="xsmall"
						color="transparent"
						iconPosition="left"
						icon={<img src={warning} />}
						className={styles["report"]}
					>
						신고하기
					</Button>
				</div>
				{toggleAnswerDescription && (
					<section className={styles["answer-description-area"]}>
						<Button
							color="secondary"
							size="xsmall"
							className={styles["answer-description"]}
						>
							해설
						</Button>
						<div className={` ${styles["markdown-content"]}`}>
							<ReactMarkdown rehypePlugins={[rehypeHighlight]}>
								{questionCheckedResult?.answerExplanationContent}
							</ReactMarkdown>
						</div>
						{questionCheckedResult?.answerExplanationImages[0] && (
							<section className={styles["image-area"]}>
								{questionCheckedResult?.answerExplanationImages.map(
									(image, index) => (
										<img
											key={index}
											src={image}
											alt={`해설 이미지 ${index + 1}`}
											className={styles["image"]}
										/>
									)
								)}
							</section>
						)}
					</section>
				)}
			</div>

			{!didAnswerChecked && (
				<Button
					onClick={handleQuestionSubmit}
					disabled={submitDisabled}
					color="primary"
					icon={<ArrowRight stroke={gray0} width={20} height={20} />}
					className={styles["footer-btn"]}
				>
					채점하기
				</Button>
			)}
			{/* TODO: 없다가 나타나는 애니메이션 처리 필요 */}
			{didAnswerChecked && (
				<div
					className={`${styles["footer-btn-container"]} ${didAnswerChecked ? styles.visible : ""
						}`}
				>
					<Button
						onClick={handleShowAnswerDescriptionBtn}
						color="primary-border"
						className={styles["footer-btn"]}
					>
						해설보기
					</Button>
					<Button
						onClick={handleNextQuestionBtn}
						color="primary"
						icon={<ArrowRight stroke={gray0} width={20} height={20} />}
						className={styles["footer-btn"]}
					>
						{currentStep === quiz!.questions.length ? "점수 보기" : "다음문제"}
					</Button>
				</div>
			)}
		</section>
	);
}
