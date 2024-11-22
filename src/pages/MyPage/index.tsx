import styles from "./_mypage.module.scss"
import { Step } from "@/types/StepType";
import MyPageSteps from "./layout/myPageSteps/myPageSteps";
import MyPageLayout from "./layout/myPageLayout/myPageLayout";
import { useState } from "react";
import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import Button from "@/components/atom/button/button";
export default function Index() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { user } = useQueryCurrentUser();


  const steps: Step[] = [
    {
      order: 0,
      title: "내 퀴즈",
      subSteps: [
        {
          order: 0.1,
          title: "만든 퀴즈",
          sectionId: "made-quiz"
        },
        {
          order: 0.2,
          title: "푼 퀴즈",
          sectionId: "solved-quiz"
        }
      ],
    },
    {
      order: 1,
      title: "내 스터디",
    }
  ];

  return (
    <section className={styles["container"]}>
      <div className={styles["section-header"]}>
        <h2 className={styles["title"]}>
          <span className={styles["nickname"]}>
            {user?.nickName?.length ?? 0 > 6 ? user?.nickName.slice(0, 6).concat("...") : user?.nickName}</span>
          {" "}님의 마이페이지입니다.</h2>
        <Button
          color="primary-border"
          onClick={() => { }}
        >회원정보 수정</Button>
      </div>
      <div className={styles["section-content"]}>
        <MyPageSteps steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <MyPageLayout
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </section>
  );

}