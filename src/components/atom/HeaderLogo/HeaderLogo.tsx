import styles from "./_header_logo.module.scss";
import React from "react";
import { APP_NAME } from "@/data/constants.ts";

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
        ariaLabel="메인 페이지로 이동"
        className={styles["logo-button"]}
        iconPosition="left"
        onClick={handleNavigateToMain}
      >
        <h1>{APP_NAME}</h1>
      </Button>
    </div>
  );
};

export default HeaderLogo;
