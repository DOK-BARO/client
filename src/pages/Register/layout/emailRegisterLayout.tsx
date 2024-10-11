import styles from "./_register_layout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import ProgressBar from "@/pages/Register/components/progressBar/progressBar.tsx";

const EmailRegisterLayout = () => {
  const { step } = useParams<{ step: string }>();

  const titles: Record<string, string> = {
    "1": "간편하게 가입해요",
    "2": "간편하게 가입해요",
    "3": "비밀번호 입력",
    "4": "끝이에요!",
  };

  const title = titles[step || ""] || "";

  return (
    <section className={styles["register-baseLayout"]}>
      <div className={styles["inner-container"]}>
        <header>
          <h2>이메일 계정으로 회원가입</h2>
          <p className={styles["title"]}>{title}</p>
          <ProgressBar ratio={Number(step) / Object.keys(titles).length} />
        </header>
        <Outlet context={"email"} />
      </div>
    </section>
  );
};

export default EmailRegisterLayout;
