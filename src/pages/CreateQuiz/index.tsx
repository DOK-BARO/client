import QuizCreationFormLayout from "./layout/quizCreationFormLayout";
import QuizCreationSteps from "./layout/quizCreationSteps";
import styles from "../../styles/pages/_create_quiz.module.scss";
import { useState } from "react";
import QuizBasicInfoForm from "./composite/quizBasicInfoForm";
import QuizBookSelectionForm from "./composite/quizBookSelectionForm";
import QuizWriteForm from "./composite/quizWriteForm";
import QuizSettingsForm from "./composite/quizSettingsForm";

export interface Step {
  order: number;
  icon: string;
  title: string;
  description: string;
  formComponent: JSX.Element;
}
export default function Index() {
  const steps: Step[] = [
    {
      order: 0,
      icon: "👥",
      title: "기본 정보 입력",
      description: "퀴즈에 대한 기본 정보를 입력해주세요",
      formComponent: <QuizBasicInfoForm />,
    },
    {
      order: 1,
      icon: "📚",
      title: "도서 선택",
      description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
      formComponent: <QuizBookSelectionForm />,
    },
    {
      order: 2,
      icon: "🏆",
      title: "퀴즈 작성",
      description: "관련 문제를 작성해주세요.",
      formComponent: <QuizWriteForm />,
    },
    {
      order: 3,
      icon: "🔗",
      title: "퀴즈 설정",
      description: "볼 수 있는 사람과 제한 시간을 설정해주세요.",
      formComponent: <QuizSettingsForm />,
    },
  ];
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <section className={styles["container"]}>
      <h2 className={styles["sr-only"]}>퀴즈 등록</h2>
      <QuizCreationFormLayout
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <QuizCreationSteps
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </section>
  );
}
