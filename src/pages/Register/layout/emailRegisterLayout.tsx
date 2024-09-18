import styles from "../../../styles/layout/_register_layout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import ProgressBar from "../components/progressBar";

const EmailRegisterLayout = () => {
  const { step } = useParams<{ step: string }>();

  const titles: Record<string, string> = {
    "1": "간편하게 가입해요",
    "2": "비밀번호 입력",
    "3": "끝이에요!",
  };

  const title = titles[step || ""] || "";

  return (
    <section className={styles["register-layout"]}>
      <header>
        <h2>이메일 계정으로 회원가입</h2>
        <p className={styles["title"]}>{title}</p>
        <ProgressBar ratio={Number(step) / 3} />
      </header>
      <Outlet context={"email"} />
    </section>
  );
};

export default EmailRegisterLayout;
