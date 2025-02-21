import styles from "./_quiz_creation_steps.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/Button/Button";

import {
  gray00,
  gray20,
  gray40,
  gray50,
  systemSuccess,
} from "@/styles/abstracts/colors.ts";
import { CheckEllipse } from "@/svg/CheckEllipse";
import { useAtom, useSetAtom } from "jotai";
import { errorModalTitleAtom, quizCreationStepAtom } from "@/store/quizAtom";
import { QUIZ_CREATION_STEP } from "@/data/constants";
import { quizCreationInfoAtom } from "@/store/quizAtom";
import { useAtomValue } from "jotai";
import { useIsQuizStepEnabled } from "@/hooks/useIsQuizStepEnabled";
import {
  invalidQuestionFormIdAtom,
  openErrorModalAtom,
} from "@/store/quizAtom";
import { useValidateQuizForm } from "@/hooks/useValidateQuizForm";
interface Props {
  isEditMode: boolean;
  steps: Step[];
}

export default function QuizCreationSteps({ isEditMode, steps }: Props) {
  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const quizInfo = useAtomValue(quizCreationInfoAtom);
  const setInvalidQuestionFormId = useSetAtom(invalidQuestionFormIdAtom);
  const setErrorModalTitle = useSetAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);
  const validateQuizForm = useValidateQuizForm;
  const isStepEnabled = useIsQuizStepEnabled;

  const notValidCallBack = (errorTitle: string, questionId: number) => {
    setErrorModalTitle(errorTitle);
    setInvalidQuestionFormId(questionId);
    openModal!();
  };
  const handleStepClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    isLastStep?: boolean,
  ) => {
    if (isLastStep) {
      //유효성 검사
      const isValid = validateQuizForm(
        quizInfo.questions ?? [],
        notValidCallBack,
        setInvalidQuestionFormId,
      );
      if (!isValid) return;
    }
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
  const isAllPreviousStepsValid = (currentStepIndex: number, steps: Step[]) => {
    for (let i = 0; i < currentStepIndex; i++) {
      const step = steps[i];

      // 서브스텝이 있다면 모든 서브스텝이 활성화되어 있어야 함
      if (step.subSteps) {
        for (const subStep of step.subSteps) {
          if (!isStepEnabled(subStep.order!, quizInfo)) {
            return false;
          }
        }
      } else {
        if (!isStepEnabled(step.order!, quizInfo)) {
          return false;
        }
      }
    }
    return true;
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
        const isValidPreviousSteps = isAllPreviousStepsValid(index, steps);
        const isLastStep = index === steps.length - 1;

        return (
          <div key={step.order}>
            <Button
              color={
                isActiveStep || isAnySubStepActive ? "white" : "transparent"
              }
              onClick={(e) => handleStepClick(e, isLastStep)}
              value={step.title}
              className={styles.steps}
              disabled={isEditModeDisabledStep || !isValidPreviousSteps}
              fullWidth
            >
              <span>
                {step.icon && step.icon}&nbsp;
                {step.title}
              </span>
              <CheckEllipse
                fillOut={
                  isEditModeDisabledStep || !isValidPreviousSteps
                    ? gray40
                    : step.isDone
                      ? systemSuccess
                      : gray40
                }
                fillIn={
                  isEditModeDisabledStep || !isValidPreviousSteps
                    ? gray20
                    : step.isDone
                      ? gray00
                      : gray50
                }
                width={20}
                height={20}
              />
            </Button>
            {step.subSteps &&
              step.subSteps.map((subStep, idx) => (
                <Button
                  onClick={(e) => handleStepClick(e)}
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
                  size="small"
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
