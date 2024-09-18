import { Dispatch, SetStateAction } from "react";
import styles from "../../../styles/layout/_register_layout.module.scss";
import { Step } from "../../CreateQuiz";

const RegisterLayout = ({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: Partial<Step>[];
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  // const [greeting] = useState<string>("반가워요!");
  return (
    <section className={styles["register-layout"]}>
      <header>
        <h2>회원가입</h2>
        <h3 className={styles["greeting"]}>{steps[currentStep].title}</h3>
        <div className={styles["progress-container"]}>
          <div className={styles["progress-bar"]} />
        </div>
      </header>
      <main>{steps[currentStep].formComponent!({ setCurrentStep })}</main>
    </section>
  );
};

export default RegisterLayout;
