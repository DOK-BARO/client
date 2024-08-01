import styles from "../../styles/layout/_headerLayout.module.scss";
import { PlusCircle } from "../../assets/svg/plusCircle";
import { gray0, gray90 } from "../../styles/abstracts/colors";
import { Search } from "../../assets/svg/search";
import { LogIn } from "../../assets/svg/logIn";

const HeaderLayout = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className={styles["header-view"]}>
      <button className={styles["logo-button"]}>
        <img src="/src/assets/svg/logo.svg" alt="로고 버튼" />
        <h2>DOKBARO</h2>
      </button>

      {!isLoggedIn && (
        <button className={styles["header-menu-button"]}>
          <LogIn width={20} height={20} stroke={gray90} alt="로그인 버튼" />
          <h3>로그인</h3>
        </button>
      )}

      {isLoggedIn && (
        <span className={styles["header-menu-container"]}>
          <button className={styles["header-menu-button"]}>
            <Search
              width={20}
              height={20}
              stroke={gray90}
              alt="검색 버튼"
            ></Search>
            <h3>검색</h3>
          </button>

          <button className={styles["header-menu-quiz-button"]}>
            <PlusCircle
              width={20}
              height={20}
              stroke={gray0}
              alt="퀴즈 만들기 버튼"
            ></PlusCircle>
            <h3>퀴즈 만들기</h3>
          </button>
        </span>
      )}
    </div>
  );
};
export default HeaderLayout;
