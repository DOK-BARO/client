import styles from "./_quiz_creation_steps.module.scss";
import { Step } from "@/pages/CreateQuiz";
import Button from "@/components/atom/button/button";

export default function QuizCreationSteps({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  console.log("현재 단계:", currentStep);
  const onChangeStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    steps.forEach((step) => {
      if (step.title === e.currentTarget.value) {
        setCurrentStep(step.order);
      }
    });
  };
  return (
    <section className={styles["container"]}>
      {/* TODO: section 안에 heading 태그 넣기 */}
      {steps.map((step) => (
        <Button
          onClick={(e) => onChangeStep(e)}
          className={`${styles["steps"]} ${
            currentStep === step.order ? styles["steps--active"] : ""
          }`}
          key={step.order}
          value={step.title}
        >
          {step.icon}&nbsp;
          {step.title}
        </Button>
      ))}
    </section>
  );
}
