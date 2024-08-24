import styles from "../../styles/layout/_headerLayout.module.scss";
import { PlusCircle } from "../../../public/assets/svg/plusCircle";
import { gray0, gray90 } from "../../styles/abstracts/colors";
import { Search } from "../../../public/assets/svg/search";
import HeaderLogo from "../atom/headerLogo.tsx";
import HeaderMenuButton from "../composite/headerMenuButton.tsx";

const HeaderLayout = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <header className={styles["header-view"]}>
      <div className={styles["header-inner-container"]}>
        <HeaderLogo />
        {!isLoggedIn && <HeaderMenuButton />}

        {isLoggedIn && (
          <span className={styles["header-menu-container"]}>
            <button className={styles["header-menu-button"]}>
              <Search
                width={20}
                height={20}
                fill={gray90}
                alt="검색 버튼"
              ></Search>
              <h3>검색</h3>
            </button>

            <button className={styles["header-menu-quiz-button"]}>
              <PlusCircle
                width={20}
                height={20}
                fill={gray0}
                alt="퀴즈 만들기 버튼"
              ></PlusCircle>
              <h3>퀴즈 만들기</h3>
            </button>
          </span>
        )}
      </div>
    </header>
  );
};
export default HeaderLayout;
