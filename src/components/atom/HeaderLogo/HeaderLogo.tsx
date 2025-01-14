import styles from "./_header_logo.module.scss";
import React from "react";
import { APP_NAME } from "@/data/constants.ts";
import { Logo } from "@/svg/Logo";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const HeaderLogo: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigateToMain = () => {
    navigate("/");
  };
  return (
    <div className={styles["logo-container"]}>
      <Button
        className={styles["logo-link"]}
        iconPosition="left"
        onClick={handleNavigateToMain}
        icon={
          <Logo
            width={43}
            height={43}
            alt="로고 버튼"
            className={styles["logo-icon"]}
          />
        }
      >
        <h1>{APP_NAME}</h1>
      </Button>
    </div>
  );
};

export default HeaderLogo;
