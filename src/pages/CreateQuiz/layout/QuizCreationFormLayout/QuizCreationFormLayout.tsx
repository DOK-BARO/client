import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/Button/Button";
import RightArrow from "@/svg/RightArrow";
import { gray00, gray60 } from "@/styles/abstracts/colors.ts";
import { useAtom } from "jotai";
import {
  isQuizNextButtonEnabledAtom,
  quizCreationStepAtom,
} from "@/store/quizAtom";

interface Props {
  steps: Step[];
  onStepProgression: () => void;
}

export default function QuizCreationFormLayout({
  steps,
  onStepProgression,
}: Props) {
  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const [isQuizNextButtonEnabled] = useAtom<boolean>(
    isQuizNextButtonEnabledAtom,
  );

  const getCurrentStep = (): Step | undefined => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    const parentStep = steps[truncatedStep];

    return parentStep?.subSteps?.find(
      (subStep) => subStep.order === currentStep,
    );
  };
  const step = getCurrentStep();

  const title = step?.subSteps?.[0]?.title ?? step?.title ?? "";
  const description =
    step?.description ?? step?.subSteps?.[0]?.description ?? "";
  const FormComponent =
    step?.formComponent ?? step?.subSteps?.[0]?.formComponent ?? null;

  return (
    <section className={styles["container"]}>
      <h3 className={styles["title"]}>{title}</h3>
      <h4 className={styles["step-desc"]}>{description}</h4>
      {FormComponent && <FormComponent setCurrentStep={setCurrentStep} />}
      <div className={styles["next-container"]}>
        <Button
          className={styles["next"]}
          disabled={!isQuizNextButtonEnabled}
          onClick={onStepProgression}
          size="medium"
          color="primary"
        >
          다음
          <RightArrow
            alt="다음 버튼"
            width={20}
            height={20}
            stroke={isQuizNextButtonEnabled ? gray00 : gray60}
          />
        </Button>
      </div>
    </section>
  );
}
