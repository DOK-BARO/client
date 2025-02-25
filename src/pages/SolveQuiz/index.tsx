import styles from "./_solve_quiz.module.scss";
import SolvingQuizForm from "./composite/SolvingQuizForm";
import ProgressBar from "./composite/ProgressBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { quizKeys, studyGroupKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useEffect, useState } from "react";
import Button from "@/components/atom/Button/Button";
import { ArrowRight } from "@/svg/ArrowRight";
import { gray00, gray60 } from "@/styles/abstracts/colors";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "@/store/quizAtom";
import { QuestionCheckedResultType } from "@/types/QuizType";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/xcode.css";
import toast from "react-hot-toast";
import ROUTES from "@/data/routes";
import { QuizResultRouteType } from "@/types/ParamsType";
import { ErrorType } from "@/types/ErrorType";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import useModal from "@/hooks/useModal";
import Textarea from "@/components/atom/Textarea/Textarea";
import Modal from "@/components/atom/Modal/Modal";
import CheckBox from "@/components/atom/Checkbox/Checkbox";
import ImageLayer from "@/components/layout/ImageLayer/ImageLayer";
import warning from "/public/assets/svg/solvingQuizFormLayout/warning.svg";
import { studyGroupService } from "@/services/server/studyGroupService";
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import { isLoggedInAtom, isUserLoadingAtom } from "@/store/userAtom";
import { skipGlobalErrorHandlingAtom } from "@/store/skipGlobalErrorHandlingAtom";
import { loginRedirectUrlAtom } from "@/store/authModalAtom";
import CodeInput from "@/components/composite/CodeInput/CodeInput";
import useCodeInput from "@/hooks/useCodeInput";
import usePreventPopState from "@/hooks/usePreventPopState";
import useImageLayer from "@/hooks/useImageLayer";
export interface AnswerImageType {
  index: number;
  src: string;
}
// TODO: 리팩토링 필요

