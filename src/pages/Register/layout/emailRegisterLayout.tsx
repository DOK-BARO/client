import styles from "./_register_layout.module.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "@/pages/Register/components/progressBar/progressBar.tsx";
import { useEffect } from "react";

const EmailRegisterLayout = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();

  const titles: Record<string, string> = {
    "1": "반가워요!",
    "2": "간편하게 가입해요",
    "3": "비밀번호 입력",
    "4": "끝이에요!",
  };
  const title = titles[step || ""] || "";

  useEffect(() => {
    if (step && step !== "1") {
      confirm(
        "새로고침을 하면 입력한 정보가 모두 초기화되며, 첫 단계로 돌아갑니다. 그래도 새로고침하시겠습니까?"
      );
      const savedStep = localStorage.getItem("registerStep");
      if (savedStep == step) {
        navigate("/register/email/1", { replace: true });
        localStorage.removeItem("registerStep");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (step) {
      localStorage.setItem("registerStep", step);
    }
  }, [step]);

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
