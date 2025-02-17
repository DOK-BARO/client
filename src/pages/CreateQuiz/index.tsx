import styles from "./_create_quiz.module.scss";
import { useEffect, useMemo, useState } from "react";
import QuizSettingStudyGroupForm from "@/pages/CreateQuiz/composite/QuizSettingStudyGroupForm/QuizSettingStudyGroupForm";
import QuizWriteForm from "./composite/QuizWriteForm/QuizWriteForm";
import QuizSettingsForm from "./composite/QuizSettingsForm/QuizSettingsForm";
import QuizCreationFormLayout from "./layout/QuizCreationFormLayout/QuizCreationFormLayout";
import QuizCreationSteps from "./layout/QuizCreationSteps/QuizCreationSteps";
import MemoizedQuizBasicInfoForm from "@/pages/CreateQuiz/composite/QuizBasicInfoForm/QuizBasicInfoForm";
import {
  errorModalTitleAtom,
  isFirstVisitAtom,
  openErrorModalAtom,
  quizCreationInfoAtom,
  quizCreationStepAtom,
  quizGuideStepAtom,
  resetQuizCreationStateAtom,
  stepsCompletionStatusAtom,
} from "@/store/quizAtom.ts";
import { useAtom, useSetAtom } from "jotai";
import Modal from "@/components/atom/Modal/Modal.tsx";
import useModal from "@/hooks/useModal.ts";
import { Step } from "@/types/StepType.ts";
import QuizBookSelectionForm from "./composite/QuizBookSectionForm/QuizBookSelectionForm/QuizBookSelectionForm.tsx";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import { quizKeys } from "@/data/queryKeys.ts";
import { quizService } from "@/services/server/quizService.ts";
import { useQuery } from "@tanstack/react-query";
import {
  EditScopeType,
  QuizFormType,
  ViewScopeType,
} from "@/types/QuizType.ts";
import { BookType } from "@/types/BookType.ts";
import { bookService } from "@/services/server/bookService.ts";
import { studyGroupService } from "@/services/server/studyGroupService.ts";
import { StudyGroupType } from "@/types/StudyGroupType.ts";
import { SelectOptionFormType } from "@/types/QuizType.ts";
import { QuizQuestionFormType } from "@/types/QuizType.ts";
import { resetQuizCreationBookStateAtom } from "@/store/quizAtom.ts";
import usePreventLeave from "@/hooks/usePreventLeave.ts";
import { currentUserAtom } from "@/store/userAtom.ts";
import ROUTES from "@/data/routes.ts";
import { preventLeaveModalAtom } from "@/store/quizAtom.ts";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo.ts";
import QuizWriteGuideForm from "./composite/QuizWriteForm/QuizWriteGuideForm.tsx";
import { QUIZ_CREATION_STEP } from "@/data/constants.ts";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner.tsx";

