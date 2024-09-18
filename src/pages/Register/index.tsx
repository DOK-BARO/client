import RegisterLayout from "./layout/registerLayout";
import TermsAgreement from "./composite/termsAgreement";
import ProfileSet from "./composite/profileSet";
import { useState } from "react";
import { Step } from "../CreateQuiz";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps: Partial<Step>[] = [
    {
      order: 0,
      title: "반가워요!",
      formComponent: () => <TermsAgreement setCurrentStep={setCurrentStep} />,
    },
    {
      order: 1,
      title: "끝이에요!",
      formComponent: () => <ProfileSet />,
    },
  ];
  return (
    <RegisterLayout
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    />
  );
}
