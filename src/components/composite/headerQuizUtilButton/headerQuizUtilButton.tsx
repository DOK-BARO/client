import styles from "./_header_quiz_util_button.module.scss";
import HeaderQuizUtilList from "@/components/composite/quizMenuList/quizMenuList.tsx";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/arrowDown.tsx";

function HeaderQuizUtilButton () {
  const { isOpenDropDownList, anchorEl, openDropDownList, closeDropDownList, dropDownListRef } = useDropDownList();

  return (
    <div className={styles["header-quiz-util-button-container"]} ref={dropDownListRef}>
      <button className={styles["header-quiz-util-button"]} onClick={openDropDownList}>
        <h3>퀴즈 도구</h3>
        <ArrowDown width={24} height={24} className={styles["header-quiz-util-icon"]} />
        {/*<KeyboardArrowDownIcon className={styles["header-quiz-util-icon"]}/>*/}
      </button>
      {isOpenDropDownList && anchorEl && <HeaderQuizUtilList closeDropDownList={closeDropDownList} />}
    </div>
  );
}

export default HeaderQuizUtilButton;