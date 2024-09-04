import HeaderQuizUtilButton from "./headerQuizUtilButton.tsx";
import HeaderMyInfoUtilButton from "./headerMyInfoUtilButton.tsx";
import styles from "../../styles/layout/_headerLayout.module.scss";
import StartAuthButton from "./startAuthButton.tsx";

type Props = {
  isLoggedIn: boolean;
}

export default function HeaderUtilArea({ isLoggedIn }: Props) {
  return (
    <span className={styles["header-menu-container"]}>
      <HeaderQuizUtilButton isLoggedIn={isLoggedIn}/>
      <HeaderMyInfoUtilButton isLoggedIn={isLoggedIn}/>
      <StartAuthButton isLoggedIn={isLoggedIn}/>
    </span>
  );
}