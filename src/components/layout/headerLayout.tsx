import { FC } from "react";
import styles from "../../styles/layout/_headerlayout.module.scss";

interface Props {
}


const HeaderLayout: FC<Props> = () => {
  const isLogin:boolean = true;
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-view"]}>
        <button className={styles["logo-button"]}>
          <img src="/src/assets/logo.svg" alt="로고 버튼"/>
          <h2>DOKBARO</h2>
        </button>


        {
          !isLogin && <button className={styles["header-menu-button"]}>
            <img src="/src/assets/log-in.svg" alt="로그인 버튼"/>
            <h3>로그인</h3>
          </button>
        }

        {
          isLogin &&
          <span className={styles["header-menu-container"]}>
            <button className={styles["header-menu-button"]}>
              <img src="/src/assets/search-icon.svg" alt="검색 버튼"/>
              <h3>검색</h3>
            </button>

            <button className={styles["header-menu-quiz-button"]}>
              <img src="/src/assets/plus-circle-icon.svg" alt="퀴즈 만들기 버튼"/>
              <h3>퀴즈 만들기</h3>
            </button>
          </span>
        }


      </div>
    </header>
  );
};
export default HeaderLayout;