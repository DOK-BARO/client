import styles from "../../styles/components/_header_quiz_util_button.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HeaderQuizUtilList from "./quizMenuList.tsx";
import { useDropDownList } from "../../hooks/useDropDownList.ts";

function HeaderQuizUtilButton ({ isLoggedIn }: { isLoggedIn : boolean }) {
  const { isOpenDropDownList, anchorEl, openDropDownList, closeDropDownList, dropDownListRef } = useDropDownList();

  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <div className={styles["header-quiz-util-button-container"]} ref={dropDownListRef}>
      <button className={styles["header-quiz-util-button"]} onClick={openDropDownList}>
        <h3>퀴즈 도구</h3>
        <KeyboardArrowDownIcon className={styles["header-quiz-util-icon"]}/>
      </button>
      {isOpenDropDownList && anchorEl && <HeaderQuizUtilList closeDropDownList={closeDropDownList} />}
    </div>
  );
}

export default HeaderQuizUtilButton;