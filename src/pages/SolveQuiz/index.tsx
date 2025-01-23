import styles from "./_solve_quiz.module.scss";
import SolvingQuizForm from "./composite/SolvingQuizForm";
import ProgressBar from "./composite/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { ErrorType } from "@/types/ErrorType";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import useModal from "@/hooks/useModal";
import Textarea from "@/components/atom/Textarea/Textarea";
import Modal from "@/components/atom/Modal/Modal";
import CheckBox from "@/components/atom/Checkbox/Checkbox";
import ImageLayer from "@/components/layout/ImageLayer/ImageLayer";

export interface AnswerImageType {
  index: number;
  src: string;
}

// TODO: 신고하기 모달 컴포넌트 분리 (중복 사용됨)
export default function Index() {
  const warning = "/assets/svg/solvingQuizFormLayout/warning.svg";
  const [solvingQuizId, setSolvingQuizId] = useState<number>();
  const { quizId } = useParams<{
    quizId: string;
  }>();

  const [clickedImage, setClickedImage] = useState<AnswerImageType | undefined>(
    undefined,
  );

  // 해설 이미지 클릭 시 확대 보기
  const handleImageClicked = (image: AnswerImageType) => {
    setClickedImage(image);
  };

  useEffect(() => {
    quizService.startSolvingQuiz(quizId!).then(({ id }) => {
      setSolvingQuizId(id!);
    });
  }, []);

  // 퀴즈 개별 신고
  const { mutate: reportQuiz } = useMutation<
    { id: number } | null,
    ErrorType,
    { questionId: number; contents: string[] }
  >({
    mutationFn: ({ questionId, contents }) =>
      quizService.reportQuizQuestion({ questionId, contents }),
    onSuccess: (data) => {
      if (!data) {
        toast.error("퀴즈 신고에 실패했습니다.");
        return;
      }

      toast.success("퀴즈가 신고되었습니다.");
      closeReportModal();
      openReportConfirmModal();
    },
  });

  const reportReasonList = [
    { id: 1, text: "비속어 또는 비방 내용이 포함되어 있어요.", checked: false },
    { id: 2, text: "문제 또는 해설 내용에 오류가 있어요.", checked: false },
    { id: 3, text: "도서와 무관한 문제 또는 해설이에요.", checked: false },
    { id: 4, text: "스팸/광고 내용이 포함되어 있어요.", checked: false },
    { id: 5, text: "기타", checked: false },
  ];

  const [reportReasons, setReportReasons] = useState<
    {
      id: number;
      text: string;
      checked: boolean;
    }[]
  >(reportReasonList);

  const {
    isModalOpen: isReportModalOpen,
    openModal: openReportModal,
    closeModal: closeReportModal,
  } = useModal();

  const {
    isModalOpen: isReportConfirmModalOpen,
    openModal: openReportConfirmModal,
    closeModal: closeReportConfirmModal,
  } = useModal();

  // const [reportQuestionIndex, setReportQuestionIndex] = useState<number>();

  // const handleOpenReportModal = (questionIndex: number) => {
  //   setReportQuestionIndex(questionIndex); // 신고하기 누른 퀴즈 번호
  //   openReportModal();
  // };

  // const modalRef = useRef<HTMLDivElement>(null);
  // const buttonRef = useRef<HTMLButtonElement>(null);

  // 기타 사유
  const {
    value: OtherGrounds,
    onChange: onOtherGroundsChange,
    textareaRef: OtherGroundsRef,
    resetTextarea: resetOtherGrounds,
  } = useAutoResizeTextarea("", 40, 3); // TODO: Textarea 미세한 높이 차이 22.5 -> 23
  const [selectedReportReason, setSelectedReportReason] = useState<string[]>(
    [],
  );

  useEffect(() => {
    resetOtherGrounds();
    setSelectedReportReason([]);
    setReportReasons(reportReasonList);
  }, [isReportModalOpen]);

  useEffect(() => {
    const reportReasonTextList = reportReasons.filter(
      (reason) => reason.checked,
    );
    setSelectedReportReason(reportReasonTextList.map((item) => item.text));
  }, [reportReasons]);

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
    const isMultipleAnswerType: boolean =
      quiz?.questions[currentFormIndex].type ===
      "MULTIPLE_CHOICE_MULTIPLE_ANSWER";
    if (isMultipleAnswerType) {
      const selectedSingleAnswer: boolean = (selectedOptions.length ?? 0) <= 1;
      // console.log(quiz?.questions[currentFormIndex].selectOptions.length);
      // console.log(selectedSingleAnswer);
      if (selectedSingleAnswer) {
        toast.error("답안을 2개 이상 선택해주세요");
        return;
      }
    }

    if (!solvingQuizId) {
      return;
    }

    setOptionDisabled(true);
    const questionId: number = quiz!.questions[currentFormIndex].id;
    const solvingQuizIdToString: string = solvingQuizId.toString();
    const checkedResult: QuestionCheckedResult =
      await quizService.submitQuestion(
        solvingQuizIdToString,
        questionId,
        selectedOptions,
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
      const params: QuizResultRouteParams = {
        quizId: parseInt(id),
        solvingQuizId: parseInt(solvingId), // TODO 제거
        quizTitle: quizTitle,
        studyGroupId: quiz?.studyGroupId?.toString() ?? "",
      };
      navigate(ROUTES.QUIZ_RESULT(params), { replace: true });
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
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    setReportReasons(
      reportReasons.map((reason) =>
        reason.id === Number(id)
          ? { ...reason, checked: !reason.checked }
          : reason,
      ),
    );
  };

  const handleReportQuiz = () => {
    const selectedReportReasonFiltered = selectedReportReason.map((reason) =>
      reason === "기타" ? OtherGrounds : reason,
    );

    reportQuiz({
      questionId: quiz.questions[currentFormIndex].id,
      contents: selectedReportReasonFiltered,
    });
  };

  const handleGoBackToQuizDetail = () => {
    navigate(ROUTES.QUIZ_DETAIL(quiz.id));
  };

  // 화살표 클릭 시
  const handleArrowClick = (direction: "left" | "right") => {
    setClickedImage((prev) => {
      if (!prev || !questionCheckedResult?.answerExplanationImages)
        return undefined;

      const newIndex = direction === "left" ? prev.index - 1 : prev.index + 1;

      if (
        newIndex < 0 ||
        newIndex >= questionCheckedResult.answerExplanationImages.length
      ) {
        return prev;
      }

      return {
        index: newIndex,
        src: questionCheckedResult.answerExplanationImages[newIndex],
      };
    });
  };

  const handleCloseLayer = () => {
    setClickedImage(undefined);
  };

  return (
    <section className={styles["container"]}>
      {clickedImage !== undefined ? (
        <ImageLayer
          onCloseLayer={handleCloseLayer}
          image={clickedImage}
          onLeftArrowClick={() => handleArrowClick("left")}
          onRightArrowClick={() => handleArrowClick("right")}
        />
      ) : null}
      {isReportConfirmModalOpen ? (
        <Modal
          title="신고하기"
          closeModal={closeReportConfirmModal}
          contents={[{ title: "신고가 완료되었습니다.", content: <></> }]}
          bottomButtons={[
            {
              text: "퀴즈로 돌아가기",
              color: "primary-border",
              onClick: handleGoBackToQuizDetail,
            },
            {
              text: "계속 풀기",
              color: "primary",
              onClick: closeReportConfirmModal,
            },
          ]}
        />
      ) : null}
      {isReportModalOpen ? (
        <Modal
          title="신고하기"
          closeModal={closeReportModal}
          contents={[
            {
              title: `${quiz.title}의 문제 ${currentStep}번 신고 시, 검토 후 수정 요청이 안내됩니다.`,
              content: (
                <div>
                  {reportReasons.map((reason) => (
                    <CheckBox
                      key={reason.id}
                      id={reason.id.toString()}
                      type="checkbox-black"
                      value={reason.text}
                      onChange={handleCheckBoxChange}
                      checked={reason.checked}
                    />
                  ))}
                  {/* TODO: 입력 전/후 높이 차이 */}
                  {/* 기타 선택했을 때만 보이게 */}
                  {selectedReportReason.some((reason) => reason === "기타") ? (
                    <div className={styles["textarea-container"]}>
                      <Textarea
                        placeholder="기타 사유를 작성해 주세요."
                        maxLengthShow
                        maxLength={500}
                        onChange={onOtherGroundsChange}
                        value={OtherGrounds}
                        id="report-content"
                        textAreaRef={OtherGroundsRef}
                        size="small"
                        rows={1}
                      />
                    </div>
                  ) : null}
                </div>
              ),
            },
          ]}
          // disabled: 하나 이상 선택했을 떄만 활성화되도록
          bottomButtons={[
            {
              text: "신고하기",
              color: "primary",
              onClick: handleReportQuiz,
              disabled:
                selectedReportReason.length < 1 ||
                selectedReportReason.some(
                  (reason) => reason === "기타" && OtherGrounds === "",
                ),
            },
          ]}
        />
      ) : null}
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
            onClick={openReportModal}
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
            <div className={styles["markdown-content"]}>
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
                      onClick={() => {
                        handleImageClicked({ index, src: image });
                      }}
                    />
                  ),
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
          ableAnimation
        >
          채점하기
        </Button>
      )}
      {didAnswerChecked && (
        <div
          className={`
          ${styles[toggleAnswerDescription ? "slideIn" : ""]}`}
        >
          <div
            className={`
              ${styles["footer-btn-container"]}
            ${didAnswerChecked ? styles.visible : ""}
          `}
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
              {currentStep === quiz!.questions.length
                ? "점수 보기"
                : "다음문제"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
