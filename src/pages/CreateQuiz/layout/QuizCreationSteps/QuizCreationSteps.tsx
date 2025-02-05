import styles from "./_quiz_creation_steps.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/Button/Button";

import {
  gray00,
  gray20,
  gray50,
  systemSuccess,
} from "@/styles/abstracts/colors.ts";
import { CheckEllipse } from "@/svg/CheckEllipse";
import { useAtom } from "jotai";
import { quizCreationStepAtom } from "@/store/quizAtom";

export default function QuizCreationSteps({
  isEditMode,
  steps,
}: {
  isEditMode: boolean;
  steps: Step[];
}) {
  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const onChangeStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentStepButtonValue = e.currentTarget.value;
    steps.forEach((step) => {
      if (step.title === currentStepButtonValue) {
        setCurrentStep(step.order!);
      }
      step.subSteps?.forEach((subStep) => {
        if (subStep.title === currentStepButtonValue) {
          setCurrentStep(subStep.order!);
        }
      });
    });
  };
  return (
    <section className={styles["container"]}>
      <h3 className={styles["sr-only"]}>퀴즈 생성 단계</h3>
      {steps.map((step) => {
        const isActiveStep = currentStep === step.order;
        const isAnySubStepActive = step.subSteps?.some(
          (subStep) => subStep.order === currentStep,
        );
        const firstSubStepOrder = step.subSteps?.[0]?.order;

        return (
          <div key={step.order}>
            <Button
              color={
                isActiveStep || isAnySubStepActive ? "white" : "transparent"
              }
              onClick={(e) => onChangeStep(e)}
              value={step.title}
              className={styles.steps}
              disabled={isEditMode && (step.order === 0 || step.order === 1)}
              fullWidth
            >
              <span>
                {step.icon && step.icon}&nbsp;
                {step.title}
              </span>
              <CheckEllipse
                fillOut={step.isDone ? systemSuccess : gray20}
                fillIn={step.isDone ? gray00 : gray50}
                width={20}
                height={20}
              />
            </Button>
            {step.subSteps &&
              step.subSteps.map((subStep) => (
                <Button
                  onClick={(e) => onChangeStep(e)}
                  key={subStep.order}
                  value={subStep.title}
                  color={
                    currentStep === subStep.order ||
                    (isActiveStep && firstSubStepOrder === subStep.order)
                      ? "white"
                      : "transparent"
                  }
                  fullWidth
                  className={styles["sub-steps"]}
                >
                  <div style={{ width: 20, height: 20 }} />
                  {subStep.title}
                </Button>
              ))}
          </div>
        );
      })}
    </section>
  );
}
