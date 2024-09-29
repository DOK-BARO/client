// import styles from "@/styles/layout/_header_layout.module.scss";
import styles from "../../../components/layout/headerLayout/_header_layout.module.scss";
import HeaderMyInfoUtilButton from "../headerMyInfoUtilButton/headerMyInfoUtilButton";
import HeaderQuizUtilButton from "../headerQuizUtilButton/headerQuizUtilButton";
import StartAuthButton from "../startAuthButton/startAuthButton";

type Props = {
  isLoggedIn: boolean;
};

export default function HeaderUtilArea({ isLoggedIn }: Props) {
  return (
    <span className={styles["header-menu-container"]}>
      <HeaderQuizUtilButton isLoggedIn={isLoggedIn} />
      <HeaderMyInfoUtilButton isLoggedIn={isLoggedIn} />
      <StartAuthButton isLoggedIn={isLoggedIn} />
    </span>
  );
}
