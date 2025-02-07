import Button from "@/components/atom/Button/Button";
import styles from "./_quiz_write_guide_bubble.module.scss";
import { isFirstVisitAtom, quizGuideStepAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
interface Props {
  guideStep: number;
  text: JSX.Element;
  marginTop: number;
}
export default function QuizWriteGuideBubble({
  guideStep,
  text,
  marginTop,
}: Props) {
  const [isFirstVisit, setIsFirstVisit] = useAtom(isFirstVisitAtom);
  const [currentQuizGuideStep, setCurrentQuizGuideStep] =
    useAtom(quizGuideStepAtom);
  const totalStep = 3;

  const handleNextButtonClick = () => {
    setCurrentQuizGuideStep((prev) => prev + 1);
    if (currentQuizGuideStep == totalStep) {
      // 방문한 사용자로 표시
      // localStorage.setItem("firstVisit", "false");
      setIsFirstVisit(false);
    }
  };

  const isEditMode =
    localStorage.getItem("isEditMode") == "true" ? true : false;
  return isFirstVisit && !isEditMode && guideStep === currentQuizGuideStep ? (
    <div className={styles["guide-bubble"]} style={{ marginTop }}>
      <div className={styles.guide}>
        <div className={styles["inner-container"]}>
          <div className={styles["guide-step"]}>
            <em>{guideStep}</em>/{totalStep}
          </div>
          <div className={styles["guide-text"]}>{text}</div>
        </div>
        <Button size="xsmall" color="primary" onClick={handleNextButtonClick}>
          {guideStep < 3 ? "다음" : "완료"}
        </Button>
      </div>
      <div className={styles["down-arrow"]} />
    </div>
  ) : null;
}
