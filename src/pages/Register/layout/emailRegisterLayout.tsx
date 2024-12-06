import styles from "./_register_layout.module.scss";
import ProgressBar from "@/pages/Register/components/progressBar/progressBar.tsx";
import { useEffect, useState } from "react";
import TermsAgreement from "../composite/termsAgreement/termsAgreement";
import Verification from "../composite/email/verification/verification";
import PasswordSet from "../composite/email/passwordSet/passwordSet";
import ProfileSet from "../composite/profileSet/profileSet";

const EmailRegisterLayout = () => {
  const [step, setStep] = useState<number>(1);

  const titles: Record<string, string> = {
    "1": "반가워요!",
    "2": "간편하게 가입해요",
    "3": "비밀번호 입력",
    "4": "끝이에요!",
  };
  const title = titles[step || ""] || "";

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <TermsAgreement setStep={setStep} />;
      case 2:
        return <Verification setStep={setStep} />;
      case 3:
        return <PasswordSet setStep={setStep} />;
      case 4:
        return <ProfileSet />;
      default:
        return <div>404</div>;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "";
      e.returnValue = message;
      return message;
    };

    if (step !== 1) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [step]);

  return (
    <section className={styles["register-baseLayout"]}>
      <div className={styles["inner-container"]}>
        <header>
          <h2>이메일 계정으로 회원가입</h2>
          <p className={styles["title"]}>{title}</p>
          <ProgressBar ratio={Number(step) / Object.keys(titles).length} />
        </header>
        {renderStepComponent()}
      </div>
    </section>
  );
};

export default EmailRegisterLayout;
