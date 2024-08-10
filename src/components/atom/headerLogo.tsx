import styles from "../../styles/layout/_headerlayout.module.scss";
import React from "react";

const HeaderLogo:React.FC = () => {
  return (
    <button className={styles["logo-button"]}>
      <img src="/src/assets/svg/logo.svg" alt="로고 버튼"/>
      <h2>DOKBARO</h2>
    </button>
  );
};

export default HeaderLogo;
