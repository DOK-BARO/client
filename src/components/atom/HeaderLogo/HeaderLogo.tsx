import styles from "./_header_logo.module.scss";
import React from "react";
import { APP_NAME } from "@/data/constants.ts";
import { Logo } from "@/svg/logo.tsx";
import { Link } from "react-router-dom";

const HeaderLogo: React.FC = () => {
  return (
    <div className={styles["logo-container"]}>
      <Link to="/" className={styles["logo-link"]}>
        <Logo
          width={43}
          height={43}
          alt="로고 버튼"
          className={styles["logo-icon"]}
        />
        <h1>{APP_NAME}</h1>
      </Link>
    </div>
  );
};

export default HeaderLogo;
