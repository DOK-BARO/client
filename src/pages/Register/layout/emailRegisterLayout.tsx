import styles from "../../../styles/layout/_register_layout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import ProgressBar from "../components/progressBar";

const EmailRegisterLayout = () => {
  const { step } = useParams();

  //   const title = step === "1" ? "간편하게 가입해요" : "끝이에요";

  return (
    <section className={styles["register-layout"]}>
      <header>
        <h2>이메일 계정으로 회원가입</h2>
        <p className={styles["greeting"]}>간편하게 가입해요</p>
        <ProgressBar step={Number(step)} />
      </header>
      <Outlet context={"email"} />
    </section>
  );
};

export default EmailRegisterLayout;
