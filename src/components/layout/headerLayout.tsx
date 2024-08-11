import styles from "../../styles/layout/_headerLayout.module.scss";
import { PlusCircle } from "../../../public/assets/svg/plusCircle";
import { gray0, gray90 } from "../../styles/abstracts/colors";
import { Search } from "../../../public/assets/svg/search";
import { LogIn } from "../../../public/assets/svg/logIn1.tsx";
import useModal from "../../hooks/useModal.ts";
import LoginModal from "../composite/loginModal.tsx";
import HeaderLogo from "../atom/headerLogo.tsx";
import Button from "../atom/button.tsx";

const HeaderLayout = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-view"]}>
        <HeaderLogo />
        {!isLoggedIn && (
          <Button className={styles["header-menu-button"]} onClick={openModal}>
            <LogIn width={20} height={20} stroke={gray90} alt="로그인 버튼" />
            <h3>로그인</h3>
          </Button>
        )}

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

        {isModalOpen && <LoginModal closeModal={closeModal} />}
      </div>
    </header>
  );
};
export default HeaderLayout;
