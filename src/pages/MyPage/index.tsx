import styles from "./_mypage.module.scss";
import { Step } from "@/types/StepType";
import MyPageSteps from "./layout/myPageSteps/myPageSteps";
import MyPageLayout from "./layout/myPageLayout/myPageLayout";
import { useState } from "react";
import MyMadeQuiz from "./composite/myMadeQuiz/myMadeQuiz";
import SolvedQuiz from "./composite/solvedQuiz/solvedQuiz";
import EditMyInfo from "./composite/accountSetting/editMyInfo";
import MyStudy from "./composite/myStudy/myStudy";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: Step[] = [
    {
      order: 0,
      title: "만든 퀴즈",
      formComponent: () => <MyMadeQuiz />,
    },
    {
      order: 1,
      title: "푼 퀴즈",
      formComponent: () => <SolvedQuiz />,
    },
    {
      order: 2,
      title: "내 스터디 그룹",
      formComponent: () => <MyStudy />,
    },
    {
      order: 3,
      title: "계정 설정",
      subSteps: [
        {
          order: 3.1,
          title: "회원정보 수정",
          formComponent: () => <EditMyInfo />,
        },
        {
          order: 3.2,
          title: "비밀번호 변경",
          formComponent: () => <></>,
        },
        {
          order: 3.3,
          title: "회원 탈퇴",
          formComponent: () => <></>,
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
        <MyPageLayout
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </section>
  );
}
