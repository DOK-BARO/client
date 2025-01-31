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
  openErrorModalAtom,
  quizCreationInfoAtom,
  resetQuizCreationStateAtom,
  stepsCompletionStatusAtom,
} from "@/store/quizAtom.ts";
import { useAtom, useSetAtom } from "jotai";
import Modal from "@/components/atom/Modal/Modal.tsx";
import useModal from "@/hooks/useModal.ts";
import { Step } from "@/types/StepType.ts";
import QuizBookSelectionForm from "./composite/QuizBookSectionForm/QuizBookSelectionForm/QuizBookSelectionForm.tsx";
import { useBlocker, useParams } from "react-router-dom";
import { quizKeys } from "@/data/queryKeys.ts";
import { quizService } from "@/services/server/quizService.ts";
import { useQuery } from "@tanstack/react-query";
import { EditScope, QuizCreationType, ViewScope } from "@/types/QuizType.ts";
import { BookType } from "@/types/BookType.ts";
import { bookService } from "@/services/server/bookService.ts";
import { studyGroupService } from "@/services/server/studyGroupService.ts";
import { StudyGroupType } from "@/types/StudyGroupType.ts";
import { SelectOptionType } from "@/types/QuizType.ts";
import { QuizQuestionType } from "@/types/QuizType.ts";
import { resetQuizCreationBookStateAtom } from "@/store/quizAtom.ts";
import usePreventLeave from "@/hooks/usePreventLeave.ts";

export default function Index() {
  const { id } = useParams();
  const quizId = id && id !== ":id" ? id : null;
  const [isEditMode] = useState<boolean>(!!quizId);
  const [completionStatus] = useAtom(stepsCompletionStatusAtom);

  const [, setQuizCreationInfo] = useAtom(quizCreationInfoAtom);
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

  async function convertUrlsToFiles(urls: string[]): Promise<File[]> {
    const files = await Promise.all(
      urls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], `file_${index + 1}.jpg`, {
          type: blob.type,
        });
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
        const prevQuestions: QuizQuestionType[] = await Promise.all(
          prevQuiz?.questions.map(async (q, index) => {
            const images = await convertUrlsToFiles(q.answerExplanationImages);
            const selectOptions: SelectOptionType[] = q.selectOptions.map(
              (optionText, index) => ({
                id: index,
                option: optionText,
                value: index.toString(),
                answerIndex: index + 1,
              }),
            );

            return {
              id: index,
              content: q.content,
              selectOptions,
              answerExplanationContent: q.answerExplanationContent,
              answerExplanationImages: images,
              answerType: q.answerType,
              answers: q.answers,
            };
          }) ?? [],
        );

        const quiz: QuizCreationType = {
          title: prevQuiz?.title ?? "",
          description: prevQuiz?.description ?? "",
          book: formattedBook,
          viewScope: prevQuiz?.viewScope as ViewScope,
          editScope: "CREATOR" as EditScope,
          studyGroup: formattedStudyGroup,
          questions: prevQuestions,
        };
        setQuizCreationInfo(quiz);
      }
    }
    initializeQuiz();
  }, [prevQuiz, isEditMode, prevBook?.isbn, studyGroupDetail?.name]);

  // TODO: 외부 파일로 옮기기
  const steps: Step[] = useMemo(
    () => [
      {
        order: 0,
        icon: "👥",
        title: "스터디 그룹 선택",
        description: "퀴즈를 풀 스터디 그룹을 만들거나 선택해주세요.",
        formComponent: () => <QuizSettingStudyGroupForm />,
        isDone: completionStatus.isStudyGroupSelected,
      },
      {
        order: 1,
        icon: "📚",
        title: "도서 선택",
        description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
        formComponent: () => <QuizBookSelectionForm />,
        isDone: completionStatus.isBookSelected,
      },
      {
        order: 2,
        icon: "🏆",
        title: "퀴즈 작성",
        subSteps: [
          {
            order: 2.1,
            title: "퀴즈 기본 정보",
            description: "퀴즈 이름과 설명을 작성해주세요.",
            formComponent: () => <MemoizedQuizBasicInfoForm />,
          },
          {
            order: 2.2,
            title: "문제 작성",
            description: "퀴즈의 질문과 답안을 설정해주세요.",
            formComponent: () => <QuizWriteForm />,
          },
        ],
        isDone: completionStatus.isQuestionsWritten,
      },
      {
        order: 3,
        icon: "🔗",
        title: "퀴즈 공유 설정",
        // description: "퀴즈를 볼 수 있는 사람과 편집 권한을 설정해 주세요.",
        description: "퀴즈를 볼 수 있는 사람을 설정해 주세요.",
        formComponent: () => <QuizSettingsForm />,
        isDone: completionStatus.isSet,
      },
    ],
    [completionStatus],
  );

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorModalTitle] = useAtom(errorModalTitleAtom);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [, setOpenErrorModal] = useAtom(openErrorModalAtom);
  const resetQuizState = useSetAtom(resetQuizCreationStateAtom);
  const resetBookState = useSetAtom(resetQuizCreationBookStateAtom);

  useEffect(() => {
    // 임시 저장된 퀴즈가 있을 경우
    const storedQuizCreationInfo = localStorage.getItem("quizCreationInfo");
    if (storedQuizCreationInfo) {
      const parsedQuizInfo = JSON.parse(storedQuizCreationInfo);

      if (
        parsedQuizInfo.book !== null ||
        parsedQuizInfo.description !== null ||
        parsedQuizInfo.editScope !== null ||
        parsedQuizInfo.questions !== null ||
        parsedQuizInfo.title !== null ||
        parsedQuizInfo.viewScope !== null
      ) {
        if (
          confirm(
            "이전에 작성중이던 퀴즈가 있습니다. 해당 퀴즈를 이어서 작성하시겠습니까?",
          )
        ) {
          setQuizCreationInfo(parsedQuizInfo);
          return;
        }
      }
    }

    // 퀴즈 상태 초기화
    if (isEditMode) {
      setCurrentStep(2);
    } else {
      setCurrentStep(0);
    }

    resetQuizState();
    console.log("퀴즈 상태 초기화");

    return () => {
      resetBookState();
    };
  }, []);

  useEffect(() => {
    setOpenErrorModal(() => openModal);
  }, [setOpenErrorModal]);

  if (isPrevQuizLoading || isBookLoading || isStudyGroupLoading) {
    return <div>로딩중</div>;
  }

  return (
    <section className={styles["container"]}>
      <h2 className={styles["sr-only"]}>퀴즈 등록</h2>
      <QuizCreationSteps
        isEditMode={isEditMode}
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <QuizCreationFormLayout
        isEditMode={isEditMode}
        editQuizId={quizId ?? ""}
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
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

      {blocker.state === "blocked" && (
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
              color: "secondary",
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
