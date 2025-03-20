import HeaderLogo from "@/components/atom/HeaderLogo/HeaderLogo";
import Button from "@/components/atom/Button/Button";
import styles from "./_header_layout.module.scss";
import GNB from "../Gnb/Gnb";
import { Search } from "@/svg/Search";
import { gray60 } from "@/styles/abstracts/colors";
import StartAuthButton from "@/components/composite/StartAuthButton/StartAuthButton";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import HeaderMyInfoUtilButton from "@/components/composite/HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "@/components/composite/HeaderQuizUtilButton/HeaderQuizUtilButton";

export default function HeaderLayout() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <div className={styles["header-inner-container"]}>
          <div className={styles["row"]}>
            <HeaderLogo />
            <ul className={styles["snb"]}>
              <li>
                <HeaderQuizUtilButton />
              </li>
              <li className={styles["snb__item"]}>
                <Button className={styles["snb__item-btn"]} onClick={() => {}}>
                  퀴즈 만들기
                </Button>
              </li>
              <li className={styles["snb__item"]}>
                <Button className={styles["snb__item-btn"]} onClick={() => {}}>
                  내 스터디
                </Button>
              </li>
              <li className={styles["snb__item"]}>
                <Button className={styles["snb__item-btn"]} onClick={() => {}}>
                  마이페이지
                </Button>
              </li>
            </ul>
          </div>
          <div className={styles["row"]}>
            <Button
              iconOnly={true}
              icon={
                <Search alt="책 검색" stroke={gray60} width={20} height={20} />
              }
            />
            <StartAuthButton />
            <HeaderMyInfoUtilButton />
          </div>
          {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        </div>
      </div>
      <GNB />
    </header>
  );
}
