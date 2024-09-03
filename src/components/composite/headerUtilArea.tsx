import HeaderQuizUtilButton from "./headerQuizUtilButton.tsx";
import HeaderMyInfoUtilButton from "./headerMyInfoUtilButton.tsx";
import styles from "../../styles/layout/_headerLayout.module.scss";

function HeaderUtilArea({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <span className={styles["header-menu-container"]}>
      <HeaderQuizUtilButton isLoggedIn={isLoggedIn}/>
      <HeaderMyInfoUtilButton isLoggedIn={isLoggedIn}/>
    </span>
  );
}

export default HeaderUtilArea;
