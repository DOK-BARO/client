import { FC } from "react";
import styles from "../../styles/layout/_headerlayout.module.scss";
import { PlusCircle } from "../../assets/svg/plusCircle";
import { Props } from "./headerLayout";

export const HeaderLayout: FC<Props> = () => {
  const isLogin: boolean = true;
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-view"]}>
        <button className={styles["logo-button"]}>
          <img src="/src/assets/logo.svg" alt="로고 버튼" />
          <h2>DOKBARO</h2>
        </button>

        {!isLogin && (
          <button className={styles["header-menu-button"]}>
            <img src="/src/assets/log-in.svg" alt="로그인 버튼" />
            <h3>로그인</h3>
          </button>
        )}

        {isLogin && (
          <span className={styles["header-menu-container"]}>
            <button className={styles["header-menu-button"]}>
              <PlusCircle
                width={20}
                height={20}
                fill={gray90}
                alt="검색 버튼"
              ></PlusCircle>
              <h3>검색</h3>
            </button>

            <button className={styles["header-menu-quiz-button"]}>
              <img
                src="/src/assets/plus-circle-icon.svg"
                alt="퀴즈 만들기 버튼"
              />
              <h3>퀴즈 만들기</h3>
            </button>
          </span>
        )}
      </div>
    </header>
  );
};
