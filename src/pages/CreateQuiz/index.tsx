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
  resetQuizCreationStateAtom,
  stepsCompletionStatusAtom,
} from "@/store/quizAtom.ts";
import { useAtom, useSetAtom } from "jotai";
import Modal from "@/components/atom/Modal/Modal.tsx";
import useModal from "@/hooks/useModal.ts";
import { Step } from "@/types/StepType.ts";
import QuizBookSelectionForm from "./composite/QuizBookSectionForm/QuizBookSelectionForm/QuizBookSelectionForm.tsx";

export default function Index() {
  const [completionStatus] = useAtom(stepsCompletionStatusAtom);

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
        description: "퀴즈를 볼 수 있는 사람과 편집 권한을 설정해 주세요.",
        formComponent: () => <QuizSettingsForm />,
        isDone: completionStatus.isSet,
      },
    ],
    [completionStatus]
  );

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorModalTitle] = useAtom(errorModalTitleAtom);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [, setOpenErrorModal] = useAtom(openErrorModalAtom);
  const resetQuizState = useSetAtom(resetQuizCreationStateAtom);

  useEffect(() => {
    // 퀴즈 상태 초기화
    setCurrentStep(0);
    resetQuizState();
  }, []);

  useEffect(() => {
    setOpenErrorModal(() => openModal);
  }, [setOpenErrorModal]);

  return (
    <section className={styles["container"]}>
      <h2 className={styles["sr-only"]}>퀴즈 등록</h2>
      <QuizCreationSteps
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <QuizCreationFormLayout
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
    </section>
  );
}
