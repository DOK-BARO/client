import styles from "./_header_logo.module.scss";
import React from "react";
import { APP_NAME } from "@/data/constants.ts";
import { Logo } from "@/svg/Logo";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { paginationAtom } from "@/store/paginationAtom";
import { useAtom } from "jotai";
import ROUTES from "@/data/routes";

const HeaderLogo: React.FC = () => {
  const [, setPaginationState] = useAtom(paginationAtom);
  const navigate = useNavigate();
  const handleNavigateToMain = () => {
    navigate(ROUTES.BOOK_LIST);
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      pagePosition: "START",
      middlePages: [],
      isMiddlePagesUpdated: false,
    }));
  };
  return (
    <div className={styles["logo-container"]}>
      <Button
        className={styles["logo-button"]}
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