// TODO: 신고하기 모달 컴포넌트 분리 (중복 사용됨)
export default function Index() {
  const [solvingQuizId, setSolvingQuizId] = useState<number>();

  const { quizId } = useParams<{
    quizId: string;
  }>();
  const {
    closeModal: closeQuizStartModal,
    openModal: openQuizStartModal,
    isModalOpen: isQuizStartModalOpen,
  } = useModal();

  const { pathname } = useLocation();
  const { isLoginModalOpen, closeLoginModal, openLoginModal } = useLoginModal();
  const {
    openModal: openStudyGroupCodeModal,
    closeModal: closeStudyGroupCodeModal,
    isModalOpen: isStudyGroupCodeModalOpen,
  } = useModal();
  // 초대코드 인풋 입력 페이지 (모달)
  const [isCodeInputStep, setIsCodeInputStep] = useState<boolean>(false);

  const {
    openModal: openJoinWelcomeModal,
    closeModal: closeJoinWelcomeModal,
    isModalOpen: isJoinWelcomeModalOpen,
  } = useModal();

  const {
    openModal: openPreventLeaveModal,
    closeModal: closePreventLeaveModal,
    isModalOpen: isPreventLeaveModalOpen,
  } = useModal();

  const [isUserLoading] = useAtom(isUserLoadingAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const location = useLocation();
  const isInternalNavigation = location.state?.fromInternal ?? false;

  const { mutate: startSolvingQuiz } = useMutation<
    { id: number } | null,
    ErrorType,
    string
  >({
    mutationFn: (quizId) => quizService.startSolvingQuiz(parseInt(quizId)),
    retry: false,
    onError: (error) => {
      if (error.code === 403) {
        // 스터디원이 아닌 경우
        setIsCodeInputStep(false); // 첫 페이지 (모달) (초기화)
        openStudyGroupCodeModal();
      }
    },
    onSuccess: (data) => {
      if (data) {
        setSolvingQuizId(data.id);
        if (!isInternalNavigation) {
          // 외부 공유 링크로 접근했을 시 -> 퀴즈 시작 확인 모달 오픈
          // 스터디원인 경우
          openQuizStartModal();
        }
        // 내부 버튼 클릭으로 접근했을 시 -> 바로 시작
      }
    },
  });

  const [, setSkipGlobalErrorHandling] = useAtom(skipGlobalErrorHandlingAtom);
  const [, setLoginRedirectUrl] = useAtom(loginRedirectUrlAtom);

  useEffect(() => {
    if (isInternalNavigation && quizId) {
      // 바로 퀴즈 시작
      startSolvingQuiz(quizId);
      return;
    }

    // 외부 링크로 직접 접근했을 경우에만
    setSkipGlobalErrorHandling(true);
    if (!isUserLoading && quizId) {
      if (!isLoggedIn) {
        // 1. 로그인 모달 띄우기
        setLoginRedirectUrl(pathname);

        openLoginModal();
      } else {
        // 스터디원인 경우, 아닌 경우 분기
        startSolvingQuiz(quizId);
      }
    }
  }, [isLoggedIn, quizId, isUserLoading]);

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
    // isLoading: isQuizLoading,
    // error,
  } = useQuery({
    queryKey: quizKeys.detail(parseInt(quizId!)),
    queryFn: () => (quizId ? quizService.fetchQuiz(parseInt(quizId)) : null),
    retry: false,
    enabled: !!quizId,
  });

  const { data: studyGroup } = useQuery({
    queryKey: studyGroupKeys.detail(quiz?.studyGroupId),
    queryFn: () =>
      quiz?.studyGroupId
        ? studyGroupService.fetchStudyGroup(quiz.studyGroupId)
        : null,
    retry: false,
    enabled: !!quiz?.studyGroupId,
  });

  const handleCloseQuizStartModal = () => {
    closeQuizStartModal();
    // 마이페이지 - 내 스터디 그룹으로 리다이렉팅
    navigate(`${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}`);
  };

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
  const [questionCheckedResult, setQuestionCheckedResult] =
    useState<QuestionCheckedResultType>();
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
      if (selectedSingleAnswer) {
        toast.error("답안을 2개 이상 선택해주세요");
        return;
      }
    }

    if (!solvingQuizId) {
      toast.error("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.");
      return;
    }

    setOptionDisabled(true);
    const questionId: number = quiz!.questions[currentFormIndex].id;
    const checkedResult: QuestionCheckedResultType =
      await quizService.submitQuestion(
        solvingQuizId,
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
      const params: QuizResultRouteType = {
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
  const popStateCallback = openPreventLeaveModal;
  usePreventPopState(popStateCallback);

  const handleReportQuiz = () => {
    if (!quiz) return;
    const selectedReportReasonFiltered = selectedReportReason.map((reason) =>
      reason === "기타" ? OtherGrounds : reason,
    );

    reportQuiz({
      questionId: quiz.questions[currentFormIndex].id,
      contents: selectedReportReasonFiltered,
    });
  };

  const handleGoBackToQuizDetail = () => {
    if (quiz) {
      navigate(ROUTES.QUIZ_DETAIL(quiz.id));
    }
  };

  const {
    handleCodeChange,
    handleKeyDown,
    handlePaste,
    codeList,
    combinedCode,
  } = useCodeInput();

  const [joinedStudyGroupInviteCode, setJoinedStudyGroupInviteCode] = useState<
    string | undefined
  >(undefined);

  const {
    data: studyGroupDetailByInviteCode,
    isLoading: isStudyGroupDetailLoading,
  } = useQuery({
    queryKey: studyGroupKeys.detailByInviteCode(joinedStudyGroupInviteCode),
    queryFn: ({ queryKey }) => {
      const [, code] = queryKey;
      if (code) {
        return studyGroupService.fetchStudyGroupDetailByInviteCode(code);
      }
    },
    enabled: !!joinedStudyGroupInviteCode,
  });

  // 훅 사용하기
  const { mutate: joinStudyGroup } = useMutation<void, ErrorType, string>({
    mutationFn: (inviteCode) => studyGroupService.joinStudyGroup(inviteCode),
    onError: () => {
      setIsMatch(false);
    },
    onSuccess: (_, inviteCode) => {
      setJoinedStudyGroupInviteCode(inviteCode);
    },
  });

  useEffect(() => {
    if (
      !isStudyGroupDetailLoading &&
      studyGroupDetailByInviteCode &&
      studyGroup
    ) {
      closeStudyGroupCodeModal();
      // 초대코드로 가입한 스터디가 퀴즈 스터디가 같은 스터디일 경우
      if (studyGroupDetailByInviteCode.id === studyGroup.id) {
        // 퀴즈 시작 모달 열기
        openQuizStartModal();
      } else {
        openJoinWelcomeModal();
      }
    }
  }, [isStudyGroupDetailLoading]);

  const handleJoinStudyGroupByCode = () => {
    joinStudyGroup(combinedCode);
  };

  const handleGoToStudyGroupPage = () => {
    navigate(ROUTES.STUDY_GROUP(studyGroupDetailByInviteCode?.id));
  };

  const handleStudyGroupCodeModal = () => {
    navigate(ROUTES.ROOT);
  };

  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);

  const {
    clickedImage,
    handleCloseLayer,
    handleArrowClick,
    handleImageClicked,
  } = useImageLayer(questionCheckedResult?.answerExplanationImages ?? []);

  return (
    <section className={styles["container"]}>
      {isLoginModalOpen && quizId ? (
        <LoginModal closeModal={closeLoginModal} />
      ) : null}
      {isStudyGroupCodeModalOpen ? (
        <Modal
          closeModal={handleStudyGroupCodeModal}
          title={!isCodeInputStep ? "" : "코드로 스터디 참여"}
          contents={[
            {
              title: !isCodeInputStep
                ? `${studyGroup?.name} 스터디원에게만 공개된 퀴즈예요.`
                : "초대코드를 입력해주세요.",
              content: !isCodeInputStep ? (
                <></>
              ) : (
                <div className={styles["code-input-container"]}>
                  <CodeInput
                    codeList={codeList}
                    isMatch={isMatch ?? true}
                    onCodeChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    borderColor="default"
                    errorMessage="올바르지 않은 그룹 코드입니다."
                  />
                </div>
              ),
            },
          ]}
          bottomButtons={[
            {
              text: !isCodeInputStep ? "코드 입력하기" : "완료",
              color: "primary",
              onClick: () => {
                !isCodeInputStep
                  ? setIsCodeInputStep(true)
                  : handleJoinStudyGroupByCode();
              },
            },
          ]}
        />
      ) : null}
      {isQuizStartModalOpen ? (
        <Modal
          closeModal={handleCloseQuizStartModal}
          title={studyGroup?.name}
          contents={[
            {
              title: `${quiz?.title} 퀴즈를 시작하시겠어요?`,
              content: <></>,
            },
          ]}
          bottomButtons={[
            {
              text: "퀴즈 풀기",
              color: "primary",
              onClick: closeQuizStartModal,
            },
          ]}
        />
      ) : null}
      {isJoinWelcomeModalOpen ? (
        <Modal
          closeModal={closeJoinWelcomeModal}
          title="스터디 추가하기"
          contents={[
            {
              title: `${studyGroupDetailByInviteCode?.name}에 가입하신 걸 환영해요!`,
              content: <></>,
            },
          ]}
          bottomButtons={[
            {
              text: "그룹 페이지 가기",
              color: "primary",
              onClick: handleGoToStudyGroupPage,
            },
          ]}
        />
      ) : null}
      {clickedImage !== undefined ? (
        <ImageLayer
          onCloseLayer={handleCloseLayer}
          image={clickedImage}
          onLeftArrowClick={(e) => handleArrowClick(e, "left")}
          onRightArrowClick={(e) => handleArrowClick(e, "right")}
        />
      ) : null}
      {isReportConfirmModalOpen ? (
        <Modal
          title="신고하기"
          closeModal={closeReportConfirmModal}
          contents={[{ title: "신고가 완료되었습니다.", content: <></> }]}
          bottomButtons={[
            {
              text: "홈으로 가기",
              color: "primary-border",
              onClick: handleGoBackToQuizDetail,
            },
            {
              text: "퀴즈로 돌아가기",
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
              title: `${quiz?.title}의 문제 ${currentStep}번 신고 시, 검토 후 수정 요청이 안내됩니다.`,
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
                        label="기타 사유"
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
      {quiz ? (
        <ProgressBar
          questions={quiz.questions}
          isAnswerCorrects={isAnswerCorrects}
          currentStep={currentStep}
        />
      ) : null}

      {quiz ? (
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
              icon={<img alt="" src={warning} />}
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
                        alt={`해설 사진 ${index + 1}`}
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
      ) : null}
      {!didAnswerChecked && (
        <Button
          onClick={handleQuestionSubmit}
          disabled={submitDisabled}
          color="primary"
          icon={
            <ArrowRight
              stroke={submitDisabled ? gray60 : gray00}
              width={20}
              height={20}
            />
          }
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
              {toggleAnswerDescription ? "해설닫기" : "해설보기"}
            </Button>
            <Button
              onClick={handleNextQuestionBtn}
              color="primary"
              icon={
                <ArrowRight stroke={gray00} width={20} height={20} alt="" />
              }
              className={styles["footer-btn"]}
            >
              {currentStep === quiz!.questions.length
                ? "점수 보기"
                : "다음문제"}
            </Button>
          </div>
        </div>
      )}
      {isPreventLeaveModalOpen && (
        <Modal
          showHeaderCloseButton={false}
          closeModal={closePreventLeaveModal}
          contents={[
            {
              title: `이 페이지를 벗어나면 현재까지 입력한 답안이 채점돼요.
                페이지를 이동하시겠어요?`,
              content: <></>,
            },
          ]}
          bottomButtons={[
            {
              text: "계속 풀기",
              color: "primary-border",
              onClick: () => {
                window.history.pushState(null, "", window.location.href);
                closePreventLeaveModal();
              },
            },
            {
              text: "나가기",
              color: "primary",
              onClick: () => {
                if (selectedOptions?.length) {
                  handleQuestionSubmit(); // 채점 후 나가기
                }

                navigate(-1);
                closePreventLeaveModal();
              },
            },
          ]}
        />
      )}
    </section>
  );
}
