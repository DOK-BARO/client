import styles from "./_my_page_step.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/button/button";

export default function MyPageSteps({ steps, setCurrentStep }: {
  steps: Step[],
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const onChangeStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentStepButtonValue = e.currentTarget.value;
    steps.forEach((step) => {
      if (step.title === currentStepButtonValue) {
        setCurrentStep(step.order!);
      }
      step.subSteps?.forEach((subStep) => {
        if (subStep.title === currentStepButtonValue) {
          // TODO: 해당 섹션으로 이동
          const sectionId: string = subStep.sectionId ?? "";
          const sectionElement = document.getElementById(sectionId);

          const headerOffset = 62;
          const elementPosition = sectionElement!.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset; // (viewport에서의 위치) + (스크롤한 위치) = 실제 element의 위치

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  return (
    <aside className={styles["container"]}>
      {steps.map((step, index: number) => (
        <div key={index}>
          <Button
            onClick={(e) => onChangeStep(e)}
            value={step.title}
            className={styles["steps"]}
            fullWidth
            color="white"
          >
            {step.title}
          </Button>
          {step.subSteps &&
            step.subSteps.map((subStep, index: number) => (
              <Button key={index}
                value={subStep.title}
                onClick={(e) => onChangeStep(e)}
                className={styles["sub-steps"]}
                color="transparent"
                fullWidth
              >
                <div style={{ width: 20, height: 20 }} />
                {subStep.title}
              </Button>
            ))
          }
        </div>))}
    </aside>
  );
}