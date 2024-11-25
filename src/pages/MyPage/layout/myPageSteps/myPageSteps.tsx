import styles from "./_my_page_step.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/button/button";
import { useState } from "react";

export default function MyPageSteps({ steps, currentStep, setCurrentStep }: {
  steps: Step[],
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [activeSubStep, setActiveSubStep] = useState<number | null>(null);

  const onChangeStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentStepButtonValue = e.currentTarget.value;
    steps.forEach((step) => {
      if (step.title === currentStepButtonValue) {
        setCurrentStep(step.order!);
        setActiveSubStep(null); // 메인 스텝 클릭 시 서브 스텝 비활성화
      }
      step.subSteps?.forEach((subStep) => {
        if (subStep.title === currentStepButtonValue) {
          setCurrentStep(subStep.order!);
          setActiveSubStep(subStep.order); // 서브 스텝 클릭 시 해당 서브 스텝 활성화
        }
      });
    });
  }
  return (
    <aside className={styles["container"]}>
      <ul>
        {steps.map((step, index: number) => {
          const isActiveStep = currentStep === step.order;
          const isAnySubStepActive = step.subSteps?.some(
            (subStep) => subStep.order === currentStep
          );
          const firstSubStepOrder = step.subSteps?.[0]?.order;
          const subStepsClass = activeSubStep === firstSubStepOrder || activeSubStep ? styles["is-visible"] : '';

          return (
            <li 
            key={index}
            className={
              `${styles["steps"]}
            ${styles[step.subSteps ? "have-sub-step" : ""]}
            `
            }
            >
              <Button
                onClick={(e) => onChangeStep(e)}
                value={step.title}
                fullWidth
                color={
                  isActiveStep || isAnySubStepActive ? "white" : "transparent"
                }
              >
                {step.title}
              </Button>
              <ul className={`${styles["sub-steps-container"]} ${subStepsClass}`}>
                {step.subSteps &&
                  step.subSteps.map((subStep, index: number) => (
                    <li  key={index}>
                      <Button
                        value={subStep.title}
                        onClick={(e) => onChangeStep(e)}
                        className={styles["sub-steps"]}
                        color={
                          currentStep === subStep.order
                            ? "white"
                            : "transparent"
                        }
                        fullWidth
                      >
                        <div style={{ width: 20, height: 20 }} />
                        {subStep.title}
                      </Button>
                    </li>
                  ))
                }
              </ul>
            </li>)
        })}
      </ul>
    </aside>
  );
}