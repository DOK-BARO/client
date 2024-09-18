import styles from "../../../styles/layout/_register_layout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import ProgressBar from "../components/progressBar";

const SocialRegisterLayout = () => {
  const { step } = useParams();
  const greeting = step === "1" ? "반가워요" : "끝이에요";

  return (
    <section className={styles["register-layout"]}>
      <header>
        <h2>소셜 계정으로 회원가입</h2>
        <p className={styles["greeting"]}>{greeting}!</p>
        <ProgressBar step={Number(step)} />
      </header>
      <Outlet context={"social"} />
    </section>
  );
};

export default SocialRegisterLayout;
