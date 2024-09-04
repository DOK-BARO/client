import styles from "../../styles/layout/_headerLayout.module.scss";
import HeaderLogo from "../atom/headerLogo.tsx";
import HeaderUtilArea from "../composite/headerUtilArea.tsx";

type Props = {
  isLoggedIn: boolean
}

export default function HeaderLayout({ isLoggedIn }: Props)  {
  return (
    <header className={styles["header-container"]}>
      <HeaderLogo/>
      <HeaderUtilArea isLoggedIn={isLoggedIn}/>
    </header>
  );
}