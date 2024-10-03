import styles from "./_header_quiz_util_button.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HeaderQuizUtilList from "@/components/composite/quizMenuList/quizMenuList.tsx";
import { useDropDownList } from "@/hooks/useDropDownList.ts";

function HeaderQuizUtilButton ({ isLoggedIn }: { isLoggedIn : boolean }) {
  const { isOpenDropDownList, anchorEl, openDropDownList, closeDropDownList, dropDownListRef } = useDropDownList();

  if (!isLoggedIn) {
    //TODO: isLoggedIn이 false이면 랜딩페이지로 이동 (로그인 권유) 사실 if문도 필요없음
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