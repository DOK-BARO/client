import styles from "./_create_quiz.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import QuizSettingStudyGroupForm from "@/pages/CreateQuiz/composite/quizSettingStudyGroupForm/quizSettingStudyGroupForm.tsx";
import QuizBookSelectionForm from "./composite/quizBookSectionForm/quizBookSelectionForm.tsx";
import QuizWriteForm from "./composite/quizWriteForm/quizWriteForm.tsx";
import QuizSettingsForm from "./composite/quizSettingsForm/quizSettingsForm.tsx";
import QuizCreationFormLayout from "./layout/quizCreationFormLayout/quizCreationFormLayout.tsx";
import QuizCreationSteps from "./layout/quizCreationSteps/quizCreationSteps.tsx";
import QuizBasicInfoForm from "@/pages/CreateQuiz/composite/quizBasicInfoForm/quizBasicInfoForm.tsx";

interface FormComponentProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface Step {
  order: number;
  icon?: string;
  title: string;
  description: string;
  isSubStep: boolean;
  formComponent: (props?: FormComponentProps) => JSX.Element;
}

export default function Index() {
  const steps: Step[] = [
    {
      order: 0,
      icon: "👥",
      title: "스터디 선택",
      description: "퀴즈를 풀 스터디를 만들거나 선택해주세요.",
      isSubStep: false,
      formComponent: () => <QuizSettingStudyGroupForm/>,
    },
    {
      order: 1,
      icon: "📚",
      title: "도서 선택",
      description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
      isSubStep: false,
      formComponent: () => <QuizBookSelectionForm/>,
    },
    {
      order: 2,
      icon: "🏆",
      title: "퀴즈 작성",
      description: "퀴즈 이름과 설명을 작성해주세요.",
      isSubStep: false,
      formComponent: () => <QuizWriteForm/>,
    },
    {
      order: 3,
      title: "퀴즈 기본 정보 작성",
      description: "퀴즈 이름과 설명을 작성해주세요.",
      isSubStep: true,
      formComponent: () => <QuizBasicInfoForm/>,
    },
    {
      order: 4,
      title: "문제 작성",
      description: "퀴즈의 질문과 답안을 설정해주세요.",
      isSubStep: true,
      formComponent: () => <QuizWriteForm/>,
    },
    {
      order: 5,
      icon: "🔗",
      title: "공유 설정",
      isSubStep: false,
      description: "퀴즈를 볼 수 있는 사람과 제한 시간을 설정해 주세요.",
      formComponent: () => <QuizSettingsForm/>,
    },
  ];
  const [currentStep, setCurrentStep] = useState<number>(0);

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
    </section>
  );
}
