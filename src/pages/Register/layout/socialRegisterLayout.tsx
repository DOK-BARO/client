import styles from "./_register_layout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import ProgressBar from "@/pages/Register/components/progressBar/progressBar.tsx";

const SocialRegisterLayout = () => {
  const { step } = useParams<{ step: string }>();

  const titles: Record<string, string> = {
    "1": "반가워요!",
    "2": "끝이에요!",
  };

  const title = titles[step || ""] || "";

  return (
    <section className={styles["register-baseLayout"]}>
      <header>
        <h2>소셜 계정으로 회원가입</h2>
        <p className={styles["title"]}>{title}</p>
        <ProgressBar ratio={Number(step) / 2} />
      </header>
      <Outlet context={"social"} />
    </section>
  );
};

export default SocialRegisterLayout;
