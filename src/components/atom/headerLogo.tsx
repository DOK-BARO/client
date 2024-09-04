import styles from "../../styles/components/_header_logo.module.scss";
import React from "react";
import { APP_NAME } from "../../data/constants.ts";

const HeaderLogo: React.FC = () => {
  return (
    <a href="/" className={styles["logo-link"]}>
      <img src="/assets/svg/logo.svg" alt="로고 버튼"/>
      <h1>{ APP_NAME }</h1>
    </a>
  );
};

export default HeaderLogo;
