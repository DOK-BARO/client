import styles from "../../../styles/layout/_register_layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import ProgressBar from "../components/progressBar";

const RegisterLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const step = Number(pathSegments[pathSegments.length - 1]);
  const greeting = step === 1 ? "반가워요" : "끝이에요";

  return (
    <section className={styles["register-layout"]}>
      <header>
        <h2>회원가입</h2>
        <p className={styles["greeting"]}>{greeting}!</p>
        <ProgressBar step={step} />
      </header>
      <Outlet />
    </section>
  );
};

export default RegisterLayout;
