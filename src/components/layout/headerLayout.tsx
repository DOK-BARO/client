import styles from "../../styles/layout/_headerLayout.module.scss";
import HeaderLogo from "../atom/headerLogo.tsx";
import StartAuthButton from "../composite/startAuthButton.tsx";
import HeaderUtilArea from "../composite/headerUtilArea.tsx";

const HeaderLayout = ({ isLoggedIn }: { isLoggedIn: boolean }) => {

  return (
    <header className={styles["header-container"]}>
      <HeaderLogo />
      <HeaderUtilArea isLoggedIn={isLoggedIn}/>
      <StartAuthButton isLoggedIn={isLoggedIn}/>
    </header>
  );
};
export default HeaderLayout;