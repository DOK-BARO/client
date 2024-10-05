import styles from "./_header_util_area.module.scss";
import HeaderMyInfoUtilButton from "../headerMyInfoUtilButton/headerMyInfoUtilButton";
import HeaderQuizUtilButton from "../headerQuizUtilButton/headerQuizUtilButton";
import StartAuthButton from "../startAuthButton/startAuthButton";

type Props = {
  isLoggedIn: boolean;
};

export default function HeaderUtilArea({ isLoggedIn }: Props) {
  return (
    <span className={styles["header-util-area-container"]}>
      <HeaderQuizUtilButton isLoggedIn={isLoggedIn} />
      <HeaderMyInfoUtilButton isLoggedIn={isLoggedIn} />
      <StartAuthButton isLoggedIn={isLoggedIn} />
    </span>
  );
}