export default function Index() {
  const { id } = useParams();
  const quizId = id && id !== ":id" ? id : null;
  const navigate = useNavigate();

  const [isEditMode] = useState<boolean>(!!quizId);
  const [completionStatus] = useAtom(stepsCompletionStatusAtom);

  const [, setQuizCreationInfo] = useAtom(quizCreationInfoAtom);
  const [preventLeaveModal] = useAtom(preventLeaveModalAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const blocker = useBlocker(true);
  const { closeModal: closePreventLeaveModal } = useModal();
  usePreventLeave();
  const { data: prevQuiz, isLoading: isPrevQuizLoading } = useQuery({
    queryKey: quizKeys.prevDetail(quizId!),
    queryFn: () => (quizId ? quizService.fetchQuizzesDetail(quizId) : null),
    enabled: isEditMode && !!quizId,
  });

  const { data: prevBook, isLoading: isBookLoading } = useQuery({
    queryKey: ["bookDetail", prevQuiz?.bookId],
    queryFn: () => bookService.fetchBook(prevQuiz?.bookId.toString() ?? ""),
    enabled: isEditMode && !!prevQuiz?.bookId,
  });

  const { data: studyGroupDetail, isLoading: isStudyGroupLoading } = useQuery({
    queryKey: ["studyGroupDetail", prevQuiz?.studyGroupId],
    queryFn: () =>
      studyGroupService.fetchStudyGroup(prevQuiz?.studyGroupId ?? -1),
    enabled: isEditMode && !!prevQuiz?.studyGroupId,
  });

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.ROOT);
      if (blocker.proceed) {
        blocker.proceed();
      }
    }
  }, [currentUser]);
  async function convertUrlsToImg(urls: string[]): Promise<JSX.Element[]> {
    const files = await Promise.all(
      urls.map(async (urls) => {
        return <img className={styles["image"]} src={urls} />;
      }),
    );
    return files;
  }

  useEffect(() => {
    async function initializeQuiz() {
      if (isEditMode) {
        const formattedBook: BookType = {
          id: prevBook?.id ?? -1,
          isbn: prevBook?.isbn ?? "",
          title: prevBook?.title ?? "",
          publisher: prevBook?.publisher ?? "",
          publishedAt: prevBook?.publishedAt ?? "",
          imageUrl: prevBook?.imageUrl ?? "",
          categories: prevBook?.categories ?? [],
          authors: prevBook?.authors ?? [],
        };

        let formattedStudyGroup: StudyGroupType | undefined = undefined;
        if (studyGroupDetail != undefined) {
          formattedStudyGroup = {
            id: studyGroupDetail?.id,
            name: studyGroupDetail?.name ?? "",
            profileImageUrl: studyGroupDetail?.profileImageUrl,
          };
        }
        const prevQuestions: QuizQuestionFormType[] = await Promise.all(
          prevQuiz?.questions.map(async (q) => {
            const images = await convertUrlsToImg(q.answerExplanationImages);
            const selectOptions: SelectOptionFormType[] = q.selectOptions.map(
              (optionText, index) => ({
                id: index, // TODO: index로 해도 되는지 확인 필요
                option: optionText,
                value: (index + 1).toString(),
                answerIndex: index + 1, // 퀴즈의 정답이 아닌 이 옵션의 고유 정답 번호 set
              }),
            );
            return {
              id: q.id!,
              content: q.content,
              selectOptions,
              answerExplanationContent: q.answerExplanationContent,
              answerExplanationImages: images,
              answerType: q.answerType,
              answers: q.answers,
            };
          }) ?? [],
        );

        const quiz: QuizFormType = {
          title: prevQuiz?.title ?? "",
          description: prevQuiz?.description ?? "",
          book: formattedBook,
          viewScope: prevQuiz?.viewScope as ViewScopeType,
          editScope: "CREATOR" as EditScopeType,
          studyGroup: formattedStudyGroup,
          questions: prevQuestions,
        };
        setQuizCreationInfo(quiz);
      }
    }
    initializeQuiz();
  }, [prevQuiz, isEditMode, prevBook?.isbn, studyGroupDetail?.name]);

  const [isFirstVisit, setIsFirstVisit] = useAtom(isFirstVisitAtom);
  const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();
  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");
    if (firstVisit === undefined) {
      setIsFirstVisit(true);
    } else if (firstVisit && firstVisit === "false") {
      setIsFirstVisit(false);
      updateQuizCreationInfo("questions", null);
    }
  }, [isFirstVisit, isEditMode]);

  useEffect(() => {
    localStorage.setItem("isEditMode", isEditMode ? "true" : "false");
  }, [isEditMode]);

  // TODO: 외부 파일로 옮기기
  const steps: Step[] = useMemo(
    () => [
      {
        order: QUIZ_CREATION_STEP.STUDY_GROUP_SELECT,
        icon: "👥",
        title: "스터디 그룹 선택",
        description: "퀴즈를 풀 스터디 그룹을 만들거나 선택해주세요.",
        formComponent: () => <QuizSettingStudyGroupForm />,
        isDone: completionStatus.isStudyGroupSelected,
      },
      {
        order: QUIZ_CREATION_STEP.BOOK_SELECT,
        icon: "📚",
        title: "도서 선택",
        description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
        formComponent: () => <QuizBookSelectionForm />,
        isDone: completionStatus.isBookSelected,
      },
      {
        order: QUIZ_CREATION_STEP.QUIZ_BASIC_INFO,
        icon: "🏆",
        title: "퀴즈 작성",
        subSteps: [
          {
            order: QUIZ_CREATION_STEP.QUIZ_BASIC_INFO_FORM,
            title: "퀴즈 기본 정보",
            description: "퀴즈 이름과 설명을 작성해주세요.",
            formComponent: () => <MemoizedQuizBasicInfoForm />,
          },
          {
            order: QUIZ_CREATION_STEP.QUIZ_WRITE_FORM,
            title: "문제 작성",
            description:
              "퀴즈의 질문을 작성한 후, 답안을 클릭하여 설정해주세요.",
            formComponent: () =>
              isFirstVisit && !isEditMode ? (
                <QuizWriteGuideForm />
              ) : (
                <QuizWriteForm />
              ),
          },
        ],
        isDone: completionStatus.isQuestionsWritten,
      },
      {
        order: QUIZ_CREATION_STEP.SETTING,
        icon: "🔗",
        title: "퀴즈 공유 설정",
        // description: "퀴즈를 볼 수 있는 사람과 편집 권한을 설정해 주세요.",
        description: "퀴즈를 볼 수 있는 사람을 설정해 주세요.",
        formComponent: () => <QuizSettingsForm />,
        isDone: completionStatus.isSet,
      },
    ],
    [completionStatus, isFirstVisit, isEditMode],
  );

  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const [errorModalTitle] = useAtom(errorModalTitleAtom);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [, setOpenErrorModal] = useAtom(openErrorModalAtom);
  const resetQuizState = useSetAtom(resetQuizCreationStateAtom);
  const resetBookState = useSetAtom(resetQuizCreationBookStateAtom);

  useEffect(() => {
    // // 임시 저장된 퀴즈가 있을 경우
    // const storedQuizCreationInfo = localStorage.getItem("quizCreationInfo");
    // if (storedQuizCreationInfo) {
    //   const parsedQuizInfo = JSON.parse(storedQuizCreationInfo);

    //   if (
    //     !(
    //       parsedQuizInfo.book === null ||
    //       parsedQuizInfo.description === null ||
    //       parsedQuizInfo.editScope === null ||
    //       parsedQuizInfo.questions === null ||
    //       parsedQuizInfo.title === null ||
    //       parsedQuizInfo.viewScope === null
    //     )
    //   ) {
    //     if (
    //       confirm(
    //         "이전에 작성중이던 퀴즈가 있습니다. 해당 퀴즈를 이어서 작성하시겠습니까?",
    //       )
    //     ) {
    //       setQuizCreationInfo(parsedQuizInfo);
    //       return;
    //     }
    //   }
    // }

    // 퀴즈 상태 초기화
    if (isEditMode) {
      setCurrentStep(2);
    } else {
      setCurrentStep(0);
    }

    resetQuizState();
    //console.log("퀴즈 상태 초기화");

    return () => {
      resetBookState();
    };
  }, []);

  useEffect(() => {
    setOpenErrorModal(() => openModal);
  }, [setOpenErrorModal]);

  // 퀴즈 문제 작성 가이드 스텝 초기화
  const [, setQuizGuideStepAtom] = useAtom(quizGuideStepAtom);
  useEffect(() => {
    if (isFirstVisit) {
      setQuizGuideStepAtom(1);
    }
  }, [isFirstVisit]);

  if (isPrevQuizLoading || isBookLoading || isStudyGroupLoading) {
    return <LoadingSpinner pageCenter width={40} />;
  }

  return (
    <section className={styles["container"]}>
      {isFirstVisit && !isEditMode && currentStep == 2.2 ? (
        <div className={styles.layer} />
      ) : null}
      <h2 className={styles["sr-only"]}>퀴즈 등록</h2>
      <QuizCreationSteps isEditMode={isEditMode} steps={steps} />
      <QuizCreationFormLayout
        isEditMode={isEditMode}
        editQuizId={quizId ?? ""}
        steps={steps}
        blocker={blocker}
      />
      {/* TODO: 컴포넌트 분리 */}

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          title={errorModalTitle}
          bottomButtons={[
            { text: "확인", color: "primary", onClick: closeModal },
          ]}
          showHeaderCloseButton={false}
          contents={[]}
        />
      )}

      {currentUser && preventLeaveModal && blocker.state === "blocked" && (
        <Modal
          contents={[
            {
              title: isEditMode
                ? " 수정 내용이 저장되지 않았어요."
                : "정말 페이지를 나가시겠어요?",
              content: isEditMode ? (
                <p className={styles["prevent-leave-modal-content"]}>
                  {`수정하기 버튼을 누르지 않고 나가면 변경한 내용이 저장되지 않습니다.
                  저장하지 않고 나가시겠습니까?`}
                </p>
              ) : (
                <p className={styles["prevent-leave-modal-content"]}>
                  {`만들기 버튼을 누르지 않고 나가면 변경한 내용이 저장되지 않습니다.
                  저장하지 않고 나가시겠습니까?`}
                </p>
              ),
            },
          ]}
          closeModal={closePreventLeaveModal}
          showHeaderCloseButton={false}
          bottomButtons={[
            {
              text: "나가기",
              color: "primary-border",
              onClick: () => {
                blocker.proceed();
              },
            },
            {
              text: isEditMode ? "수정 계속하기" : "계속 만들기",
              color: "primary",
              onClick: () => {
                blocker.reset();
              },
            },
          ]}
        />
      )}
    </section>
  );
}
