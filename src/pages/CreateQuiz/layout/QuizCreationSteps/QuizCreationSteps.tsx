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
import { QUIZ_CREATION_STEP } from "@/data/constants";
import { quizCreationInfoAtom } from "@/store/quizAtom";
import { useAtomValue } from "jotai";
import { useIsQuizStepEnabled } from "@/hooks/useIsQuizStepEnabled";
export default function QuizCreationSteps({
  isEditMode,
  steps,
}: {
  isEditMode: boolean;
  steps: Step[];
}) {
  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const quizInfo = useAtomValue(quizCreationInfoAtom);
  const isStepEnabled = useIsQuizStepEnabled;
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
      {steps.map((step, index) => {
        const isActiveStep = currentStep === step.order;
        const isAnySubStepActive = step.subSteps?.some(
          (subStep) => subStep.order === currentStep,
        );
        const firstSubStepOrder = step.subSteps?.[0]?.order;

        const isEditModeDisabledStep =
          isEditMode &&
          (step.order === QUIZ_CREATION_STEP.STUDY_GROUP_SELECT ||
            step.order === QUIZ_CREATION_STEP.BOOK_SELECT);

        // 이전 단계 작성 여부 검사
        const exStep: Step = steps[index - 1];
        const exSubStepsLastStepOrder =
          exStep &&
          exStep.subSteps &&
          exStep.subSteps[exStep.subSteps.length - 1].order;

        // 전단계가 서브스텝이 있으면 전단계가 아닌 전단계의 마지막 서브스텝을 검사
        const isValidExStep =
          exStep &&
          (exSubStepsLastStepOrder
            ? !isStepEnabled(exSubStepsLastStepOrder, quizInfo)
            : !isStepEnabled(exStep.order, quizInfo));

        return (
          <div key={step.order}>
            <Button
              color={
                isActiveStep || isAnySubStepActive ? "white" : "transparent"
              }
              onClick={(e) => onChangeStep(e)}
              value={step.title}
              className={styles.steps}
              disabled={isEditModeDisabledStep || isValidExStep}
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
              step.subSteps.map((subStep, idx) => (
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
                  disabled={
                    subStep.order === QUIZ_CREATION_STEP.QUIZ_BASIC_INFO_FORM
                      ? !isStepEnabled(steps[index - 1].order, quizInfo)
                      : !isStepEnabled(step.subSteps![idx - 1].order, quizInfo)
                  }
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
