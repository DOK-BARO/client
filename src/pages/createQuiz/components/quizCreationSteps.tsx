import { Step } from "..";
import Button from "../../../components/atom/button";
import styles from "../../../styles/layout/_quizCreationSteps.module.scss";

export default function QuizCreationSteps({ steps }: { steps: Step[] }) {
  return (
    <div className={styles["container"]}>
      {steps.map((step) => (
        <Button
          onClick={() => {
            console.log("선택한 스텝으로 이동");
          }}
          className={styles["steps"]}
          key={step.order}
        >
          {step.icon}&nbsp;
          {step.title}
        </Button>
      ))}
    </div>
  );
}
