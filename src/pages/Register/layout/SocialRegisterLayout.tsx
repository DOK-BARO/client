import styles from "./_register_layout.module.scss";
import ProgressBar from "@/pages/Register/components/ProgressBar/ProgressBar";
// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import { currentUserAtom, registerInfoAtom } from "@/store/userAtom";
import { RegisterInfoType } from "@/types/UserType";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import TermsAgreement from "../composite/TermsAgreement/TermsAgreement";
import ProfileSet from "../composite/ProfileSet/ProfileSet";

const SocialRegisterLayout = () => {
  const [step, setStep] = useState<number>(1);

  const titles: Record<string, string> = {
    "1": "반가워요!",
    "2": "끝이에요!",
  };

  const title = titles[step || ""] || "";
  const [currentUser] = useAtom(currentUserAtom);

  // const { isLoading, user } = useQueryCurrentUser();
  const [registrationInfo, setRegistrationInfo] =
    useAtom<RegisterInfoType>(registerInfoAtom);

  useEffect(() => {
    // 유저 이메일 설정
    if (currentUser) {
      setRegistrationInfo({
        ...registrationInfo,
        email: currentUser.email,
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
