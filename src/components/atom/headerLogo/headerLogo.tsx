import styles from "./_header_logo.module.scss";
import React from "react";
import { APP_NAME } from "@/data/constants.ts";
import { Logo } from "public/assets/svg/logo.tsx";

const HeaderLogo: React.FC = () => {
  return (
    <a href="/" className={styles["logo-link"]}>
      <Logo
        width={40}
        height={40}
        alt="로고 버튼"
        className={styles["logo-icon"]}
      />
      <h1>{APP_NAME}</h1>
    </a>
  );
};

export default HeaderLogo;
