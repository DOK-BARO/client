import styles from "../../styles/layout/_headerLayout.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { gray90 } from "../../styles/abstracts/colors";
import { Search } from "../../../public/assets/svg/search";
import HeaderLogo from "../atom/headerLogo.tsx";
import Button from "../atom/button.tsx";
import LoginModal from "../composite/loginModal.tsx";
import useModal from "../../hooks/useModal.ts";
import HeaderMenuButton from "../composite/headerMenuButton.tsx";

const HeaderLayout = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();

  return (
    <header className={styles["header-view"]}>
      <div className={styles["header-inner-container"]}>
        <HeaderLogo />
        {!isLoggedIn && (
          <Button className={styles["start-button"]} onClick={openLoginModal}>
           시작하기
          </Button>
        )}
        {isLoginModalOpen && <LoginModal closeModal={closeLoginModal}/>}

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

            <button className={styles["quiz-util"]}>
              <h3>퀴즈 도구</h3>
              <KeyboardArrowDownIcon className={styles["quiz-util-icon"]}/>
            </button>
            {isLoggedIn && <HeaderMenuButton/>}
          </span>
        )}
      </div>
    </header>
  );
};
export default HeaderLayout;