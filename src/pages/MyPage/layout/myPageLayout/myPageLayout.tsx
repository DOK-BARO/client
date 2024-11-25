import { Step } from "@/types/StepType";
import styles from "./_my_page_layout.module.scss";
import Button from "@/components/atom/button/button";


export default function MyPageLayout({ steps,
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

  const title = step?.subSteps?.[0].title
    ? step.subSteps?.[0].title
    : step!.title;

  const FormComponent = step?.formComponent
    ? step.formComponent
    : step?.subSteps?.[0]?.formComponent
      ? step.subSteps[0].formComponent
      : null;

  return (
    <section className={styles["container"]}>
      <h2>마이페이지</h2>
      <ListHeader title={title}/>
      {FormComponent && <FormComponent setCurrentStep={setCurrentStep} />}
    </section>
  );
}

const ListHeader = ({ title }: { title: string }) => {
  return (
    <p className={styles["list-header"]}>
      <h3>{title}</h3>
      <span className={styles["button-area"]}>
        <Button size="xsmall" color="transparent">최신순</Button>
        <Button size="xsmall" color="transparent">가나다순</Button>
      </span>
    </p>
  );
}