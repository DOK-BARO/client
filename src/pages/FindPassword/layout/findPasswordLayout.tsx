import { useState } from "react";
import styles from "../../Register/layout/_register_layout.module.scss";
import SendTemporaryPassword from "../composite/sendTemporaryPassword/sendTemporaryPassword";
import Complete from "../composite/complete/complete";

export default function FindPasswordLayout() {
  const [step, setStep] = useState<number>(2);

  const titles: Record<string, string> = {
    "1": "비밀번호 찾기",
    "2": "💌 이메일 발송 완료",
  };

  const title = titles[step || ""] || "";

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <SendTemporaryPassword />;
      case 2:
        return <Complete />;
      default:
        return <div>404</div>;
    }
  };

  return (
    <section className={styles["register-baseLayout"]}>
      <div className={styles["inner-container"]}>
        <header>
          <h2>비밀번호 찾기</h2>
          <p className={styles["title"]}>{title}</p>
        </header>
        {renderStepComponent()}
      </div>
    </section>
  );
}
