import styles from "./_quiz_result.module.scss";
import Button from "@/components/atom/Button/Button";
import CommonQuizResult from "./composite/CommonQuizResult";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StudyQuizResult from "./composite/StudyQuizResult";
import { useState } from "react";
import ROUTES from "@/data/routes";
import { QuizReviewRouteType } from "@/types/ParamsType";
import toast from "react-hot-toast";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();
  const { quizId, solvingQuizId, quizTitle, studyGroupId } = useParams<{
    quizId: string;
    solvingQuizId: string;
    quizTitle: string;
    studyGroupId?: string;
  }>();

  const quizIdNumber = Number(quizId);
  const solvingQuizIdNumber = Number(solvingQuizId);

  if (isNaN(quizIdNumber) || isNaN(solvingQuizIdNumber)) {
    toast.error("잘못된 퀴즈 id 입니다.");
    navigate(ROUTES.ROOT);
  }

  const steps: { order: number; component: JSX.Element }[] = [
    {
      order: 0,
      component: <CommonQuizResult solvingQuizId={parseInt(solvingQuizId!)} />,
    },
    {
      order: 1,
      component: (
        <StudyQuizResult
          studyGroupId={parseInt(studyGroupId!)}
          quizId={quizIdNumber!}
        />
      ),
    },
  ];

  const goToReviewPage = () => {
    const params: QuizReviewRouteType = {
      quizId: parseInt(quizId!),
      solvingQuizId: parseInt(solvingQuizId!),
      quizTitle: quizTitle!,
    };
    navigate(ROUTES.QUIZ_REVIEW(params), { replace: false });
  };

  const handleGoToNext = () => {
    studyGroupId ? setCurrentStep(1) : goToReviewPage();
  };

  return (
    <section className={styles["container"]}>
      <h2 className={styles["sr-only"]}>퀴즈 결과화면</h2>
      {steps[currentStep].component}
      {currentStep !== 1 && (
        <Button
          color="primary"
          size="medium"
          onClick={handleGoToNext}
          className={styles["btn-next"]}
        >
          다음
        </Button>
      )}
    </section>
  );
}
