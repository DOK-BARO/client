import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/pages/CreateQuiz";
import Button from "@/components/atom/button/button.tsx";
import RightArrow from "public/assets/svg/rightArrow.tsx";
import { gray0 } from "@/styles/abstracts/colors.ts";

export default function quizCreationFormLayout({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <section className={styles["container"]}>
      <h3 className={styles["title"]}>{steps[currentStep].title}</h3>
      <h4 className={styles["step-desc"]}>{steps[currentStep].description}</h4>
      {steps[currentStep]!.formComponent()}
      <div className={styles["next-container"]}>
        <Button
          className={styles["next"]}
          onClick={() => {
            if (currentStep == 3) return;
            setCurrentStep((prev) => prev + 1);
          }}
        >
          다음
          <RightArrow alt="다음 버튼" width={20} height={20} stroke={gray0} />
        </Button>
      </div>
    </section>
  );
}
