import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/pages/CreateQuiz";
import Button from "@/components/atom/button/button.tsx";
import RightArrow from "@/svg/rightArrow.tsx";
import { gray0, gray60 } from "@/styles/abstracts/colors.ts";

export default function quizCreationFormLayout({
  steps,
  currentStep,
  setCurrentStep,
  isButtonDisabled,
}: {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isButtonDisabled:boolean;
}) {


  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if(step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find((subStep) => subStep.order === currentStep)!;
  };

  const step: Step = getCurrentStep();

  const title = step?.subSteps?.[0].title ? step.subSteps?.[0].title : step!.title;
  const description = step?.description
    ? step.description
    : step?.subSteps?.[0].description ? step.subSteps?.[0].description : "";


  const FormComponent = step?.formComponent
    ? step.formComponent
    : step?.subSteps?.[0]?.formComponent ? step.subSteps[0].formComponent: null;
  const endStep = steps.length-1;
  
  return (
    <section className={styles["container"]}>
      <h3 className={styles["title"]}>{title}</h3>
      <h4 className={styles["step-desc"]}>{description}</h4>
      {FormComponent &&  <FormComponent setCurrentStep={setCurrentStep} />}
      <div className={styles["next-container"]}>
        <Button
          className={styles["next"]}
          disabled={isButtonDisabled}
          onClick={() => {
            if (currentStep == endStep) return;
            setCurrentStep((prev) => prev + 1);
          }}
        >
          {
            currentStep === endStep ? "완료" : "다음"
          }
          <RightArrow alt="다음 버튼" width={20} height={20} stroke={isButtonDisabled ? gray60 : gray0}/>
        </Button>
      </div>
    </section>
  );
}
