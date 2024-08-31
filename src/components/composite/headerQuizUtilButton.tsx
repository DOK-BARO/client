import styles from "../../styles/components/_header_quiz_util_button.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function HeaderQuizUtilButton ({ isLoggedIn }: { isLoggedIn : boolean }) {

  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <button className={styles["header-quiz-util"]}>
      <h3>퀴즈 도구</h3>
      <KeyboardArrowDownIcon className={styles["header-quiz-util-icon"]}/>
    </button>
  );
}

export default HeaderQuizUtilButton;