import styles from "./_mypage.module.scss";
import { Step } from "@/types/StepType";
import MyPageSteps from "./layout/MyPageSteps/MyPageSteps";
import MyPageLayout from "./layout/MyPageLayout/MyPageLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();

  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep
    )!;
  };

  // 페이지 이동
  useEffect(() => {
    const step: Step = getCurrentStep();
    navigate(`/my/${step.pageLink}`);
  }, [currentStep]);

  const steps: Step[] = [
    {
      order: 0,
      title: "만든 퀴즈",
      pageLink: "made-quiz",
    },
    {
      order: 1,
      title: "푼 퀴즈",
      pageLink: "solved-quiz",
    },
    {
      order: 2,
      title: "내 스터디 그룹",
      pageLink: "study-groups",
    },
    {
      order: 3,
      title: "계정 설정",
      pageLink: "settings",
      subSteps: [
        {
          order: 3.1,
          title: "회원정보 수정",
          pageLink: "settings/edit-profile",
        },
        {
          order: 3.2,
          title: "비밀번호 변경",
          pageLink: "settings/change-password",
        },
        {
          order: 3.3,
          title: "회원 탈퇴",
          pageLink: "settings/delete-account",
        },
      ],
    },
  ];

  return (
    <section className={styles["container"]}>
      <div className={styles["section-content"]}>
        <MyPageSteps
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <MyPageLayout />
      </div>
    </section>
  );
}
