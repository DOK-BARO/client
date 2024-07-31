import QuizCreationForm from "./components/quizCreationForm";
import QuizCreationSteps from "./components/quizCreationSteps";
import styles from "../../styles/pages/_createQuiz.module.scss";

export interface Step {
  order: number;
  icon: string;
  title: string;
  description: string;
}
export default function Index() {
  const steps: Step[] = [
    {
      order: 1,
      icon: "👥",
      title: "기본 정보 입력",
      description: "퀴즈에 대한 기본 정보를 입력해주세요",
    },
    {
      order: 2,
      icon: "📚",
      title: "도서 선택",
      description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
    },
    {
      order: 3,
      icon: "🏆",
      title: "퀴즈 작성",
      description: "관련 문제를 작성해주세요.",
    },
    {
      order: 4,
      icon: "🔗",
      title: "퀴즈 설정",
      description: "볼 수 있는 사람과 제한 시간을 설정해주세요.",
    },
  ];
  return (
    <>
      <div className={styles["container"]}>
        <QuizCreationForm steps={steps}></QuizCreationForm>
        <QuizCreationSteps steps={steps}></QuizCreationSteps>
      </div>
    </>
  );
}
