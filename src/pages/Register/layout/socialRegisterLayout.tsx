import styles from "./_register_layout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import ProgressBar from "@/pages/Register/components/progressBar/progressBar.tsx";
import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import { RegisterInfoAtom } from "@/store/userAtom";
import { RegisterInfoType } from "@/types/UserType";
import { useAtom } from "jotai";
import { useEffect } from "react";
// import { useEffect } from "react";
// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
// import { useAtom } from "jotai";
// import { RegisterInfoAtom } from "@/store/userAtom";
// import { RegisterInfoType } from "@/types/UserType";
// import { setUserInLocalStorage } from "@/hooks/useAuthCode";

const SocialRegisterLayout = () => {
  const { step } = useParams<{ step: string }>();

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

  return (
    <section className={styles["register-baseLayout"]}>
      <div className={styles["inner-container"]}>
        <header>
          <h2>소셜 계정으로 회원가입</h2>
          <p className={styles["title"]}>{title}</p>
          <ProgressBar ratio={Number(step) / 2} />
        </header>
        <Outlet context={"social"} />
      </div>
    </section>
  );
};

export default SocialRegisterLayout;
