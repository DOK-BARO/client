import { Step } from "@/types/StepType";
import styles from "./_my_page_layout.module.scss";

export default function MyPageLayout({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep
    )!;
  };

  const step: Step = getCurrentStep();

  const FormComponent = step?.formComponent
    ? step.formComponent
    : step?.subSteps?.[0]?.formComponent
    ? step.subSteps[0].formComponent
    : null;

  return (
    <section className={styles["container"]}>
      <h2>마이페이지</h2>
      <article>
        {FormComponent && <FormComponent setCurrentStep={setCurrentStep} />}
      </article>
    </section>
  );
}
