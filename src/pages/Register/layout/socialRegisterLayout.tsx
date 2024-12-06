import styles from "./_register_layout.module.scss";
import ProgressBar from "@/pages/Register/components/progressBar/progressBar.tsx";
import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import { RegisterInfoAtom } from "@/store/userAtom";
import { RegisterInfoType } from "@/types/UserType";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import TermsAgreement from "../composite/termsAgreement/termsAgreement";
import ProfileSet from "../composite/profileSet/profileSet";

const SocialRegisterLayout = () => {
  const [step, setStep] = useState<number>(1);

  const titles: Record<string, string> = {
    "1": "반가워요!",
    "2": "끝이에요!",
  };

  const title = titles[step || ""] || "";

  const { isLoading, user } = useQueryCurrentUser();
  const [registrationInfo, setRegistrationInfo] =
    useAtom<RegisterInfoType>(RegisterInfoAtom);

  useEffect(() => {
    // 유저 이메일 설정
    if (!isLoading && user) {
      setRegistrationInfo({
        ...registrationInfo,
        email: user.email,
      });
    }
  }, []);

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <TermsAgreement setStep={setStep} />;
      case 2:
        return <ProfileSet />;
      default:
        return <div>404</div>;
    }
  };

  return (
    <section className={styles["register-baseLayout"]}>
      <div className={styles["inner-container"]}>
        <header>
          <h2>소셜 계정으로 회원가입</h2>
          <p className={styles["title"]}>{title}</p>
          <ProgressBar ratio={Number(step) / Object.keys(titles).length} />
        </header>
        {renderStepComponent()}
        {/* <Outlet context={"social"} /> */}
      </div>
    </section>
  );
};

export default SocialRegisterLayout;
