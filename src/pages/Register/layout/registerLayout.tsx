import React, { useState } from "react";
import styles from "../../../styles/layout/_register_layout.module.scss";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  const [greeting] = useState<string>("반가워요!");
  return (
    <section className={styles["register-layout"]}>
      <header>
        <h2>회원가입</h2>
        <h3 className={styles["greeting"]}>{greeting}</h3>
        <div className={styles["progress-container"]}>
          <div className={styles["progress-bar"]} />
        </div>
      </header>
      <main>{children}</main>
    </section>
  );
};

export default RegisterLayout;
